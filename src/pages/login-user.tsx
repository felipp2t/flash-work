import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { loginData, loginSchema } from "@/types/login-schema"
import { postData } from "@/utils/api"
import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeOff, Lock, Mail } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import GoogleImage from "/google-icon.png"

interface LoginResponse {
  token: string
}

export const Login = () => {
  const [isEyeOpen, setIsEyeOpen] = useState("password")

  const form = useForm<loginData>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  })

  function changeTypeInputPassword() {
    setIsEyeOpen((isEyeOpen) =>
      isEyeOpen === "password" ? "text" : "password",
    )
  }

  async function onSubmit(data: loginData) {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL + "/api/auth/login"
      await postData<loginData, LoginResponse>(apiUrl, data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="h-screen bg-slate-100 text-black">
      <div className="flex h-full flex-col items-center justify-center gap-8">
        <div className="space-y-2">
          <h1 className="text-center text-3xl font-semibold">
            Bem vindo de Volta
          </h1>
          <span className="block text-center text-gray-500">
            Bem vindo de Volta! Por favor, insira suas credenciais <br /> para
            acessar sua conta.
          </span>
        </div>

        <div className="w-full space-y-4 px-20 sm:max-w-[500px]">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-5"
            >
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
                          placeholder="exemplo@exemplo.com"
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
                  <FormItem>
                    <div className="flex h-10 items-center rounded-md px-2 ring-1 ring-gray-300 placeholder:text-sm focus-visible:ring-1 focus-visible:ring-gray-300">
                      <FormLabel>
                        <Lock className="size-5 text-gray-600" />
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          {...form.register("password")}
                          type={isEyeOpen}
                          placeholder="senha"
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

              <div className="cursor-pointer text-end font-semibold text-green-600 hover:underline">
                <a href="/recovery-password/confirm-email">Esqueceu a senha?</a>
              </div>

              <Button
                type="submit"
                className="h-12 bg-green-600 text-base hover:bg-green-500"
              >
                Entrar
              </Button>
            </form>
          </Form>

          <div className="flex items-center gap-2">
            <div className="h-px w-full bg-gray-300"></div>
            <div className="whitespace-nowrap text-sm text-gray-500">OU</div>
            <div className="h-px w-full bg-gray-300"></div>
          </div>

          <a
            href="https://365d-179-125-116-3.ngrok-free.app/oauth2/authorization/google"
            className="block"
          >
            <Button className="flex h-12 w-full gap-4 bg-slate-100 text-base text-black ring-1 ring-gray-300 hover:bg-slate-200">
              <img src={GoogleImage} alt="img_google" />
              Entre com o google
            </Button>
          </a>
        </div>

        <div className="space-x-2 text-sm">
          <span>Não possui uma conta?</span>
          <a href="/register">
            <span className="cursor-pointer font-semibold text-green-600 hover:underline">
              Cadastre-se
            </span>
          </a>
        </div>
      </div>
    </div>
  )
}
