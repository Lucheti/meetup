import db from "db"
import { Queue } from "quirrel/blitz"
import { StrapiApi } from "../../../integrations/strapi"

// it's important to export it as default
export default Queue(
  "api/strapi/profile-image-upload-queue", // 👈 the route that it's reachable on
  async ({ userId, form }: { userId: string; form: FormData }) => {
    const user = await db.user.findFirst({ where: { id: userId } })

    if (!user) {
      throw new Error("User not found")
    }

    StrapiApi.uploadImage(form).then(console.log)
  }
)
