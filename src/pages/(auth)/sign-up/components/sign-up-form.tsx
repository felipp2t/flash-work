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
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { signUp } from "@/http/auth/sign-up";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import { CalendarInput } from "./calendar-input";
import { ConfirmInputPassword } from "./confirm-password-input";
import { InputPassword } from "./password-input";
import { MaskInput } from "../../../../components/phone-input";

const formSchema = z
  .object({
    name: z
      .string({ required_error: "O nome é obrigatório" })
      .min(3, { message: "O nome deve ter no mínimo 3 caracteres" })
      .max(60, { message: "O nome deve ter no máximo 60 caracteres" }),
    email: z
      .string({ required_error: "O e-mail é obrigatório" })
      .email({ message: "E-mail inválido" }),
    phone: z.string().length(15, { message: "Telefone inválido" }),
    dateBirth: z.coerce.date(),
    cpf: z
      .string({ required_error: "O cpf é obrigatório" })
      .length(14, { message: "CPF inválido" }),
    password: z
      .string({ required_error: "A senha é obrigatória" })
      .min(6, { message: "A senha deve ter no mínimo 6 caracteres" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword", "password"],
    message: "As senhas não coincidem",
  });

export type FormSchema = z.infer<typeof formSchema>;

export const SignUpForm = () => {
  const navigate = useNavigate();
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      dateBirth: new Date(),
      password: "",
      confirmPassword: "",
    },
  });

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setProfilePhoto(e.target.files[0]);
  };

  const onSubmit = async (data: FormSchema) => {
    try {
      await signUp({
        ...data,
        dateBirth: format(new Date(data.dateBirth), "yyyy-MM-dd"),
        profilePhoto,
      });

      toast.success("Cadastro realizado com sucesso", {
        duration: 5000,
        description: "Agora você já pode fazer login",
      });

      navigate("/sign-in");

      navigate("/sign-in");
    } catch {
      toast.error("Erro ao fazer login", {
        duration: 5000,
        description: "Verifique suas credenciais e tente novamente",
      });
    }
  };

  return (
    <ScrollArea>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mx-auto flex w-full max-w-[700px] flex-col items-center gap-6"
        >
          <div className="flex flex-col gap-6 p-1 sm:grid sm:grid-cols-2">
            <div className="mt-2.5 flex flex-col gap-2">
              <Label htmlFor="photo" className="flex-shrink-0">
                Foto de Perfil
              </Label>
              <Input
                id="photo"
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="w-full"
              />
            </div>

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="name">
                    Nome <span className="text-red-800">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="name"
                      placeholder="Adicione seu nome"
                      className="text-sm placeholder:text-sm"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="email">
                    E-mail <span className="text-red-800">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="email"
                      placeholder="Adicione seu e-mail"
                      className="text-sm placeholder:text-sm"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="phone">
                    Telefone <span className="text-red-800">*</span>
                  </FormLabel>
                  <FormControl>
                    <MaskInput
                      {...field}
                      id="phone"
                      format="(##) #####-####"
                      placeholder="(99) 99999-9999"
                      className="text-sm placeholder:text-sm"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cpf"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="cpf">
                    CPF <span className="text-red-800">*</span>
                  </FormLabel>
                  <FormControl>
                    <MaskInput
                      {...field}
                      id="cpf"
                      format="###.###.###-##"
                      placeholder="999.999.999-99"
                      className="text-sm placeholder:text-sm"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dateBirth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="dateBirth">
                    Data de Aniversário <span className="text-red-800">*</span>
                  </FormLabel>
                  <FormControl>
                    <CalendarInput field={field} />
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
                  <FormLabel htmlFor="password">
                    Senha <span className="text-red-800">*</span>
                  </FormLabel>
                  <FormControl>
                    <InputPassword
                      field={field}
                      id="password"
                      placeholder="Adicione sua senha"
                      className="text-sm placeholder:text-sm"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="confirmPassword">
                    Confirmar Senha <span className="text-red-800">*</span>
                  </FormLabel>
                  <FormControl>
                    <ConfirmInputPassword
                      field={field}
                      id="confirmPassword"
                      placeholder="Confirme sua senha"
                      className="text-sm placeholder:text-sm"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button className="w-full max-w-xs">
            {form.formState.isSubmitting ? (
              <>
                <Loader2 className="animate-spin" />
                Cadastrando...
              </>
            ) : (
              "Cadastrar"
            )}
          </Button>
        </form>
      </Form>
    </ScrollArea>
  );
};
