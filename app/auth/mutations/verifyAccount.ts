import { resolver } from "blitz"
import db from "db"
import { Role } from "types"
import confirmationEmailQueue from "../../api/mailing/signup-confirmation"

export default resolver.pipe(resolver.authorize(), async (_, ctx) => {
  const user = await db.user.update({
    where: { id: ctx.session.userId },
    data: { emailVerified: true },
    include: { images: true },
  })

  confirmationEmailQueue.enqueue(user.id)

  await ctx.session.$create({
    userId: user.id,
    role: user.role as Role,
    verified: user.emailVerified,
    images: user.images,
  })
  return user
})
