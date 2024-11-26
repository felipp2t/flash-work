import { PageTitle } from "@/components/page-title";
import { MaskInput } from "@/components/phone-input";
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
import { updateUser } from "@/http/user/update-user";
import { useProfileFormStore } from "@/stores/use-profile-form-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  phone: z.string({ required_error: "O telefone é obrigatório" }),
  cpf: z.string({ required_error: "O CPF é obrigatório" }),
  email: z.string({ required_error: "O e-mail é obrigatório" }),
});

type FormSchema = z.infer<typeof formSchema>;

export const ContactDetailsPage = () => {
  const navigate = useNavigate();
  const { formData } = useProfileFormStore();
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: formData.phone || "",
      cpf: formData.cpf || "",
      email: formData.email || "",
    },
  });

  const queryClient = useQueryClient();

  const { mutateAsync: updateUserMutate } = useMutation({
    mutationKey: ["update-user"],
    mutationFn: async (data: FormSchema) =>
      updateUser({
        phone: data.phone,
        description: formData.description,
        name: formData.name,
        profilePicture: formData.profilePicture,
      }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["get-user-by-token"] }),
  });

  const onSubmit = async (data: FormSchema) => {
    try {
      await updateUserMutate(data);
      toast.success("Informações pessoais atualizadas com sucesso");
    } catch {
      toast.error("Erro ao atualizar informações pessoais");
    }
  };

  return (
    <div className="mx-auto flex h-full max-w-2xl flex-col gap-16 p-4">
      <div className="flex gap-2">
        <PageTitle title="Editar Informações Pessoais" />
      </div>

      <div className="flex flex-col gap-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mx-auto flex w-full max-w-sm flex-col gap-6"
          >
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="phone">Telefone</FormLabel>
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input {...field} disabled />
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
                  <FormLabel>CPF</FormLabel>
                  <FormControl>
                    <Input {...field} disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center gap-4 self-end">
              <Button
                type="button"
                variant="secondary"
                className="w-24"
                onClick={() => navigate(-1)}
              >
                Voltar
              </Button>
              <Button
                type="submit"
                className="w-40"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin" />
                    Salvando
                  </>
                ) : (
                  "Salvar"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
