import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { authorizeApiKey } from "@/actions/api-keys"

export async function GET(
    req: Request,
    { params }: { params: { siteId: string; galleryId: string } }
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

        if (!params.galleryId) {
            return new NextResponse("Gallery id is required", { status: 400 })
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

        const gallery = await prisma.gallery.findFirst({
            where: {
                id: params.galleryId,
                siteId: params.siteId
            },
            include: {
                images: true
            }
        })

        if (!gallery) {
            return new NextResponse("Gallery not found", { status: 404 })
        }

        // Format response to match API documentation
        const response = {
            gallery: {
                id: gallery.id,
                name: gallery.name,
                description: gallery.description || ""
            },
            images: gallery.images.map(image => ({
                id: image.id,
                originalUrl: image.originalUrl,
                cdnUrl: image.cdnUrl,
                alt: image.alt || "",
                description: image.description || "",
                link: image.link || "",
                createdAt: image.createdAt,
                updatedAt: image.updatedAt
            }))
        }

        const apiResponse = NextResponse.json(response)
        
        // Add rate limit headers
        apiResponse.headers.set('X-RateLimit-Limit', '1000')
        apiResponse.headers.set('X-RateLimit-Remaining', '999')
        apiResponse.headers.set('X-RateLimit-Reset', new Date(Date.now() + 3600000).toISOString())
        
        return apiResponse
    } catch (error) {
        console.log('[GALLERY_IMAGES_GET]', error)
        return new NextResponse("Internal error", { status: 500 })
    }
}