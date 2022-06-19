import { paginate, resolver } from "blitz"
import db, { Prisma, EventVisibility } from "db"

interface GetEventsInput
  extends Pick<Prisma.FollowerFindManyArgs, "where" | "orderBy" | "skip" | "take"> {
  userId: string
}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100, userId }: GetEventsInput, ctx) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant

    return db.event.count({
      where: {
        ownerId: userId,
      },
    })
  }
)
