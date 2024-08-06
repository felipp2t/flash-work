import GoogleImage from "/google-icon.png"
import { useForm } from "react-hook-form"
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
import { Eye, EyeOff, Lock, Mail } from "lucide-react"
import { loginData, loginSchema } from "@/types/login-schema"
import { postData } from "@/utils/api"

export const Login = () => {
  const [isEyeOpen, setIsEyeOpen] = useState("password")

  function changeTypeInputPassword() {
    setIsEyeOpen((isEyeOpen) =>
      isEyeOpen === "password" ? "text" : "password",
    )
  }

  const form = useForm<loginData>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  })

  interface LoginResponse {
    token: string
  }

  async function onSubmit(data: loginData) {
    console.log(data)

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL + "/api/auth/login";
      const response = await postData<loginData, LoginResponse>(apiUrl, data);
      console.log('Token:', response.token);
      form.reset()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="h-screen bg-slate-100 text-black">
      <div className="flex h-full flex-col items-center justify-center gap-8">
        <div className="space-y-2">
          <h1 className="text-center text-3xl font-semibold">Welcome back</h1>
          <span className="block text-gray-500">
            Welcome back! Please enter your details
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
                          placeholder="password"
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
                <a href="#">Forgot password</a>
              </div>

              <Button
                type="submit"
                className="h-12 bg-green-600 text-base hover:bg-green-500"
              >
                Sign in
              </Button>
            </form>
          </Form>

          <div className="flex items-center gap-2">
            <div className="h-px w-full bg-gray-300"></div>
            <div className="whitespace-nowrap text-sm text-gray-500">OR</div>
            <div className="h-px w-full bg-gray-300"></div>
          </div>

          <Button className="flex h-12 w-full gap-4 bg-slate-100 text-base text-black ring-1 ring-gray-300 hover:bg-slate-200">
            <img src={GoogleImage} alt="img_google" />
            Sign in with Google
          </Button>
        </div>

        <div className="space-x-2 text-sm">
          <span>Don't have an account?</span>
          <a href="/register">
            <span className="cursor-pointer font-semibold text-green-600 hover:underline">
              Sign Up
            </span>
          </a>
        </div>
      </div>
    </div>
  )
}
