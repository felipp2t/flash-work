import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { updatePassword } from "@/http/auth/password-reset/new-password";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import { PasswordConfirmationInput } from "./password-confirmation-input";
import { PasswordInput } from "./password-input";

const formSchema = z
  .object({
    password: z
      .string({ required_error: "Senha é obrigatória" })
      .min(6, { message: "Senha deve ter no mínimo 6 caracteres" })
      .max(60, { message: "Senha deve ter no máximo 60 caracteres" })
      .trim(),
    passwordConfirmation: z
      .string({ required_error: "Senha é obrigatória" })
      .min(6, { message: "Senha deve ter no mínimo 6 caracteres" })
      .max(60, { message: "Senha deve ter no máximo 60 caracteres" })
      .trim(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    path: ["passwordConfirmation"],
    message: "As senhas devem ser iguais",
  });

export type FormSchema = z.infer<typeof formSchema>;

interface FormNewPasswordProps {
  email: string;
}

export const FormNewPassword = ({ email }: FormNewPasswordProps) => {
  const navigate = useNavigate();
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormSchema) => {
    try {
      await updatePassword({
        ...data,
        email,
      });

      toast.success("Senha alterada com sucesso", {
        duration: 5000,
      });
      navigate("/sign-in");
    } catch {
      toast.error("Erro ao alterar senha", {
        duration: 5000,
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-sm space-y-6"
      >
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="password">Nova Senha</FormLabel>
              <FormControl>
                <PasswordInput
                  field={field}
                  id="password"
                  placeholder="Insira sua nova senha"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="passwordConfirmation"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="passwordConfirmation">
                Confirmação de Senha
              </FormLabel>
              <FormControl>
                <PasswordConfirmationInput
                  field={field}
                  id="passwordConfirmation"
                  placeholder="Confirme sua nova senha"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="w-full font-semibold"
        >
          {form.formState.isSubmitting ? (
            <>
              <Loader2 className="animate-spin" />
              Alterando...
            </>
          ) : (
            "Alterar Senha"
          )}
        </Button>
      </form>
    </Form>
  );
};
