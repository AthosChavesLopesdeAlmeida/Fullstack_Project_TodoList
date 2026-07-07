import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { hashPassword, generateToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const { name, email, password } = await req.json()

  if (!name || !email || !password) {
    return NextResponse.json({message: 'Nome, email e senha são obrigatórios'}, {status: 400})
  }

  const existingUser = await prisma.user.findUnique({where: { email }})
  if (existingUser) {
    return NextResponse.json({message: 'O usuário já existe'}, {status: 409})
  }

  const hashedPassword = await hashPassword(password)
  const user = await prisma.user.create({
    data: {email, name, password: hashedPassword}
  })

  const token = generateToken(user.id)
  return NextResponse.json({token, user: {id: user.id, email: user.email}}, {status: 201})
}