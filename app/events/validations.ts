import { z } from "zod"

export const CreateEvent = z.object({
  name: z.string(),
  location: z.object({
    lat: z.number(),
    lng: z.number(),
    alias: z.string(),
  }),
  date: z.date(),
  capacity: z.number(),
})

export const UpdateEvent = z.object({
  id: z.string(),
  name: z.string(),
})

export const JoinEvent = z.object({
  id: z.string(),
})
