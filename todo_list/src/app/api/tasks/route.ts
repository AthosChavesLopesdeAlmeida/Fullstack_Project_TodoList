import { prisma } from "../../../lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getUserIdFromRequest } from "@/lib/auth";

export async function GET (req: NextRequest) {
  const userId = getUserIdFromRequest(req)
  if (!userId) return NextResponse.json({ message: 'Id do usuário não encontrado' }, { status: 401 }) 

  const tasks = await prisma.task.findMany({where: { userId }})
  return NextResponse.json(tasks)
}

export async function POST (req: NextRequest) {
  const userId = getUserIdFromRequest(req)
  if (!userId) return NextResponse.json({ message: 'Id do usuário não encontrado' }, { status: 401 })

  const { title, description } = await req.json()

  if (!title) return NextResponse.json({ message: 'A task deve ter um título' }, { status: 400 })
  
  const task = await prisma.task.create({
    data: { title, description, userId }
  })

  return NextResponse.json(task, { status: 201 })
}