import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { registerData, registerSchema } from "@/types/register-schema"
import { postData } from "@/utils/api"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Calendar,
  CircleUser,
  Eye,
  EyeOff,
  IdCard,
  Lock,
  Mail,
  Phone,
  Shield,
  UserPen,
} from "lucide-react"
import { ChangeEvent, useState } from "react"
import { Controller, ControllerRenderProps, useForm } from "react-hook-form"
import { PatternFormat, PatternFormatProps } from "react-number-format"
import validator from "validator"
import GoogleImage from "/google-icon.png"

export const Register = (props: Partial<PatternFormatProps>) => {
  const [isEyeOpen, setIsEyeOpen] = useState("password")
  const [progress, setProgress] = useState(0)

  const form = useForm<registerData>({
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
    resolver: zodResolver(registerSchema),
    mode: "onSubmit",
  })

  function handleChangeFile(
    event: ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<registerData, "profilePicture">,
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

  async function onSubmit(data: registerData) {
    console.log(data)

    try {
      await postData(
        process.env.NEXT_PUBLIC_API_URL + "/api/auth/register",
        data,
      )
      form.reset()
    } catch (error) {
      console.error("Error during registration:", error)
    }
  }

  return (
    <div className="h-screen bg-slate-100 text-black">
      <div className="flex h-full flex-col items-center justify-center gap-8 sm:mx-auto sm:w-full sm:max-w-[800px]">
        <div className="w-full space-y-8 px-20">
          <h1 className="text-start text-3xl font-semibold sm:text-center">
            Criar conta
          </h1>

          <Button className="flex h-12 w-full gap-4 bg-slate-100 text-base text-black ring-1 ring-gray-300 hover:bg-slate-200 sm:mx-auto sm:w-full sm:max-w-[300px]">
            <img src={GoogleImage} alt="img_google" />
            Entre com o google
          </Button>
        </div>

        <div className="w-full space-y-4 px-20 sm:max-w-[800px]">
          <div className="flex items-center gap-2">
            <div className="h-px w-full bg-gray-300"></div>
            <div className="whitespace-nowrap text-sm text-gray-500">OU</div>
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
                          placeholder="Nome completo"
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
                          placeholder="telefone"
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
                          placeholder="data de nascimento"
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
                          placeholder="exemplo@exemplo.com"
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
                          placeholder="senha"
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
                          placeholder="confirme sua senha"
                          className="border-none shadow-none focus-visible:ring-0"
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
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="h-12 bg-green-600 text-base hover:bg-green-500 sm:col-span-2 sm:mx-auto sm:w-full sm:max-w-[300px]"
              >
                Cadastrar-se
              </Button>
            </form>
          </Form>
        </div>

        <div className="space-x-2 text-sm sm:text-base">
          <span>Já possui uma conta?</span>
          <a href="/login">
            <span className="cursor-pointer font-semibold text-green-600 hover:underline">
              Entre
            </span>
          </a>
        </div>
      </div>
    </div>
  )
}
