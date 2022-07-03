import { z } from "zod"

export const Images = z.object({
  url_small: z.string(),
  url_medium: z.string(),
  url_large: z.string(),
})
