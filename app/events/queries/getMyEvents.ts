import { paginate, resolver } from "blitz"
import db, { Prisma, EventVisibility } from "db"

interface GetEventsInput
  extends Pick<Prisma.EventFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetEventsInput, ctx) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const userId = ctx.session.userId

    where = where || {}
    const uiFilter = where.OR

    where.AND = [{ OR: uiFilter }, { owner: { is: { id: userId } } }]

    console.log("WHERE", where)

    const {
      items: events,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.event.count({ where }),
      query: (paginateArgs) =>
        db.event.findMany({
          ...paginateArgs,
          where,
          orderBy,
          include: {
            owner: true,
            participants: true,
            location: true,
          },
        }),
    })

    return {
      events,
      nextPage,
      hasMore,
      count,
    }
  }
)
