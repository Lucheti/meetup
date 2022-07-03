import { resolver } from "blitz"
import db from "db"
import { z } from "zod"
import { CreateProvider, UpdateProvider } from "../validations"

export default resolver.pipe(
  resolver.zod(UpdateProvider),
  resolver.authorize(),
  async ({ id, name, images, services }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const provider = await db.provider.update({
      where: { id },
      data: {
        name,
        images: {
          update: images,
        },
        services: {
          update: services.map((service) => ({
            where: { id: service.id },
            data: {
              title: service.title,
              price: service.price,
              description: service.description,
            },
          })),
        },
      },
      include: {
        images: true,
        services: true,
      },
    })

    return provider
  }
)
