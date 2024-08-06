import { cpf } from "cpf-cnpj-validator"
import dayjs from "dayjs"
import isLeapYear from "dayjs/plugin/isLeapYear"
import { z } from "zod"

dayjs.extend(isLeapYear)

function transformDateToISO(value: string) {
  const [day, month, year] = value.split("/")
  console.log(`${year}-${month}-${day}`)
  return `${year}-${month}-${day}`
}

function verifyLeepYear(value: string) {
  if (value.includes("02-29")) {
    if (dayjs(value).isLeapYear()) return true
    else return false
  }

  return true
}

function isAtLeast18YearsOld(date: string) {
  return dayjs().diff(dayjs(date), "year") >= 18
}

export const registerSchema = z
  .object({
    name: z
      .string({ required_error: "Full name is required" })
      .min(10, { message: "Full name must have at least 10 characters" }),
    cpf: z
      .string()
      .length(14)
      .refine((value) => cpf.isValid(value), {
        message: "Invalid CPF",
      }),
    birthDate: z
      .string()
      .length(10)
      .transform((value) => transformDateToISO(value))
      .refine((value) => dayjs(value).isValid(), {
        message: "Invalid date",
      })
      .refine((value) => verifyLeepYear(value), {
        message: "Invalid date",
      })
      .refine((value) => isAtLeast18YearsOld(value), {
        message: "Must be at least 18 years old",
      }),
    phone: z.string().length(15),
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
    profilePicture: z.any().optional(),
  })
  .refine((fields) => fields.password === fields.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  })

export type registerData = z.infer<typeof registerSchema>
