import { z } from "zod"
import { EventVisibility } from "db"
import { Images } from "../images/validations"

export const CreateEvent = z.object({
  name: z.string(),
  location: z.object({
    alias: z.string(),
    coords: z.object({
      lat: z.number(),
      lng: z.number(),
    }),
  }),
  date: z.date(),
  time: z.date(),
  capacity: z.number(),
  visibility: z.enum([EventVisibility.Public, EventVisibility.Private]),
  images: Images,
  paymentOptions: z.array(
    z.object({
      name: z.string(),
      price: z.number().min(0),
      description: z.string(),
    })
  ),
})

export const UpdateEvent = z.object({
  id: z.string(),
  name: z.string(),
  location: z.object({
    alias: z.string(),
    coords: z.object({
      lat: z.number(),
      lng: z.number(),
    }),
  }),
  date: z.date(),
  time: z.date(),
  capacity: z.number(),
  visibility: z.enum([EventVisibility.Public, EventVisibility.Private]),
  images: Images,
  paymentOptions: z.array(
    z.object({
      id: z.string().optional(),
      name: z.string(),
      price: z.number().min(0),
      description: z.string().optional(),
    })
  ),
})

export const JoinEvent = z.object({
  id: z.string(),
})
