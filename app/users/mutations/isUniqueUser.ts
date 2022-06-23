import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const GetUser = z.object({
  // This accepts type of undefined, but is required at runtime
  key: z.string(),
  value: z.string(),
})

export default resolver.pipe(resolver.zod(GetUser), async ({ key, value }) => {
  return !(await db.user.findFirst({
    where: { [key]: value },
  }))
})
