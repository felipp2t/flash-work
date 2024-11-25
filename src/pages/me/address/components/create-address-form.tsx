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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SHORT_DATE_ADDRESS } from "@/constants/address";
import { createAddress } from "@/http/addresses/create-address";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { Dispatch, useEffect } from "react";
import { useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  type: z.enum(["HOUSE", "APARTMENT"]),
  houseNumber: z.string({ required_error: "Número é obrigatório" }),
  apartmentName: z.string().optional(),
  apartmentNumber: z.string().optional(),
  street: z.string({ required_error: "Rua é obrigatório" }),
  neighborhood: z.string({ required_error: "Bairro é obrigatório" }),
  city: z.string({ required_error: "Cidade é obrigatório" }),
  state: z.string({ required_error: "Estado é obrigatório" }),
  postalCode: z.string({ required_error: "CEP é obrigatório" }),
});

type FormSchema = z.infer<typeof formSchema>;

interface CreateAddressFormProps {
  setDialogIsOpen: Dispatch<React.SetStateAction<boolean>>;
}

export const CreateAddressForm = ({
  setDialogIsOpen,
}: CreateAddressFormProps) => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });

  const selectedType = form.watch("type");

  useEffect(() => {
    if (selectedType === "HOUSE") {
      form.setValue("apartmentName", "");
      form.setValue("apartmentNumber", "");
    }
  }, [selectedType, form]);

  const queryClient = useQueryClient();

  const { mutateAsync: createAddressMutate } = useMutation({
    mutationKey: ["create-address"],
    mutationFn: async ({ address }: { address: FormSchema }) =>
      createAddress({ address }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-address-by-user"] });
    },
  });

  const onSubmit = async (data: FormSchema) => {
    try {
      await createAddressMutate({ address: data });
      form.reset();
      setDialogIsOpen(false);
      toast.success("Endereço cadastrado com sucesso");
    } catch {
      toast.error("Erro ao cadastrar endereço");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-8 gap-6"
      >
        <FormField
          control={form.control}
          name="postalCode"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel htmlFor="postalCode">CEP</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  id="postalCode"
                  placeholder="digite seu cep"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="state"
          render={({ field }) => (
            <FormItem className="col-span-3">
              <FormLabel htmlFor="state">Estado</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um tipo de endereço" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.entries(SHORT_DATE_ADDRESS).map(([key, value]) => (
                      <SelectItem key={key} value={key}>
                        {value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem className="col-span-3">
              <FormLabel htmlFor="city">Cidade</FormLabel>
              <FormControl>
                <Input {...field} id="city" placeholder="digite sua cidade" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="neighborhood"
          render={({ field }) => (
            <FormItem className="col-span-3">
              <FormLabel htmlFor="neighborhood">Bairro</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  id="neighborhood"
                  placeholder="digite seu bairro"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="street"
          render={({ field }) => (
            <FormItem className="col-span-5">
              <FormLabel htmlFor="street">Rua</FormLabel>
              <FormControl>
                <Input {...field} id="street" placeholder="digite sua rua" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="col-span-4">
              <FormLabel htmlFor="type">Tipo de edifício</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um tipo de endereço" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="HOUSE">CASA</SelectItem>
                    <SelectItem value="APARTMENT">APARTAMENTO</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="houseNumber"
          render={({ field }) => (
            <FormItem className="col-span-2 col-start-7">
              <FormLabel htmlFor="houseNumber">Nº</FormLabel>
              <FormControl>
                <NumericFormat
                  {...field}
                  customInput={Input}
                  placeholder="nº do edifício"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="apartmentName"
          render={({ field }) => (
            <FormItem className="col-span-4">
              <FormLabel htmlFor="apartmentName">Nome do Apartamento</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  id="apartmentName"
                  placeholder="adicione o nome do apartamento"
                  disabled={selectedType !== "APARTMENT"}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="apartmentNumber"
          render={({ field }) => (
            <FormItem className="col-span-4">
              <FormLabel htmlFor="apartmentNumber">Nº do Apartamento</FormLabel>
              <FormControl>
                <NumericFormat
                  {...field}
                  customInput={Input}
                  placeholder="nº do apartamento"
                  disabled={selectedType !== "APARTMENT"}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="col-span-3 col-start-6">
          {form.formState.isSubmitting ? (
            <>
              <Loader2 className="animate-spin" />
              Cadastrando
            </>
          ) : (
            "Cadastrar"
          )}
        </Button>
      </form>
    </Form>
  );
};
