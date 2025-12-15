'use server'

import { runFullScan } from "@/lib/search"

export async function POST(request) {
    const formData = await request.formData()

    const clean = (str) => str?.trim().toLowerCase() || "";

    const name = clean(formData.get('fullName'))
    const email = clean(formData.get("email"))
    const keywords = clean(formData.get("keyWords"))
    const region = clean(formData.get("region"))



    const results = await runFullScan({
        name,
        email,
        keywords,
        region
    })

       
    return  Response.json({
        message: "Scan complete",
        results
    })
}

