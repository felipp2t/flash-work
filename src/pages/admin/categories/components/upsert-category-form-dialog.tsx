import { Category } from "@/@types/categories/category";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createCategory } from "@/http/categories/create-category";
import { updateCategory } from "@/http/categories/update-category";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  name: z.string({ required_error: "O nome é obrigatório" }),
  icon: z.string({ required_error: "O ícone é obrigatório" }),
  description: z.string({ required_error: "A descrição é obrigatória" }),
});

type FormSchema = z.infer<typeof formSchema>;

interface UpsertCategoryFormDialogProps {
  defaultValues?: FormSchema;
  setIsOpen: (isOpen: boolean) => void;
  isOpen: boolean;
  categoryId?: string;
}

export const UpsertCategoryFormDialog = ({
  defaultValues,
  isOpen,
  setIsOpen,
  categoryId,
}: UpsertCategoryFormDialogProps) => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues ?? {
      name: "",
      icon: "",
      description: "",
    },
  });

  const isUpdate = Boolean(categoryId);

  const { mutateAsync: updateMutateAsync } = useMutation({
    mutationKey: ["edit-category", categoryId],
    mutationFn: async ({ category }: { category: Category }) =>
      updateCategory({ category }),
  });

  const { mutateAsync: createMutateAsync } = useMutation({
    mutationKey: ["create-category"],
    mutationFn: async ({ category }: { category: Category }) =>
      createCategory({ category }),
  });

  const onSubmit = async (data: FormSchema) => {
    try {
      if (categoryId) {
        await updateMutateAsync({
          category: {
            id: categoryId,
            name: data.name,
            description: data.description,
            iconName: data.icon,
          },
        });

        toast.success("Categoria atualizada com sucesso", {
          duration: 5000,
        });
      }

      if (!categoryId) {
        await createMutateAsync({
          category: {
            id: "",
            name: data.name,
            description: data.description,
            iconName: data.icon,
          },
        });

        toast.success("Categoria Criada com sucesso", {
          duration: 5000,
        });
      }
    } catch {
      toast.error("Ocorreu um erro ao criar a categoria", {
        duration: 5000,
      });
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) form.reset();
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isUpdate ? "Atualizar" : "Adicionar"}</DialogTitle>
          <DialogDescription>
            Crie uma nova categoria para os serviços do usuário. Clique "Criar"
            quando estiver pronto.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            className="flex flex-col gap-4 py-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="items-center gap-4">
                  <FormLabel htmlFor="name" className="text-right">
                    Nome
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="name"
                      placeholder="Digite o nome da nova categoria"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="icon"
              render={({ field }) => (
                <FormItem className="items-center gap-4">
                  <FormLabel htmlFor="icon" className="text-right">
                    Icone
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="icon"
                      placeholder="Digite o nome do ícone"
                    />
                  </FormControl>
                  <FormMessage />
                  <FormDescription>
                    Digite um ícone do lucide-react no formato PascalCase
                    (AppleIcon)
                  </FormDescription>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="description">Descrição</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      id="desription"
                      placeholder="Fale um pouco sobre essa categoria"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit">
                {isUpdate ? "Atualizar" : "Adicionar"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
