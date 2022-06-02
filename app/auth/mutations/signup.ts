import { resolver, SecurePassword } from "blitz"
import db from "db"
import { Signup } from "app/auth/validations"
import { Role } from "types"
import emailQueue from "../../api/verify-email-queue"

export default resolver.pipe(resolver.zod(Signup), async ({ email, password, name }, ctx) => {
  const hashedPassword = await SecurePassword.hash(password.trim())

  const user = await db.user.create({
    data: { email: email.toLowerCase().trim(), hashedPassword, name, role: "USER" },
    select: { id: true, name: true, email: true, role: true, emailVerified: true },
  })

  emailQueue.enqueue(user.id).then((job) => console.log(`JOB: ${job.body}`))

  return user
})
