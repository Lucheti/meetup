import { resolver, SecurePassword, AuthenticationError } from "blitz"
import db from "db"
import { Login } from "../validations"
import { Role } from "types"

export const authenticateUser = async (rawIdentifier: string, rawPassword: string) => {
  const { identifier, password } = Login.parse({ identifier: rawIdentifier, password: rawPassword })
  const user = await db.user.findFirst({
    where: { OR: [{ email: identifier }, { username: identifier }] },
    include: { images: true },
  })
  if (!user) throw new AuthenticationError()

  const result = await SecurePassword.verify(user.hashedPassword, password)

  if (result === SecurePassword.VALID_NEEDS_REHASH) {
    // Upgrade hashed password with a more secure hash
    const improvedHash = await SecurePassword.hash(password)
    await db.user.update({ where: { id: user.id }, data: { hashedPassword: improvedHash } })
  }

  const { hashedPassword, ...rest } = user
  return rest
}

export default resolver.pipe(resolver.zod(Login), async ({ identifier, password }, ctx) => {
  // This throws an error if credentials are invalid
  const user = await authenticateUser(identifier, password)

  await ctx.session.$create({
    userId: user.id,
    role: user.role as Role,
    verified: user.emailVerified,
    images: user?.images,
    username: user.username,
  })

  return user
})
