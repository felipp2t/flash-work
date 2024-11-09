import { Button } from "@/_components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/_components/ui/form";
import { Input } from "@/_components/ui/input";
import { signIn } from "@/_http/auth/sign-in/sign-in";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import GoogleIcon from "/google-icon.png";
import { InputPassword } from "./input-password";

const formSchema = z.object({
  email: z
    .string({ required_error: "O e-mail é obrigatório" })
    .email({ message: "O e-mail está inválido" }),
  password: z.string({ required_error: "A senha é obrigatória" }),
});

export type FormSchema = z.infer<typeof formSchema>;

export const SignInForm = () => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormSchema) => {
    try {
      await signIn(data);
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
              <FormLabel htmlFor="password">Senha</FormLabel>
              <FormControl>
                <InputPassword field={field} placeholder="Adicione sua senha" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-2">
          <Button
            className="flex w-full items-center"
            disabled={form.formState.isSubmitting || form.formState.isSubmitted}
          >
            {form.formState.isSubmitting || form.formState.isSubmitted ? (
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
          >
            <img src={GoogleIcon} alt="google icon" className="size-5" />
            Entrar com o Google
          </Button>
        </div>
      </form>
    </Form>
  );
};
