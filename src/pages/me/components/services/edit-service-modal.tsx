import { Service } from "@/@types/service/service";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { getAddressById } from "@/http/addresses/get-address-by-id";
import { editService } from "@/http/services/edit-service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { MoneyInput } from "../../../../components/money-input";
import { ChangeCategoryModal } from "./change-category-modal";
import { ChangeLocationModal } from "./change-location-modal";

const formSchema = z.object({
  id: z.string(),
  title: z
    .string()
    .min(15, { message: "O título deve conter com no mínimo 12 caractéres" }),
  budget: z.object({
    min: z
      .number({ required_error: "O valor mínimo é obrigatório" })
      .min(20, { message: "O valor mínimo deve ser maior que R$ 20,00" })
      .positive({ message: "O valor mínimo deve ser maior que zero" })
      .max(10000, { message: "O valor máximo é de R$ 10.000,00" }),
    max: z
      .number({ required_error: "O valor máximo é obrigatório" })
      .max(10000),
  }),
  description: z.string().min(50, {
    message: "A descrição deve conter com no mínimo 50 caractéres",
  }),
  address: z.object({
    id: z.string(),
    city: z.string(),
    state: z.string(),
  }),
  workType: z.enum(["REMOTE", "ONSITE"]),
  categories: z
    .object({
      id: z.string(),
      name: z.string(),
      description: z.string(),
      iconName: z.string(),
    })
    .array()
    .min(1, "É necessário selecionar pelo menos uma categoria."),
});

export type FormSchema = z.infer<typeof formSchema>;

interface EditServiceModalProps {
  service: Service;
}

export const EditServiceModal = ({ service }: EditServiceModalProps) => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  const { data } = useQuery({
    queryKey: ["get-address-by-id", service.addressId],
    queryFn: async () => await getAddressById({ addressId: service.addressId }),
  });

  const handleSplitBudget = (budget: string) => {
    const [min, max] = budget.split("-");
    return {
      min: Number(min),
      max: Number(max),
    };
  };

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: service.id,
      title: service.title,
      budget: {
        min: handleSplitBudget(service.budget).min,
        max: handleSplitBudget(service.budget).max,
      },
      description: service.description,
      address: data && {
        id: data.address.id,
        city: data.address.city,
        state: data.address.state,
      },
      workType: service.workType,
      categories: service.categories.map((category) => ({
        id: category.id,
        name: category.name,
        description: category.description,
        iconName: category.iconName,
      })),
    },
  });

  useEffect(() => {
    if (!dialogIsOpen) form.reset();
  }, [dialogIsOpen, form]);

  useEffect(() => {
    if (data) {
      form.setValue("address", {
        id: data.address.id,
        city: data.address.city,
        state: data.address.state,
      });
    }
  }, [data, form]);

  const queryClient = useQueryClient();

  const { mutateAsync: editServiceMutate } = useMutation({
    mutationKey: ["edit-service", service.id],
    mutationFn: async (serviceForm: FormSchema) =>
      editService({
        service: {
          ...serviceForm,
          location: serviceForm.address,
          deadline: service.deadline,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-services-by-user"] });
    },
  });

  const onSubmit = async (data: FormSchema) => {
    try {
      await editServiceMutate(data);
      toast.success("Serviço editado com sucesso");
    } catch {
      toast.error("Ocorreu um erro ao editar o serviço");
    }
  };

  return (
    <Dialog open={dialogIsOpen} onOpenChange={(open) => setDialogIsOpen(open)}>
      <DialogTrigger asChild>
        <Button className="w-1/2" variant="outline">
          Editar
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Edite seu serviço aqui</DialogTitle>
          <DialogDescription>
            Preencha o formulário abaixo para editar seu serviço
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-8 gap-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="col-span-4">
                    <FormLabel htmlFor="title">Título</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        id="title"
                        placeholder="Título do serviço"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="budget.min"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel htmlFor="budget.min">Preço Mínimo</FormLabel>
                    <FormControl>
                      <MoneyInput
                        id="budget.min"
                        placeholder="Preço mínimo"
                        value={field.value}
                        onValueChange={({ floatValue }) =>
                          field.onChange(floatValue)
                        }
                        onBlur={field.onBlur}
                        disabled={field.disabled}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="budget.max"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel htmlFor="budget.max">Preço Máximo</FormLabel>
                    <FormControl>
                      <MoneyInput
                        id="budget.max"
                        placeholder="Preço máximo"
                        value={field.value}
                        onValueChange={({ floatValue }) =>
                          field.onChange(floatValue)
                        }
                        onBlur={field.onBlur}
                        disabled={field.disabled}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="col-span-full">
                    <FormLabel htmlFor="description">Título</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        id="description"
                        placeholder="Descrição do serviço..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem className="col-span-4">
                    <FormLabel htmlFor="location">Localização</FormLabel>

                    <ChangeLocationModal field={field} />

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="workType"
                render={({ field }) => (
                  <FormItem className="col-span-4">
                    <FormLabel htmlFor="workType">Título</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o tipo do trabalho" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="REMOTE">REMOTO</SelectItem>
                          <SelectItem value="ONSITE">PRESENCIAL</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="categories"
                render={({ field }) => (
                  <FormItem className="col-span-4">
                    <FormLabel>Categorias</FormLabel>
                    <FormControl>
                      <ChangeCategoryModal field={field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <Button type="submit" className="w-28 font-semibold">
                Editar
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
