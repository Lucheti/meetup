import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const GetProvider = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.string().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetProvider), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const provider = await db.provider.findFirst({
    where: { id },
    include: { images: true, services: true },
  })

  if (!provider) throw new NotFoundError()

  return provider
})
