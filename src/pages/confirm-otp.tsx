import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
} from "@/components/ui/form"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { pinData, pinSchema } from "@/types/pin-schema"
import { postData } from "@/utils/api"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

export const ConfirmOTP = () => {
  const form = useForm<pinData>({
    defaultValues: {
      pin: "",
    },
    resolver: zodResolver(pinSchema),
  })

  async function onSubmit(data: pinData) {
    try {
      const response = await postData("/api/auth/confirm-otp", data)

      response ? (location.href = "/") : console.log("Error")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="h-screen bg-slate-100 text-black">
      <div className="flex h-full flex-col items-center justify-center gap-4">
        <div className="space-y-2">
          <h1 className="text-center text-3xl font-semibold">
            Confirme seu OTP
          </h1>
          <span className="block text-center text-gray-500">
            Enviamos um código de uso único para o seu e-mail
          </span>
        </div>

        <div className="w-full space-y-4 px-20 sm:max-w-[500px]">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col items-center gap-5"
            >
              <FormField
                control={form.control}
                name="pin"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-center justify-center gap-1">
                    <FormControl>
                      <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup>
                          <InputOTPSlot
                            className="border-neutral-400"
                            index={0}
                          />
                          <InputOTPSlot
                            className="border-neutral-400"
                            index={1}
                          />
                          <InputOTPSlot
                            className="border-neutral-400"
                            index={2}
                          />
                          <InputOTPSlot
                            className="border-neutral-400"
                            index={3}
                          />
                          <InputOTPSlot
                            className="border-neutral-400"
                            index={4}
                          />
                          <InputOTPSlot
                            className="border-neutral-400"
                            index={5}
                          />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormDescription className="text-center">
                      Por favor, digite a senha de uso único enviada no <br />{" "}
                      seu e-mail.
                    </FormDescription>
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="h-12 w-1/2 bg-green-600 text-base hover:bg-green-500"
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
