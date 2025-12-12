'use server'

export async function POST(request) {
  try {
    const formData = await request.formData()

    const name = formData.get("fullName")?.trim().toLowerCase() || ""
    const email = formData.get("email")?.trim().toLowerCase() || ""
    
    const rawKeywords = formData.get("keyWords")?.trim().toLowerCase() || ""
    let region = formData.get("region")

    const keywords = rawKeywords
      .split(",")
      .map(k => k.trim())
      .filter(k => k.length > 0)

    const validRegions = [
      "AR","US","MX","ES","CO","CL","PE","VE","EC","BR",
      "UY","PY","BO","CR","PA","GT","HN","SV","NI","DO","CU","PR"
    ]

    if (!validRegions.includes(region)) {
      region = "GLOBAL"
    }

    if (!name && keywords.length === 0) {
      return Response.json(
        { error: "Information is missing" },
        { status: 400 }
      )
    }

    return Response.json({
      message: "Form received",
      data: {
        name,
        email,
        keywords,
        region
      }
    })

  } catch (error) {
    console.error("Error parsing form:", error)
    return Response.json(
      { error: "Server error" },
      { status: 500 }
    )
  }
}
