import { z } from "zod"
import { Sex } from "db"

export const email = z
  .string()
  .email()
  .transform((str) => str.toLowerCase().trim())

export const username = z.string()

export const password = z
  .string()
  .min(10)
  .max(100)
  .transform((str) => str.trim())

export const name = z
  .string()
  .max(100)
  .transform((str) => str.trim())

export const Signup = z.object({
  email,
  password,
  username,
  name,
  lastName: name,
  sex: z.enum([Sex.Male, Sex.Female, Sex.Other]),
})

export const Login = z.object({
  identifier: z.string(),
  password: z.string(),
})

export const ForgotPassword = z.object({
  email,
})

export const ResetPassword = z
  .object({
    password: password,
    passwordConfirmation: password,
    token: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: ["passwordConfirmation"], // set the path of the error
  })

export const ChangePassword = z.object({
  currentPassword: z.string(),
  newPassword: password,
})
