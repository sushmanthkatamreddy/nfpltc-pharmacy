from fastapi import FastAPI, UploadFile
from pdf2image import convert_from_bytes
from PIL import Image
import pytesseract, re

app = FastAPI()

TOP_PCT = 0.25
ACC_RE = re.compile(r"(Account|Acct)[^\d]*(\d{6,})", re.I)
DOB_RE = re.compile(r"(DOB|Date of Birth)[^0-9]*(\d{1,2}[\-/]\d{1,2}[\-/]\d{2,4})", re.I)
NAME_RE = re.compile(r"(Name|Patient)[^A-Za-z]*([A-Za-z][A-Za-z\s\-']{1,40})", re.I)

@app.post("/ocr/extract-top")
async def extract_top(file: UploadFile):
    data = await file.read()
    page = convert_from_bytes(data, first_page=1, last_page=1, dpi=300)[0]
    w, h = page.size
    crop = page.crop((0, 0, w, int(h * TOP_PCT)))
    text = pytesseract.image_to_string(crop)

    def grab(regex):
        m = regex.search(text)
        return m.group(2).strip() if m else None

    result = {
        "account_number": grab(ACC_RE),
        "dob_raw": grab(DOB_RE),
        "first_name": (NAME_RE.search(text).group(2).split()[0] if NAME_RE.search(text) else None),
        "raw": text,
        "confidence": 0.82
    }
    return { "fields": result }