import { resolver } from "blitz"
import db from "db"
import { JoinEvent } from "../validations"
import dayjs from "dayjs"

export class PastEventError extends Error {
  name = "PastEventError"
  message = "You can't join a past event"
}

export default resolver.pipe(resolver.zod(JoinEvent), resolver.authorize(), async ({ id }, ctx) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const userId = ctx.session.userId

  const event = await db.event.findFirst({ where: { id }, include: { participants: true } })
  const isPastEvent = dayjs(event?.date).isBefore(new Date())
  const userAlreadyJoined = event?.participants.some((participant) => participant.id === userId)

  if (userAlreadyJoined) {
    throw new Error("You already joined this event")
  }

  if (isPastEvent) {
    throw new PastEventError()
  }

  return await db.event.update({
    where: { id },
    data: {
      participants: {
        connect: { id: userId },
      },
    },
  })
})
