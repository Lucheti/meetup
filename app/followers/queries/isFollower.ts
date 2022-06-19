import { paginate, resolver } from "blitz"
import db, { Prisma, EventVisibility } from "db"
import { z } from "zod"

const GetFollowersInput = z.object({
  followeeId: z.string().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(
  resolver.authorize(),
  resolver.zod(GetFollowersInput),
  async ({ followeeId }, ctx) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const userId = ctx.session.userId
    const follower = await db.follower.findFirst({
      where: {
        followerId: userId,
        followeeId: followeeId,
      },
    })

    return !!follower
  }
)
