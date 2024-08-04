import GoogleImage from "/google-icon.png"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export const Login = () => {
  const [isEyeOpen, setIsEyeOpen] = useState("password")

  function changeTypeInputPassword() {
    setIsEyeOpen((isEyeOpen) =>
      isEyeOpen === "password" ? "text" : "password",
    )
  }

  const form = useForm<z.infer<typeof schema>>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(schema),
  })

  function onSubmit(data: z.infer<typeof schema>) {
    console.log(data)
  }

  return (
    <div className="h-screen bg-slate-100 text-black">
      <div className="flex h-full flex-col items-center justify-center gap-8">
        <div className="space-y-2">
          <h1 className="text-center text-3xl font-medium">Welcome back</h1>
          <span className="block text-gray-500">
            Welcome back! Please enter your details
          </span>
        </div>

        <div className="w-full space-y-4 px-20">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-5"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        {...form.register("email")}
                        placeholder="example@example.com"
                        className="h-10 ring-1 ring-gray-300 placeholder:text-sm focus-visible:ring-1 focus-visible:ring-gray-300"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="flex h-10 items-center rounded-md border-2 border-gray-300 pr-4">
                        <Input
                          id="password"
                          {...field}
                          {...form.register("password")}
                          type={isEyeOpen}
                          className="border-none shadow-none placeholder:text-sm focus-visible:ring-0"
                        />
                        {isEyeOpen === "password" ? (
                          <Eye
                            className="cursor-pointer"
                            onClick={changeTypeInputPassword}
                          />
                        ) : (
                          <EyeOff
                            className="cursor-pointer"
                            onClick={changeTypeInputPassword}
                          />
                        )}
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="cursor-pointer text-end font-semibold text-green-600 hover:underline">
                <a href="#">Forgot password</a>
              </div>

              <Button className="h-12 bg-green-600 text-base hover:bg-green-500">
                Sign in
              </Button>
            </form>
          </Form>

          <div className="flex items-center gap-2">
            <div className="h-px w-full bg-gray-500"></div>
            <div className="whitespace-nowrap">or also</div>
            <div className="h-px w-full bg-gray-500"></div>
          </div>

          <Button className="flex h-12 w-full gap-4 bg-slate-100 text-base text-black ring-1 ring-gray-300 hover:bg-slate-200">
            <img src={GoogleImage} alt="img_google" />
            Sign in with Google
          </Button>
        </div>

        <div className="space-x-2 text-sm">
          <span>Don't have an account?</span>
          <a href="#">
            <span className="cursor-pointer font-semibold text-green-600 hover:underline">
              Sign Up
            </span>
          </a>
        </div>
      </div>
    </div>
  )
}
