import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { authorizeApiKey } from "@/actions/api-keys"

export async function GET(
    req: Request,
    { params }: { params: { siteId: string } }
) {
    const headers = req.headers
    const apiKey = headers.get("x-api-key")

    if (!apiKey) {
        return new NextResponse("Unauthorized", { status: 403 })
    }

    try {
        
        if (!params.siteId) {
            return new NextResponse("Site id is required", { status: 400 })
        }

        const site = await prisma.site.findFirst({
            where: {
                id: params.siteId
            }
        })

        if (!site) {
            return new NextResponse("This site does not exist", { status: 404 })
        }

        const isAuthorized = await authorizeApiKey(params.siteId, apiKey)

        if (!isAuthorized) {
            return new NextResponse("Forbidden", { status: 403 })
        }

        const galleries = await prisma.gallery.findMany({
            where: {
                siteId: params.siteId
            },
            include: {
                images: true
            }
        })

        // Format response to match API documentation
        const formattedGalleries = galleries.map(gallery => ({
            id: gallery.id,
            name: gallery.name,
            description: gallery.description || "",
            imageCount: gallery.images.length,
            createdAt: gallery.createdAt,
            updatedAt: gallery.updatedAt
        }))

        const response = NextResponse.json(formattedGalleries)
        
        // Add rate limit headers
        response.headers.set('X-RateLimit-Limit', '1000')
        response.headers.set('X-RateLimit-Remaining', '999')
        response.headers.set('X-RateLimit-Reset', new Date(Date.now() + 3600000).toISOString())
        
        return response
    } catch (error) {
        console.log('[GALLERIES_GET]', error)
        return new NextResponse("Internal error", { status: 500 })
    }
}