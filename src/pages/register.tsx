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
import { ControllerRenderProps, useForm } from "react-hook-form"
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
  UserRound,
  CircleUser,
} from "lucide-react"
import { ChangeEvent } from "react"

const schema = z
  .object({
    name: z.string(),
    cpf: z.string().length(14),
    dateOfBirth: z.string().length(10),
    phone: z.string().length(15),
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
    profilePicture: z.instanceof(FileList).optional(),
  })
  .refine((fields) => fields.password === fields.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  })

export const Register = (props: Partial<PatternFormatProps>) => {
  const form = useForm<z.infer<typeof schema>>({
    defaultValues: {
      name: "Felipe Rossetto",
      cpf: "125.176.129-19",
      phone: "(48) 99901-0353",
      dateOfBirth: "12/04/2006",
      email: "felipe@gmail.com",
      password: "123456",
      confirmPassword: "123456",
      profilePicture: undefined,
    },
    resolver: zodResolver(schema),
  })

  function onSubmit(data: z.infer<typeof schema>) {
    console.log(data)
  }

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
        field.onChange(event)
      }
    }
    console.log(field)
  }

  return (
    <div className="h-screen bg-slate-100 text-black">
      <div className="mt-10 flex h-full flex-col items-center justify-center gap-8">
        <div className="w-full space-y-8 px-20">
          <h1 className="text-start text-3xl font-semibold">Create account</h1>

          <Button className="flex h-12 w-full gap-4 bg-slate-100 text-base text-black ring-1 ring-gray-300 hover:bg-slate-200">
            <img src={GoogleImage} alt="img_google" />
            Sign in with Google
          </Button>
        </div>

        <div className="w-full space-y-4 px-20 sm:max-w-[500px]">
          <div className="flex items-center gap-2">
            <div className="h-px w-full bg-gray-300"></div>
            <div className="whitespace-nowrap text-sm text-gray-500">OR</div>
            <div className="h-px w-full bg-gray-300"></div>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-5"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormControl>
                      <div className="flex h-10 items-center rounded-md px-2 ring-1 ring-gray-300 placeholder:text-sm focus-visible:ring-1 focus-visible:ring-gray-300">
                        <FormLabel>
                          <UserRound className="size-5 text-gray-600" />
                        </FormLabel>
                        <Input
                          {...field}
                          {...form.register("name")}
                          id="name"
                          placeholder="Full name"
                          className="-none shadow-none focus-visible:ring-0"
                        />
                      </div>
                    </FormControl>
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
                          {...form.register("cpf")}
                          id="cpf"
                          format="###.###.###-##"
                          autoComplete="off"
                          customInput={Input}
                          placeholder="CPF"
                          className="border-none shadow-none focus-visible:ring-0"
                        />
                      </FormControl>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
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
                          {...form.register("phone")}
                          id="cpf"
                          format="(##) #####-####"
                          autoComplete="off"
                          customInput={Input}
                          placeholder="Phone"
                          className="border-none shadow-none focus-visible:ring-0"
                        />
                      </FormControl>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dateOfBirth"
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
                          {...form.register("dateOfBirth")}
                          id="cpf"
                          format="##/##/####"
                          autoComplete="off"
                          customInput={Input}
                          placeholder="date of birth"
                          className="border-none shadow-none focus-visible:ring-0"
                        />
                      </FormControl>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
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
                          {...form.register("email")}
                          id="email"
                          placeholder="example@example.com"
                          className="border-none shadow-none focus-visible:ring-0"
                        />
                      </FormControl>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <div className="flex h-10 items-center rounded-md px-2 ring-1 ring-gray-300 placeholder:text-sm focus-visible:ring-1 focus-visible:ring-gray-300">
                      <FormLabel>
                        <Lock className="size-5 text-gray-600" />
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          {...form.register("password")}
                          id="password"
                          placeholder="password"
                          className="border-none shadow-none focus-visible:ring-0"
                        />
                      </FormControl>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <div className="flex h-10 items-center rounded-md px-2 ring-1 ring-gray-300 placeholder:text-sm focus-visible:ring-1 focus-visible:ring-gray-300">
                      <FormLabel>
                        <Shield className="size-5 text-gray-600" />
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          {...form.register("confirmPassword")}
                          id="confirmPassword"
                          placeholder="confirm your password"
                          className="border-none shadow-none focus-visible:ring-0"
                        />
                      </FormControl>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
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
                          {...form.register("profilePicture")}
                          id="profilePicture"
                          type="file"
                          value={field.value?.length ? field.value[0].name : ""}
                          accept=".png,.jpg,.jpeg"
                          className="border-none shadow-none focus-visible:ring-0"
                          onChange={(event) => handleChangeFile(event, field)}
                        />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="h-12 bg-green-600 text-base hover:bg-green-500"
              >
                Sign Up
              </Button>
            </form>
          </Form>
        </div>

        <div className="space-x-2 text-sm">
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
