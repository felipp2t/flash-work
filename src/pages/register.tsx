import { Button } from "@/components/ui/button"
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  Form,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, ControllerRenderProps, useForm } from "react-hook-form"
import { z } from "zod"
import GoogleImage from "/google-icon.png"
import { PatternFormat, PatternFormatProps } from "react-number-format"
import {
  Calendar,
  IdCard,
  Lock,
  Mail,
  Phone,
  Shield,
  CircleUser,
  UserPen,
  Eye,
  EyeOff,
} from "lucide-react"
import { ChangeEvent, useState } from "react"
import dayjs from "dayjs"
import "dayjs/locale/pt-br"
import { cpf } from "cpf-cnpj-validator"
import { Progress } from "@/components/ui/progress"
import validator from "validator"
import isLeapYear from "dayjs/plugin/isLeapYear"

dayjs.extend(isLeapYear)

function verifyLeepYear(value: string) {
  if (value.includes("02-29")) {
    if (dayjs(value).isLeapYear()) return true
    else return false
  }

  return true
}

function transformDateToISO(value: string) {
  const [day, month, year] = value.split("/")
  console.log(`${year}-${month}-${day}`)
  return `${year}-${month}-${day}`
}

function isAtLeast18YearsOld(date: string) {
  return dayjs().diff(dayjs(date), "year") >= 18
}

const schema = z
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

