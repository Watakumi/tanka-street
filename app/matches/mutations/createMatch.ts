import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateMatch = z.object({
  name: z.string(),
})

export default resolver.pipe(resolver.zod(CreateMatch), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const match = await db.match.create({ data: input })

  return match
})
