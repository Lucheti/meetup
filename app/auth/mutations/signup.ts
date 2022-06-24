import db from "db"
import emailQueue from "../../api/mailing/verify-email-queue"
import { resolver, SecurePassword } from "blitz"
import { Signup } from "app/auth/validations"

export default resolver.pipe(
  resolver.zod(Signup),
  async ({ email, password, name, lastName, sex, username }, ctx) => {
    const hashedPassword = await SecurePassword.hash(password.trim())

    const user = await db.user.create({
      data: {
        email: email.toLowerCase().trim(),
        hashedPassword,
        name,
        role: "USER",
        sex,
        lastName,
        username,
      },
      select: { id: true, name: true, email: true, role: true, emailVerified: true, sex: true },
    })
    emailQueue.enqueue(user.id)

    return user
  }
)
