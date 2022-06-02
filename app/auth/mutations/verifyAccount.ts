import { resolver } from "blitz"
import db from "db"
import { Role } from "types"
import { z } from "zod"
import confirmationEmailQueue from "../../api/signup-confirmation"

const UserId = z.string()

export default resolver.pipe(resolver.zod(UserId), async (userId, ctx) => {
  const user = await db.user.update({
    where: { id: userId },
    data: { emailVerified: true },
  })

  confirmationEmailQueue.enqueue(user.id).then((job) => console.log(`JOB: ${job.body}`))

  await ctx.session.$create({
    userId: user.id,
    role: user.role as Role,
    verified: user.emailVerified,
  })
  return user
})
