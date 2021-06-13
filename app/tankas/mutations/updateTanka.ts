import { resolver } from "blitz"
import db from "db"
import { z } from "zod"
import { ValidateTanka } from "../validation"

const UpdateTanka = z
  .object({
    id: z.number(),
  })
  .merge(ValidateTanka)

export default resolver.pipe(
  resolver.zod(UpdateTanka),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const tanka = await db.tanka.update({ where: { id }, data })

    return tanka
  }
)
