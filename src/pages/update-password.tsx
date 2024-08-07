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
import { registerData } from "@/types/register-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeOff, Lock, Shield } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import validator from "validator"
import { z } from "zod"

export const UpdatePassword = () => {
  const [isEyeOpen, setIsEyeOpen] = useState("password")
  const [progress, setProgress] = useState(0)

  const passwordSchema = z.object({
    email: z.string(),
  })

  const form = useForm<Pick<registerData, "password" | "confirmPassword">>({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    mode: "onSubmit",
    resolver: zodResolver(passwordSchema),
  })
  

  async function onSubmit(
    data: Pick<registerData, "password" | "confirmPassword">,
  ) {}

  return (
    <div className="h-screen bg-slate-100 text-black">
      <div className="flex h-full flex-col items-center justify-center gap-8">
        <div className="space-y-2">
          <h1 className="text-center text-3xl font-semibold">
            Atualize sua senha
          </h1>
          <span className="block text-center text-gray-500">
            Insira sua nova senha para continuar
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

              <FormField
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
                    </div>
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="h-12 bg-green-600 text-base hover:bg-green-500"
              >
                Atualizar
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}
