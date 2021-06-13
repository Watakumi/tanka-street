import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateTanka = z.object({
  firstLine: z.string(),
  secondLine: z.string(),
  thirdLine: z.string(),
  fourthLine: z.string(),
  fifthLine: z.string(),
})

export default resolver.pipe(resolver.zod(CreateTanka), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const tanka = await db.tanka.create({ data: input })

  return tanka
})
