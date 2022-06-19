import db from "db"
import { Queue } from "quirrel/blitz"
import { EmailSender } from "../../../integrations/emailjs"

const TEMPLATE_ID = "template_3yid9v8"

// it's important to export it as default
export default Queue(
  "api/mailing/verify-email-queue", // 👈 the route that it's reachable on
  async (userId: string) => {
    const user = await db.user.findFirst({ where: { id: userId } })

    if (!user) {
      throw new Error("User not found")
    }

    const { email, name } = user

    const origin = process.env.APP_ORIGIN || process.env.BLITZ_DEV_SERVER_ORIGIN

    const content = {
      name,
      email,
      message: `Thanks for signing up! please verify your email address by clicking on the link below.`,
      link: `${origin}/verify/${userId}`,
    }

    EmailSender.send(content, TEMPLATE_ID)
  }
)
