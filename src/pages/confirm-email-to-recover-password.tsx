import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { loginData } from "@/types/login-schema"
import { postData } from "@/utils/api"
import { zodResolver } from "@hookform/resolvers/zod"
import { Mail } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

export const ConfirmEmailToRecoverPassword = () => {
  const [isErrorInFetch, setIsErrorInFetch] = useState(false)

  const emailSchema = z.object({
    email: z.string().email(),
  })

  const form = useForm<Pick<loginData, "email">>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(emailSchema),
    mode: "onSubmit",
  })

  async function onSubmit(data: Pick<loginData, "email">) {
    try {
      const apiUrl =
        process.env.NEXT_PUBLIC_API_URL +
        "/api/auth/confirm-email-to-recover-password"
      const response = await postData<Pick<loginData, "email">, boolean>(
        apiUrl,
        data,
      )

      if (!response) {
        setIsErrorInFetch(true)
      }

      location.href = "/recover-password"
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
                    <span
                      className={cn(
                        "pl-1 text-sm font-semibold text-red-500",
                        isErrorInFetch ? "block" : "hidden",
                      )}
                    >
                      Esse email não existe
                    </span>
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="h-12 bg-green-600 text-base hover:bg-green-500"
              >
                Confirmar
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}
