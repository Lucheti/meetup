import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const DeleteEvent = z.object({
  id: z.string(),
})

export default resolver.pipe(resolver.zod(DeleteEvent), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const event = await db.event.deleteMany({ where: { id } })

  return event
})
