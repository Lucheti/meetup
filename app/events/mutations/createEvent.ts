import { resolver } from "blitz"
import db from "db"
import { CreateEvent } from "../validations"
import dayjs from "dayjs"

export default resolver.pipe(
  resolver.zod(CreateEvent),
  resolver.authorize(),
  async ({ name, location, images, paymentOptions, date, time, ...rest }, { session }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const combinedDate = dayjs(date)
      .set("hour", time.getHours())
      .set("minute", time.getMinutes())
      .toDate()

    const event = await db.event.create({
      data: {
        ...rest,
        name,
        date: combinedDate,
        owner: {
          connect: { id: session.userId },
        },
        participants: { create: [] },
        location: {
          create: {
            alias: location.alias,
            latitude: location.coords.lat,
            longitude: location.coords.lng,
          },
        },
        images: {
          create: {
            ...images,
          },
        },
        paymentOptions: {
          create: paymentOptions,
        },
      },
    })

    return event
  }
)
