import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { authorizeApiKey } from "@/actions/api-keys"

export async function GET(
    req: Request,
    { params }: { params: { siteId: string; imageId: string } }
) {
    const headers = req.headers
    const apiKey = headers.get("x-api-key")

    if (!apiKey) {
        return new NextResponse("Unauthorized", { status: 401 })
    }

    try {
        if (!params.siteId) {
            return new NextResponse("Site id is required", { status: 400 })
        }

        if (!params.imageId) {
            return new NextResponse("Image id is required", { status: 400 })
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

        const image = await prisma.image.findFirst({
            where: {
                id: params.imageId,
                siteId: params.siteId
            },
            include: {
                gallery: true
            }
        })

        if (!image) {
            return new NextResponse("Image not found", { status: 404 })
        }

        // Format response to match API documentation
        const response = {
            id: image.id,
            originalUrl: image.originalUrl,
            cdnUrl: image.cdnUrl,
            alt: image.alt || "",
            description: image.description || "",
            link: image.link || "",
            gallery: {
                id: image.gallery.id,
                name: image.gallery.name
            },
            createdAt: image.createdAt,
            updatedAt: image.updatedAt
        }

        const apiResponse = NextResponse.json(response)
        
        // Add rate limit headers
        apiResponse.headers.set('X-RateLimit-Limit', '1000')
        apiResponse.headers.set('X-RateLimit-Remaining', '999')
        apiResponse.headers.set('X-RateLimit-Reset', new Date(Date.now() + 3600000).toISOString())
        
        return apiResponse
    } catch (error) {
        console.log('[IMAGE_GET]', error)
        return new NextResponse("Internal error", { status: 500 })
    }
}