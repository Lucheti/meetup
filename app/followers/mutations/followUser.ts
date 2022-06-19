import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const FollowUser = z.object({
  followeeId: z.string().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(
  resolver.zod(FollowUser),
  resolver.authorize(),
  async ({ followeeId, ...data }, ctx) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const userId = ctx.session.userId

    return await db.follower.create({
      data: {
        follower: {
          connect: { id: userId },
        },
        followee: {
          connect: { id: followeeId },
        },
      },
    })
  }
)
