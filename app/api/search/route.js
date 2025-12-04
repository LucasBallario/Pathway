'use server'

export async function POST(request) {
  try {
    const formData = await request.formData()

    const name = formData.get("fullName")
    const email = formData.get("email")
    const keywords = formData.get("keyWords")
    const region = formData.get("region")

    name = name.trim().toLowerCase()
    email = email.trim().toLowerCase()

    const parsedKeywords = keywords
    .toLowerCase()
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


    if (!name && parsedKeywords.length === 0) {
      return Response.json(
        { error: "Information is missing" },
        { status: 400 }
      )
    }

    return Response.json({
      message: "Form received",
      data: { name, email, keywords, region }
    })

  } catch (error) {
    console.error("Error parsing form:", error)
    return Response.json(
      { error: "Server error" },
      { status: 500 }
    )
  }
}
