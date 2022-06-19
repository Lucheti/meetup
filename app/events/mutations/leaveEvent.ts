import { resolver } from "blitz"
import db from "db"
import { JoinEvent } from "../validations"

export default resolver.pipe(resolver.zod(JoinEvent), resolver.authorize(), async ({ id }, ctx) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const userId = ctx.session.userId
  return await db.event.update({
    where: { id },
    data: {
      participants: {
        disconnect: { id: userId },
      },
    },
  })
})
