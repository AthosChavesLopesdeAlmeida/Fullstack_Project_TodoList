import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getUserIdFromRequest } from "@/lib/auth";

export async function DELETE(req: NextRequest) {
  const userId = getUserIdFromRequest(req) 

  if (!userId) {
    return NextResponse.json(
      {message: 'User Id not found'},
      {status: 401}
    )
  }

  await prisma.user.delete({
    where: {id: userId}
  })

  return NextResponse.json(
    {message: 'User deleted successfully'},
    {status: 200}
  )

}