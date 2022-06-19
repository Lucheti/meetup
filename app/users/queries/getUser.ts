import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const GetUser = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.string().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetUser), resolver.authorize(), async ({ id }) => {
  return await db.user.findFirst({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      emailVerified: true,
      images: true,
      sex: true,
    },
  })
})
