import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const DeleteTanka = z.object({
  id: z.number(),
})

export default resolver.pipe(resolver.zod(DeleteTanka), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const tanka = await db.tanka.deleteMany({ where: { id } })

  return tanka
})
