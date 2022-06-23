import { resolver } from "blitz"
import db from "db"
import { UpdateEvent } from "../validations"

export default resolver.pipe(
  resolver.zod(UpdateEvent),
  resolver.authorize(),
  async (input, ctx) => {
    const event = await db.event.findFirst({ where: { id: input.id }, include: { owner: true } })
    if (!event || event.owner.id !== ctx.session.userId)
      throw new Error("Unauthorized attempt to edit event")

    return input
  },
  async ({ id, location, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const event = await db.event.update({
      where: { id },
      data: {
        ...data,
        location: {
          update: {
            latitude: location.lat,
            longitude: location.lng,
            alias: location.alias,
          },
        },
      },
      include: {
        participants: {
          select: {
            name: true,
            email: true,
            images: true,
          },
        },
        location: true,
        owner: true,
      },
    })

    return event
  }
)
