'use server'

export  async function POST(request) {
    const formData = await request.formData()
    const name = formData.get("fullName")
    const email = formData.get("email")
    const keywords = formData.get("keyWords")
    const region = formData.get("region")

    if (!name && !keywords) {
        return Response.json(
            { error: "Information is missing" },
            { status: 400 }
          )
    }

    return Response.json(
        {
          message: "Form received",
          data: { name, email, keywords, region }
        }
      )

}
