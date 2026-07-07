import { NextRequest, NextResponse } from 'next/server'
import { getUserIdFromRequest } from '@/lib/auth' // ou caminho relativo

export function proxy(req: NextRequest) {
  const userId = getUserIdFromRequest(req)

  if (!userId) {
    return NextResponse.json({ message: 'Não autorizado' }, { status: 401 })
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/api/tasks/:path*']
}