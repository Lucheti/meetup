import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetProvidersInput
  extends Pick<Prisma.ProviderFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetProvidersInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: providers,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.provider.count({ where }),
      query: (paginateArgs) => db.provider.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      providers,
      nextPage,
      hasMore,
      count,
    }
  }
)
