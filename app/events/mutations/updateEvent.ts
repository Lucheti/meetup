import { resolver } from "blitz"
import db from "db"
import { UpdateEvent } from "../validations"

export default resolver.pipe(
  resolver.zod(UpdateEvent),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const event = await db.event.update({
      where: { id },
      data,
      include: { participants: true, location: true },
    })

    return event
  }
)
