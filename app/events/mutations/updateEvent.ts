import { resolver } from "blitz"
import db from "db"
import { UpdateEvent } from "../validations"
import dayjs from "dayjs"

export default resolver.pipe(
  resolver.zod(UpdateEvent),
  resolver.authorize(),
  async (input, ctx) => {
    const event = await db.event.findFirst({
      where: { id: input.id },
      include: { owner: true, images: true },
    })
    if (!event || event.owner.id !== ctx.session.userId)
      throw new Error("Unauthorized attempt to edit event")

    return { ...input, event }
  },
  async ({ id, location, event, date, time, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const combinedDate = dayjs(date)
      .set("hour", time.getHours())
      .set("minute", time.getMinutes())
      .toDate()

    return await db.event.update({
      where: { id },
      data: {
        ...data,
        date: combinedDate,
        location: {
          update: {
            latitude: location.coords.lat,
            longitude: location.coords.lng,
            alias: location.alias,
          },
        },
        images: {
          update: data.images,
        },
        paymentOptions: {
          upsert: data.paymentOptions.map((option) => ({
            where: { id: option?.id || "" },
            update: option,
            create: option,
          })),
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
        images: true,
        paymentOptions: true,
      },
    })
  }
)
