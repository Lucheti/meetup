import { z } from "zod"
import { EventVisibility } from "db"

export const CreateEvent = z.object({
  name: z.string(),
  location: z.object({
    lat: z.number(),
    lng: z.number(),
    alias: z.string(),
  }),
  date: z.date(),
  capacity: z.number(),
  visibility: z.enum([EventVisibility.Public, EventVisibility.Private]),
})

export const UpdateEvent = z.object({
  id: z.string(),
  name: z.string(),
  location: z.object({
    lat: z.number(),
    lng: z.number(),
    alias: z.string(),
  }),
  date: z.date(),
  capacity: z.number(),
  visibility: z.enum([EventVisibility.Public, EventVisibility.Private]),
})

export const JoinEvent = z.object({
  id: z.string(),
})
