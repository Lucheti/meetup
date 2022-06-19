import { resolver, SecurePassword } from "blitz"
import db from "db"
import { Signup } from "app/auth/validations"
import emailQueue from "../../api/mailing/verify-email-queue"

export default resolver.pipe(resolver.zod(Signup), async ({ email, password, name, sex }, ctx) => {
  const hashedPassword = await SecurePassword.hash(password.trim())

  const user = await db.user.create({
    data: {
      email: email.toLowerCase().trim(),
      hashedPassword,
      name,
      role: "USER",
      sex,
    },
    select: { id: true, name: true, email: true, role: true, emailVerified: true, sex: true },
  })

  emailQueue.enqueue(user.id)

  return user
})
