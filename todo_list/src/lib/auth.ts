import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { NextRequest } from 'next/server'

const JWT_SECRET = process.env.JWT_SECRET as string

export async function hashPassword (password: string) {
  return bcrypt.hash(password, 10)
}

export async function verifyPassword (password: string, hash: string) {
  return bcrypt.compare(password, hash)
}

export function generateToken (userId: string) {
  return jwt.sign({userId}, JWT_SECRET, {expiresIn: '7d'})
}

export function verifyToken (token: string) {
  try {
    return jwt.verify(token, JWT_SECRET) as {userId: string}
  } catch {
    return null
  }
}

export function getUserIdFromRequest(req: NextRequest) {
  const authHeader = req.headers.get('authorization') as string
  const token = authHeader?.split(' ')[1]

  if (!token) return null

  const decoded = verifyToken(token)
  return decoded?.userId ?? null
}