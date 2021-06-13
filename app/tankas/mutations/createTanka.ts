import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateTanka = z.object({
  name: z.string(),
})

export default resolver.pipe(resolver.zod(CreateTanka), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const tanka = await db.tanka.create({ data: input })

  return tanka
})
