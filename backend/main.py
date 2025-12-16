from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import random, sqlite3, datetime

app = FastAPI()

# Allow frontend to talk to backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---- Database setup (SQLite) ----
conn = sqlite3.connect("statements.db", check_same_thread=False)
cursor = conn.cursor()
cursor.execute("""CREATE TABLE IF NOT EXISTS statements (
    id INTEGER PRIMARY KEY,
    title TEXT,
    date TEXT,
    file_path TEXT
)""")
cursor.execute("""CREATE TABLE IF NOT EXISTS otps (
    id INTEGER PRIMARY KEY,
    statement_id INTEGER,
    otp TEXT,
    expiry TEXT
)""")
conn.commit()

# Insert demo data if empty
cursor.execute("SELECT COUNT(*) FROM statements")
if cursor.fetchone()[0] == 0:
    cursor.executemany(
        "INSERT INTO statements (title, date, file_path) VALUES (?, ?, ?)",
        [
            ("January 2025 Statement", "2025-01-31", "/files/jan2025.pdf"),
            ("February 2025 Statement", "2025-02-28", "/files/feb2025.pdf"),
        ],
    )
    conn.commit()

# ---- Models ----
class OTPRequest(BaseModel):
    email: str

class OTPVerify(BaseModel):
    statement_id: int
    otp: str

# ---- Routes ----
@app.get("/statements")
def get_statements():
    cursor.execute("SELECT id, title, date FROM statements")
    return [dict(id=row[0], title=row[1], date=row[2]) for row in cursor.fetchall()]

@app.post("/request-otp/{statement_id}")
def request_otp(statement_id: int, req: OTPRequest):
    otp = str(random.randint(100000, 999999))
    expiry = (datetime.datetime.now() + datetime.timedelta(minutes=5)).isoformat()
    cursor.execute("INSERT INTO otps (statement_id, otp, expiry) VALUES (?, ?, ?)",
                   (statement_id, otp, expiry))
    conn.commit()

    # DEMO: Print OTP instead of sending
    print(f"OTP for statement {statement_id}: {otp} (to {req.email})")

    return {"message": f"OTP sent to {req.email}"}

@app.post("/verify-otp")
def verify_otp(data: OTPVerify):
    cursor.execute("SELECT otp, expiry FROM otps WHERE statement_id=? ORDER BY id DESC LIMIT 1",
                   (data.statement_id,))
    row = cursor.fetchone()
    if not row:
        raise HTTPException(status_code=400, detail="No OTP found")

    otp, expiry = row
    if data.otp != otp:
        raise HTTPException(status_code=400, detail="Invalid OTP")
    if datetime.datetime.now() > datetime.datetime.fromisoformat(expiry):
        raise HTTPException(status_code=400, detail="OTP expired")

    cursor.execute("SELECT file_path FROM statements WHERE id=?", (data.statement_id,))
    file_path = cursor.fetchone()[0]
    return {"fileUrl": file_path}