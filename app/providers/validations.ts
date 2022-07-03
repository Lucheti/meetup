import { z } from "zod"
import { Images } from "../images/validations"

const Services = z.array(
  z.object({
    id: z.string().optional(),
    title: z.string(),
    description: z.string(),
    price: z.number(),
  })
)

export const CreateProvider = z.object({
  name: z.string(),
  services: Services,
  images: Images,
})

export const UpdateProvider = z.object({
  id: z.string(),
  name: z.string(),
  services: Services,
  images: Images,
})
