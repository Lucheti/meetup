import { resolver } from "blitz"
import db from "db"
import { z } from "zod"
import { Images } from "../../images/validations"
import { CreateProvider } from "../validations"

export default resolver.pipe(
  resolver.zod(CreateProvider),
  resolver.authorize(),
  async ({ name, services, images }, ctx) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const provider = await db.provider.create({
      data: {
        name,
        services: {
          create: services,
        },
        user: {
          connect: { id: ctx.session.userId },
        },
        images: {
          create: images,
        },
      },
    })

    return provider
  }
)
