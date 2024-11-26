import { PageTitle } from "@/components/page-title";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { Textarea } from "@/components/ui/textarea";
import { updateUser } from "@/http/user/update-user";
import { useProfileFormStore } from "@/stores/use-profile-form-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  name: z
    .string({ required_error: "O nome é obrigatório" })
    .min(3, { message: "O nome deve ter no mínimo 3 caracteres" }),
  description: z.string({ required_error: "A descrição é obrigatória" }),
  photo: z
    .instanceof(FileList)
    .refine((files) => files.length > 0, "Image is required.")
    .transform((files) => files[0])
    .refine(
      (file) => file.size <= 5000000,
      "File size should be less than 5MB.",
    )
    .refine(
      (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
      "Only .jpg, .png, and .webp formats are supported.",
    )
    .nullish(),
});

type FormSchema = z.infer<typeof formSchema>;

export const PersonalInformationPage = () => {
  const navigate = useNavigate();
  const [preview, setPreview] = useState<string | null>(null);
  const { formData } = useProfileFormStore();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: formData.name || "",
      description: formData.description || "",
    },
  });

  const queryClient = useQueryClient();

  const { mutateAsync: updateUserMutate } = useMutation({
    mutationKey: ["update-user"],
    mutationFn: async (data: FormSchema) =>
      updateUser({
        name: data.name,
        description: data.description,
        profilePicture: data.photo ?? null,
        phone: formData.phone,
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
            className="flex flex-col gap-6"
          >
            <FormField
              control={form.control}
              name="photo"
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              render={({ field: { onChange, value, ...rest } }) => (
                <FormItem>
                  <FormLabel>Profile Photo</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-4">
                      <Avatar className="size-24">
                        <AvatarImage
                          src={preview || "/placeholder.svg"}
                          alt="Preview"
                        />
                        <AvatarFallback>
                          {form.getValues().name[0]}
                        </AvatarFallback>
                      </Avatar>
                      <Input
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        onChange={(event) => {
                          const file = event.target.files?.[0];
                          if (file) {
                            onChange(event.target.files);
                            setPreview(URL.createObjectURL(file));
                          }
                        }}
                        {...rest}
                      />
                    </div>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="name">Nome</FormLabel>
                  <FormControl>
                    <Input {...field} id="name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="description">Descrição</FormLabel>
                  <FormControl>
                    <Textarea {...field} id="description" />
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
