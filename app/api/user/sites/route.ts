import { NextResponse } from "next/server"
import { auth } from "@/auth"
import prisma from "@/lib/prisma"

export async function GET() {
    try {
        const session = await auth()
        
        if (!session?.user?.id) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const sites = await prisma.site.findMany({
            where: {
                userId: session.user.id
            },
            orderBy: {
                createdAt: 'asc'
            },
            select: {
                id: true,
                name: true,
                createdAt: true
            }
        })

        return NextResponse.json(sites)
    } catch (error) {
        console.log('[USER_SITES_GET]', error)
        return new NextResponse("Internal error", { status: 500 })
    }
}