export const Register = (props: Partial<PatternFormatProps>) => {
  const [isEyeOpen, setIsEyeOpen] = useState("password")
  const [progress, setProgress] = useState(0)

  function changeTypeInputPassword() {
    setIsEyeOpen((isEyeOpen) =>
      isEyeOpen === "password" ? "text" : "password",
    )
  }

  const form = useForm<z.infer<typeof schema>>({
    defaultValues: {
      name: "Felipe Rossetto",
      cpf: "125.176.129-19",
      phone: "(48) 99901-0353",
      birthDate: "12/04/2006",
      email: "felipe@gmail.com",
      password: "#RafaelGostosinho12",
      confirmPassword: "#RafaelGostosinho12",
      profilePicture: undefined,
    },
    resolver: zodResolver(schema),
    mode: "onSubmit",
  })

  function handleChangeFile(
    event: ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<z.infer<typeof schema>, "profilePicture">,
  ) {
    const files = event.target.files

    if (files && files.length > 0) {
      const file = files[0]
      const fileExtension = file.name.split(".").pop()?.toLowerCase()
      const validExtensions = ["png", "jpg", "jpeg"]
      if (!fileExtension || !validExtensions.includes(fileExtension)) {
        field.value = undefined
        alert("Invalid file format. Please upload a .png, .jpg or .jpeg file.")
      } else {
        const reader = new FileReader()
        reader.onload = () => {
          field.onChange(reader.result)
        }
        reader.readAsDataURL(file)
      }
    }
  }

  async function onSubmit(data: z.infer<typeof schema>) {
    console.log(data)

    await fetch("https://7a98-170-81-50-186.ngrok-free.app/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    form.reset()
  }

  return (
    <div className="h-screen bg-slate-100 text-black">
      <div className="flex h-full flex-col items-center justify-center gap-8 sm:mx-auto sm:w-full sm:max-w-[800px]">
        <div className="w-full space-y-8 px-20">
          <h1 className="text-start text-3xl font-semibold sm:text-center">
            Create account
          </h1>

          <Button className="flex h-12 w-full gap-4 bg-slate-100 text-base text-black ring-1 ring-gray-300 hover:bg-slate-200 sm:mx-auto sm:w-full sm:max-w-[300px]">
            <img src={GoogleImage} alt="img_google" />
            Sign in with Google
          </Button>
        </div>

        <div className="w-full space-y-4 px-20 sm:max-w-[800px]">
          <div className="flex items-center gap-2">
            <div className="h-px w-full bg-gray-300"></div>
            <div className="whitespace-nowrap text-sm text-gray-500">OR</div>
            <div className="h-px w-full bg-gray-300"></div>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-5 sm:grid sm:grid-cols-2 sm:gap-5"
            >
              <Controller
                control={form.control}
                name="profilePicture"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormControl>
                      <div className="flex h-10 items-center rounded-md px-2 ring-1 ring-gray-300 placeholder:text-sm focus-visible:ring-1 focus-visible:ring-gray-300">
                        <FormLabel>
                          <CircleUser className="size-5 text-gray-600" />
                        </FormLabel>
                        <Input
                          {...field}
                          id="profilePicture"
                          type="file"
                          value={field.value?.length ? field.value[0].name : ""}
                          accept=".png,.jpg,.jpeg"
                          className="border-none shadow-none focus-visible:ring-0"
                          onChange={(event) => handleChangeFile(event, field)}
                        />
                      </div>
                    </FormControl>
                    {form.formState.errors.profilePicture && (
                      <span className="text-sm font-semibold text-red-500">
                        {form.formState.errors.profilePicture.message?.toString()}
                      </span>
                    )}
                  </FormItem>
                )}
              />

              <Controller
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormControl>
                      <div className="flex h-10 items-center rounded-md px-2 ring-1 ring-gray-300 placeholder:text-sm focus-visible:ring-1 focus-visible:ring-gray-300">
                        <FormLabel>
                          <UserPen className="size-5 text-gray-600" />
                        </FormLabel>
                        <Input
                          {...field}
                          id="name"
                          placeholder="Full name"
                          className="border-none shadow-none focus-visible:ring-0"
                        />
                      </div>
                    </FormControl>
                    {form.formState.errors.name && (
                      <span className="text-sm font-semibold text-red-500">
                        {form.formState.errors.name.message}
                      </span>
                    )}
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cpf"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <div className="flex h-10 items-center rounded-md px-2 ring-1 ring-gray-300 placeholder:text-sm focus-visible:ring-1 focus-visible:ring-gray-300">
                      <FormLabel>
                        <IdCard className="size-5 text-gray-600" />
                      </FormLabel>
                      <FormControl>
                        <PatternFormat
                          {...props}
                          {...field}
                          id="cpf"
                          format="###.###.###-##"
                          autoComplete="off"
                          customInput={Input}
                          placeholder="CPF"
                          className="border-none shadow-none focus-visible:ring-0"
                          onValueChange={(values) => {
                            field.onChange(values.value)
                          }}
                        />
                      </FormControl>
                    </div>
                    {form.formState.errors.cpf && (
                      <span className="text-sm font-semibold text-red-500">
                        {form.formState.errors.cpf.message}
                      </span>
                    )}
                  </FormItem>
                )}
              />

              <Controller
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <div className="flex h-10 items-center rounded-md px-2 ring-1 ring-gray-300 placeholder:text-sm focus-visible:ring-1 focus-visible:ring-gray-300">
                      <FormLabel>
                        <Phone className="size-5 text-gray-600" />
                      </FormLabel>
                      <FormControl>
                        <PatternFormat
                          {...props}
                          {...field}
                          id="phone"
                          value={field.value}
                          format="(##) #####-####"
                          customInput={Input}
                          placeholder="Phone"
                          className="border-none shadow-none focus-visible:ring-0"
                          onValueChange={(values) => {
                            field.onChange(values.value)
                          }}
                        />
                      </FormControl>
                    </div>
                    {form.formState.errors.phone && (
                      <span className="text-sm font-semibold text-red-500">
                        {form.formState.errors.phone.message}
                      </span>
                    )}
                  </FormItem>
                )}
              />

              <Controller
                control={form.control}
                name="birthDate"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <div className="flex h-10 items-center rounded-md px-2 ring-1 ring-gray-300 placeholder:text-sm focus-visible:ring-1 focus-visible:ring-gray-300">
                      <FormLabel>
                        <Calendar className="size-5 text-gray-600" />
                      </FormLabel>
                      <FormControl>
                        <PatternFormat
                          {...props}
                          {...field}
                          id="birthDate"
                          value={field.value}
                          format="##/##/####"
                          customInput={Input}
                          placeholder="date of birth"
                          className="border-none shadow-none focus-visible:ring-0"
                          onValueChange={(values) => {
                            field.onChange(values.value)
                          }}
                        />
                      </FormControl>
                    </div>
                    {form.formState.errors.birthDate && (
                      <span className="text-sm font-semibold text-red-500">
                        {form.formState.errors.birthDate.message}
                      </span>
                    )}
                  </FormItem>
                )}
              />

              <Controller
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <div className="flex h-10 items-center rounded-md px-2 ring-1 ring-gray-300 placeholder:text-sm focus-visible:ring-1 focus-visible:ring-gray-300">
                      <FormLabel>
                        <Mail className="size-5 text-gray-600" />
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          id="email"
                          placeholder="example@example.com"
                          className="border-none shadow-none focus-visible:ring-0"
                        />
                      </FormControl>
                    </div>
                    {form.formState.errors.email && (
                      <span>{form.formState.errors.email.message}</span>
                    )}
                  </FormItem>
                )}
              />

              <Controller
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex h-10 items-center rounded-md px-2 ring-1 ring-gray-300 placeholder:text-sm focus-visible:ring-1 focus-visible:ring-gray-300">
                      <FormLabel>
                        <Lock className="size-5 text-gray-600" />
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type={isEyeOpen}
                          placeholder="password"
                          className="border-none shadow-none focus-visible:ring-0"
                          onChange={(event) => {
                            field.onChange(event.target.value)
                            const password = event.target.value
                            const value = validator.isStrongPassword(password, {
                              minLength: 6,
                              minLowercase: 1,
                              minUppercase: 1,
                              minNumbers: 2,
                              minSymbols: 1,
                            })
                            if (value) setProgress(100)
                            else setProgress(20)
                          }}
                        />
                      </FormControl>
                      {isEyeOpen === "password" ? (
                        <Eye
                          className="size-5 cursor-pointer text-gray-600"
                          onMouseDown={() => setIsEyeOpen("text")}
                          onMouseUp={() => setIsEyeOpen("password")}
                          onMouseLeave={() => setIsEyeOpen("password")}
                        />
                      ) : (
                        <EyeOff
                          className="size-5 cursor-pointer text-gray-600"
                          onMouseDown={() => setIsEyeOpen("text")}
                          onMouseUp={() => setIsEyeOpen("password")}
                          onMouseLeave={() => setIsEyeOpen("password")}
                        />
                      )}
                    </div>
                    <Progress value={progress} />
                  </FormItem>
                )}
              />

              <Controller
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex h-10 items-center rounded-md px-2 ring-1 ring-gray-300 placeholder:text-sm focus-visible:ring-1 focus-visible:ring-gray-300">
                      <FormLabel>
                        <Shield className="size-5 text-gray-600" />
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          id="confirmPassword"
                          type={isEyeOpen}
                          placeholder="confirm your password"
                          className="border-none shadow-none focus-visible:ring-0"
                        />
                      </FormControl>
                      {isEyeOpen === "password" ? (
                        <Eye
                          className="size-5 cursor-pointer text-gray-600"
                          onClick={changeTypeInputPassword}
                        />
                      ) : (
                        <EyeOff
                          className="size-5 cursor-pointer text-gray-600"
                          onClick={changeTypeInputPassword}
                        />
                      )}
                    </div>
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="h-12 bg-green-600 text-base hover:bg-green-500 sm:col-span-2 sm:mx-auto sm:w-full sm:max-w-[300px]"
              >
                Sign Up
              </Button>
            </form>
          </Form>
        </div>

        <div className="space-x-2 text-sm sm:text-base">
          <span>Already have an account?</span>
          <a href="/login">
            <span className="cursor-pointer font-semibold text-green-600 hover:underline">
              Sign In
            </span>
          </a>
        </div>
      </div>
    </div>
  )
}
