import { resolver } from "blitz"
import db, { EventVisibility } from "db"
import { CreateEvent } from "../validations"

export default resolver.pipe(
  resolver.zod(CreateEvent),
  resolver.authorize(),
  async ({ name, location, ...rest }, { session }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const event = await db.event.create({
      data: {
        ...rest,
        name,
        owner: {
          connect: { id: session.userId },
        },
        participants: { create: [] },
        visibility: EventVisibility.Public,
        location: {
          create: {
            alias: location.alias,
            latitude: location.lat,
            longitude: location.lng,
          },
        },
      },
    })

    return event
  }
)
