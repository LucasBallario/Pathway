'use server'

import { runFullScan } from "@/app/lib/search"

export async function POST(request) {
    const formData = await request.formData()

    const name = formData.get('fullName')
    const email = formData.get("email")
    const keywords = formData.get("keyWords")
    const region = formData.get("region")

    const results = runFullScan({
        name,
        email,
        keywords,
        region
    })
    return  Response.json({results})
}