import { ServiceResponse } from "@/@types/service/service-response";
import { Button } from "@/_components/ui/button";
import { CalendarEditService } from "@/_components/ui/calendar-edit-service";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/_components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/_components/ui/form";
import { Input } from "@/_components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/_components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/_components/ui/select";
import { Textarea } from "@/_components/ui/textarea";
import { CATEGORIES } from "@/_constants/categories";
import { cn } from "@/_lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { pt } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { MoneyInput } from "../../../../_components/money-input";
import { ChangeCategoryModal } from "./change-category-modal";
import { ChangeLocationModal } from "./change-location-modal";

const formSchema = z.object({
  id: z.string(),
  title: z
    .string()
    .min(12, { message: "O título deve conter com no mínimo 12 caractéres" }),
  budget: z.object({
    min: z.number().nullish(),
    max: z.number(),
  }),
  description: z.string().min(20, {
    message: "A descrição deve conter com no mínimo 20 caractéres",
  }),
  location: z.string(),
  workType: z.enum(["REMOTE", "ONSITE"]),
  deadline: z.coerce.date(),
  categories: z
    .object({
      id: z.string(),
      name: z.enum(Object.keys(CATEGORIES) as [keyof typeof CATEGORIES]),
      description: z.string(),
      iconName: z.string(),
    })
    .array(),
});

export type FormSchema = z.infer<typeof formSchema>;

interface EditServiceModalProps {
  service: ServiceResponse;
}

const handleSplitBudget = (budget: string) => {
  const [min, max] = budget.split("-");
  return {
    min: Number(min),
    max: Number(max),
  };
};

export const EditServiceModal = ({ service }: EditServiceModalProps) => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

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
      location: service.location,
      workType: service.workType,
      deadline: new Date(service.deadline),
      categories: service.categories,
    },
  });

  useEffect(() => {
    if (!dialogIsOpen) form.reset();
  }, [dialogIsOpen, form]);

  const onSubmit = (data: FormSchema) => {
    console.log(data);
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
                        {...field}
                        id="budget.min"
                        placeholder="Preço mínimo"
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
                        {...field}
                        id="budget.max"
                        placeholder="Preço máximo"
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
                name="location"
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
                name="deadline"
                render={({ field }) => (
                  <FormItem className="col-span-4">
                    <FormLabel htmlFor="deadline">
                      Prazo de Candidatura
                    </FormLabel>
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
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
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
