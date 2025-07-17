import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

const ADMIN_USER = process.env.ADMIN_USER
const ADMIN_PASS = process.env.ADMIN_PASS
const JWT_SECRET = process.env.JWT_SECRET || 'volteo_super_secreto_2024'

export async function POST(req: NextRequest) {
  const { user, pass } = await req.json()
  if (user === ADMIN_USER && pass === ADMIN_PASS) {
    const token = jwt.sign({ user }, JWT_SECRET, { expiresIn: '2h' })
    const res = NextResponse.json({ ok: true })
    res.cookies.set('admin_token', token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 2,
      path: '/',
    })
    return res
  }
  return NextResponse.json({ error: 'Credenciales incorrectas' }, { status: 401 })
} 