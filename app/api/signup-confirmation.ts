import db from "db"
import { Queue } from "quirrel/blitz"
import { EmailSender } from "../../integrations/emailjs"

const TEMPLATE_ID = "template_kare2cd"

// it's important to export it as default
export default Queue(
  "api/signup-confirmation", // 👈 the route that it's reachable on
  async (userId: string) => {
    const user = await db.user.update({
      where: { id: userId },
      data: { emailVerified: true },
    })

    if (!user) {
      throw new Error("User not found")
    }

    const { email, name } = user

    const origin = process.env.APP_ORIGIN || process.env.BLITZ_DEV_SERVER_ORIGIN

    const content = {
      name,
      email,
      message: `Your account has been verified.`,
    }

    EmailSender.send(content, TEMPLATE_ID)
  }
)
