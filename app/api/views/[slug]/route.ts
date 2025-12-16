import { NextResponse } from "next/server"
import crypto from "crypto"
import { kv } from "@vercel/kv"  // make sure to install: npm i @vercel/kv

function getIP(req: Request) {
  const forwarded = req.headers.get("x-forwarded-for")
  return forwarded ? forwarded.split(",")[0] : "0.0.0.0"
}

export async function POST(req: Request, { params }: { params: { slug: string } }) {
  const { slug } = params
  const ip = getIP(req)
  const hash = crypto.createHash("sha256").update(ip).digest("hex")

  const setKey = `views:${slug}:unique`
  const alreadyViewed = await kv.sismember(setKey, hash)

  if (!alreadyViewed) {
    await kv.sadd(setKey, hash)
    await kv.incr(`views:${slug}:count`)
  }

  const count = (await kv.get<number>(`views:${slug}:count`)) || 0
  return NextResponse.json({ views: count })
}

export async function GET(req: Request, { params }: { params: { slug: string } }) {
  const count = (await kv.get<number>(`views:${params.slug}:count`)) || 0
  return NextResponse.json({ views: count })
}