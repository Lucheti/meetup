import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UnfollowUser = z.object({
  followeeId: z.string(),
})

export default resolver.pipe(
  resolver.zod(UnfollowUser),
  resolver.authorize(),
  async ({ followeeId, ...data }, ctx) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const userId = ctx.session.userId

    return await db.follower.delete({
      where: {
        followerId_followeeId: {
          followerId: userId,
          followeeId,
        },
      },
    })
  }
)
