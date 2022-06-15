import { resolver } from "blitz"
import db from "db"
import { CreateEvent } from "../validations"

export default resolver.pipe(
  resolver.zod(CreateEvent),
  resolver.authorize(),
  async ({ name, userId }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const event = await db.event.create({
      data: {
        name,
        owner: {
          connect: { id: userId },
        },
        participants: { create: [] },
      },
    })

    return event
  }
)
