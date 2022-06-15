import { NotFoundError, resolver } from "blitz"
import db from "../../../db"
import { z } from "zod"

const IsParticipant = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.string().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(
  resolver.zod(IsParticipant),
  resolver.authorize(),
  async ({ id }, ctx) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const event = await db.event.findFirst({
      where: {
        AND: {
          id,
          participants: {
            some: {
              id: ctx.session.userId,
            },
          },
        },
      },
    })

    return !!event
  }
)
