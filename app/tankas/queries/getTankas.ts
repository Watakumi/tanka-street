import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetTankasInput
  extends Pick<Prisma.TankaFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetTankasInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: tankas,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.tanka.count({ where }),
      query: (paginateArgs) => db.tanka.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      tankas,
      nextPage,
      hasMore,
      count,
    }
  }
)
