import { resolver } from "blitz"
import db, { Sex } from "db"
import { z } from "zod"
import { Images } from "../../images/validations"

const UpdateUser = z.object({
  name: z.string(),
  lastName: z.string(),
  sex: z.enum([Sex.Male, Sex.Female, Sex.Other]),
  email: z.string(),
  username: z.string(),
  images: Images,
})

export default resolver.pipe(resolver.authorize(), resolver.zod(UpdateUser), async (data, ctx) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant

  return await db.user.update({
    where: {
      id: ctx.session.userId,
    },
    data: {
      ...data,
      images: {
        upsert: {
          create: data.images,
          update: data.images,
        },
      },
    },
  })
})
