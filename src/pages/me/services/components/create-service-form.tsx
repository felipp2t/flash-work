import { MoneyInput } from "@/components/money-input";
import { Button } from "@/components/ui/button";
import { CalendarEditService } from "@/components/ui/calendar-edit-service";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CATEGORIES, ICONS_CATEGORIES } from "@/constants/categories";
import { getAddressesByUser } from "@/http/addresses/get-addresses-by-user";
import { createService } from "@/http/services/create-service";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { pt } from "date-fns/locale";
import { CalendarIcon, InfoIcon, Loader2, MapPinned } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { AddressDialogContent } from "../../components/services/address-dialog-content";
import { CategoriesDialog } from "./categories-dialog";

const formSchema = z
  .object({
    title: z
      .string({ required_error: "O título é obrigatório" })
      .min(15, { message: "O título deve ter no mínimo 15 caracteres" })
      .max(50, { message: "O título deve ter no máximo 50 caracteres" }),
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
    description: z
      .string({ required_error: "A descrição é obrigatória" })
      .min(50, { message: "A descrição deve ter no mínimo 50 caracteres" })
      .max(500, { message: "A descrição deve ter no máximo 500 caracteres" }),
    address: z.object({
      id: z.string(),
      city: z.string(),
      state: z.string(),
    }),
    workType: z.enum(["REMOTE", "ONSITE"]),
    deadline: z.coerce.date({ required_error: "O prazo é obrigatório" }),
    categories: z
      .object({
        id: z.string(),
        name: z.string(),
        description: z.string(),
        iconName: z.string(),
      })
      .array()
      .min(1, "É necessário selecionar pelo menos uma categoria."),
  })
  .refine((data) => data.budget.max >= data.budget.min, {
    path: ["budget.max"],
    message: "O valor máximo deve ser maior que o valor mínimo",
  });

export type FormSchema = z.infer<typeof formSchema>;

export const CreateServiceForm = () => {
  const { data } = useQuery({
    queryKey: ["get-address-by-user"],
    queryFn: async () => await getAddressesByUser(),
    staleTime: 1000 * 60 * 15,
  });

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      budget: {
        min: 0,
        max: 0,
      },
      description: "",
      address: {
        id: data?.addresses.content[0].id ?? "",
        city: data?.addresses.content[0].city ?? "",
        state: data?.addresses.content[0].state ?? "",
      },
      workType: "REMOTE",
      deadline: new Date(),
      categories: [],
    },
  });

  const selectAddress = (addressId: string) => {
    const address = data?.addresses.content.find((a) => a.id === addressId);

    if (address) {
      form.setValue("address", {
        id: address.id,
        city: address.city,
        state: address.state,
      });
    }
  };

  const queryClient = useQueryClient();

  const { mutateAsync: createServiceMutate } = useMutation({
    mutationKey: ["create-service"],
    mutationFn: async (data: FormSchema) =>
      await createService({
        service: {
          ...data,
          location: data.address,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-services-by-user"] });
    },
  });

  const onSubmit = async (data: FormSchema) => {
    try {
      await createServiceMutate(data);
      toast.success("Serviço lançado com sucesso!");
    } catch {
      toast.error("Erro ao lançar serviço, tente novamente mais tarde.");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-8 gap-4">
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
                    placeholder="Insira o título do serviço"
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
              <FormItem className="col-span-2 mt-2">
                <div className="flex justify-between">
                  <FormLabel htmlFor="budget.min">Preço Min.</FormLabel>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <InfoIcon className="size-4 cursor-pointer text-primary" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-60">
                        <p>preço disposto a pagar pelo serviço.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>

                <FormControl>
                  <MoneyInput
                    id="budget.min"
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
                <FormLabel htmlFor="budget.max">Preço Max.</FormLabel>

                <FormControl>
                  <MoneyInput
                    id="budget.max"
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
              <FormItem className="col-span-8">
                <FormLabel htmlFor="description">Descrição</FormLabel>

                <FormControl>
                  <Textarea
                    {...field}
                    id="description"
                    placeholder="Insira a descrição do serviço"
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
                <FormLabel htmlFor="address">Endereço</FormLabel>
                <div className="flex items-center gap-2">
                  <FormControl>
                    <Input
                      {...field}
                      value={`${field.value.city}, ${field.value.state}`}
                      readOnly
                    />
                  </FormControl>
                  <Dialog>
                    <DialogTrigger>
                      <Button className="aspect-square p-0" type="button">
                        <MapPinned className="size-4" />
                      </Button>
                    </DialogTrigger>

                    {data && (
                      <AddressDialogContent
                        addresses={data.addresses.content}
                        addressId={field.value.id}
                        selectAddress={selectAddress}
                      />
                    )}
                  </Dialog>
                </div>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="workType"
            render={({ field }) => (
              <FormItem className="col-span-4">
                <FormLabel htmlFor="workType">Tipo de Serviço</FormLabel>

                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a verified email to display" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="REMOTE">REMOTO</SelectItem>
                    <SelectItem value="ONSITE">PRESENCIAL</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="deadline"
            render={({ field }) => (
              <FormItem className="col-span-4 mt-2">
                <div className="flex justify-between">
                  <FormLabel htmlFor="deadline">Prazo de Candidatura</FormLabel>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <InfoIcon className="size-4 cursor-pointer text-primary" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-60">
                        <p>Você não irá poder alterar essa informação</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP", { locale: pt })
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto size-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarEditService
                        {...field}
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => {
                          const today = new Date();
                          const fifteenDaysAfter = new Date(today);
                          fifteenDaysAfter.setDate(today.getDate() + 15);
                          return date < today || date > fifteenDaysAfter;
                        }}
                        initialFocus
                        locale={pt}
                      />
                    </PopoverContent>
                  </Popover>
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
                <FormLabel htmlFor="categories">Categorias</FormLabel>
                <Dialog>
                  <div className="grid grid-cols-2 gap-2">
                    {field.value &&
                      field.value.length > 0 &&
                      field.value.map((category) => {
                        const IconComponent =
                          ICONS_CATEGORIES[category.iconName];
                        return (
                          <div
                            key={category.id}
                            className="flex h-10 w-full items-center justify-center gap-2 rounded-md border bg-card px-2 text-sm font-medium capitalize text-muted-foreground"
                          >
                            <IconComponent className="mr-1 size-4" />
                            {
                              CATEGORIES[
                                category.name as keyof typeof CATEGORIES
                              ]
                            }
                          </div>
                        );
                      })}
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        type="button"
                        className={cn(
                          "w-full",
                          field.value.length === 0 && "col-span-4",
                        )}
                      >
                        Adicionar
                      </Button>
                    </DialogTrigger>
                  </div>
                  <DialogContent className="sm:min-w-[600px]">
                    <DialogHeader>
                      <DialogTitle>
                        Adicione as categorias para seu Serviço
                      </DialogTitle>
                      <DialogDescription>
                        Coloque o mouse em cima das categorias para ver sua
                        descrição
                      </DialogDescription>
                    </DialogHeader>
                    <CategoriesDialog field={field} />
                  </DialogContent>
                </Dialog>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <DialogFooter className="mt-6">
          <Button
            type="submit"
            className="font-semibold"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <>
                <Loader2 className="animate-spin" />
                Lançando...
              </>
            ) : (
              "Lançar"
            )}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};
