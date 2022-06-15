import { z } from "zod"

export const CreateEvent = z.object({
  name: z.string(),
  userId: z.string(),
})

export const UpdateEvent = z.object({
  id: z.string(),
  name: z.string(),
})

export const JoinEvent = z.object({
  id: z.string(),
})
