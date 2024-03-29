import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const GetEvent = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.string().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetEvent), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const event = await db.event.findFirst({
    where: { id },
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

  if (!event) throw new NotFoundError()

  return event
})
