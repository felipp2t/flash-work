import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signIn } from "@/http/auth/sign-in";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import { InputPassword } from "./input-password";
import GoogleIcon from "/google-icon.png";

const formSchema = z.object({
  email: z
    .string({ required_error: "O e-mail é obrigatório" })
    .email({ message: "O e-mail está inválido" }),
  password: z.string({ required_error: "A senha é obrigatória" }),
});

export type FormSchema = z.infer<typeof formSchema>;

export const SignInForm = () => {
  const navigate = useNavigate();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormSchema) => {
    try {
      const { token } = await signIn(data);
      localStorage.setItem("token", token);
      navigate("/services");
    } catch {
      toast.error("Erro ao fazer login", {
        duration: 5000,
        description: "Verifique suas credenciais e tente novamente",
      });
    }
  };

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="email">Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  id="email"
                  placeholder="Adicione seu e-mail"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between">
                <FormLabel htmlFor="password">Senha</FormLabel>
                <Link
                  to="/password-reset/email"
                  className="text-sm text-muted-foreground hover:underline"
                >
                  Esqueceu a senha?
                </Link>
              </div>
              <FormControl>
                <InputPassword field={field} placeholder="Adicione sua senha" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-4">
          <Button
            className="flex w-full items-center"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <>
                <Loader2 className="animate-spin" />
                <p>Entrando...</p>
              </>
            ) : (
              "Entrar"
            )}
          </Button>
          <Button
            className="flex w-full gap-2"
            variant="outline"
            onClick={() =>
              toast.error("Erro ao fazer login", {
                duration: 5000,
                description: "Verifique suas credenciais e tente novamente",
              })
            }
            asChild
          >
            <Link to={`$http://localhost:80/api/oauth2/authorization/google`}>
              <img src={GoogleIcon} alt="google icon" className="size-5" />
              Entrar com o Google
            </Link>
          </Button>
        </div>
      </form>
    </Form>
  );
};
