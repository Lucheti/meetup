import { paginate, resolver } from "blitz"
import db, { Prisma, EventVisibility } from "db"

interface GetFollowersInput
  extends Pick<Prisma.FollowerFindManyArgs, "where" | "orderBy" | "skip" | "take"> {
  userId: string
}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100, userId }: GetFollowersInput, ctx) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant

    return db.follower.count({
      where: {
        followeeId: userId,
      },
    })
  }
)
