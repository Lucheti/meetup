import { resolver } from "blitz"
import db, { Images } from "db"

export default resolver.pipe(
  resolver.authorize(),
  async ({ images }: { images: Omit<Images, "id" | "userId"> }, ctx) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant

    await db.images.upsert({
      where: {
        userId: ctx.session.userId,
      },
      create: {
        ...images,
        user: { connect: { id: ctx.session.userId } },
      },
      update: images,
    })
  }
)
