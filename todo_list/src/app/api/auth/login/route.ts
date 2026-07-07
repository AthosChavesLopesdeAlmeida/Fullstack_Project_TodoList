import { prisma } from "@/lib/prisma";
import { verifyPassword, generateToken } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST (req: NextRequest) {
  const { email, password } = await req.json()
  
  if (!email || !password) {
    return NextResponse.json({message: 'O email e a senha são obrigatórios'}, {status: 400})
  }

  const user = await prisma.user.findUnique({where: {email}})
  if (!user) {
    return NextResponse.json({message: 'O usuário não existe'}, {status: 401})
  }

  const passwordIsValid = await verifyPassword(password, user.password)
  if (!passwordIsValid) {
    return NextResponse.json({message: 'A senha é inválida'}, {status: 401})
  }

  const token = generateToken(user.id)
  return NextResponse.json({token, user: {id: user.id, email: user.email}}, {status: 200})
}