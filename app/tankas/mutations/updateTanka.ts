import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UpdateTanka = z.object({
  id: z.number(),
  firstLine: z.string(),
  secondLine: z.string(),
  thirdLine: z.string(),
  fourthLine: z.string(),
  fifthLine: z.string(),
})

export default resolver.pipe(
  resolver.zod(UpdateTanka),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const tanka = await db.tanka.update({ where: { id }, data })

    return tanka
  }
)
