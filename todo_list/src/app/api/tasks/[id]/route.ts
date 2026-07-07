import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'
import { getUserIdFromRequest } from '../../../../lib/auth'

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const userId = getUserIdFromRequest(req)
  if (!userId) return NextResponse.json({ message: '...' }, { status: 401 })

  const { id } = await params
  const body = await req.json()

  const {title, description, completed} = body

  const task = await prisma.task.findUnique({ where: { id } })

  if (!task) {
    return NextResponse.json({ message: 'Task não encontrada' }, { status: 404 })
  }

  if (task.userId !== userId) {
    return NextResponse.json({ message: 'Você não tem permissão para essa task' }, { status: 403 })
  }

  const updatedTask = await prisma.task.update({
    where: {id},
    data: { title, description, completed }
  })

  return NextResponse.json(updatedTask)
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const userId = getUserIdFromRequest(req)
  if (!userId) return NextResponse.json({ message: '...' }, { status: 401 })

  const { id } = await params

  const task = await prisma.task.findUnique({ where: { id } })

  if (!task) {
    return NextResponse.json({ message: 'Task não encontrada' }, { status: 404 })
  }

  if (task.userId !== userId) {
    return NextResponse.json({ message: 'Você não tem permissão para essa task' }, { status: 403 })
  }

  await prisma.task.delete({ where: { id, userId } })
  return NextResponse.json({ message: 'Task deletada com sucesso' })
}