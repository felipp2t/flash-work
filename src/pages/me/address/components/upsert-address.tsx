import { MaskInput } from "@/components/phone-input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
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
import { SHORT_DATE_ADDRESS } from "@/constants/address";
import { createAddress } from "@/http/addresses/create-address";
import { updateAddress } from "@/http/addresses/update-address";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import cepPromise from "cep-promise";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  type: z.enum(["HOUSE", "APARTMENT"]),
  houseNumber: z.number().positive(),
  apartmentName: z.string().nullable(),
  apartmentNumber: z.number().nullable(),
  street: z.string({ required_error: "Rua é obrigatório" }),
  neighborhood: z.string({ required_error: "Bairro é obrigatório" }),
  city: z.string({ required_error: "Cidade é obrigatório" }),
  state: z.string({ required_error: "Estado é obrigatório" }),
  postalCode: z.string({ required_error: "CEP é obrigatório" }),
});

type FormSchema = z.infer<typeof formSchema>;

interface UpsertAddressProps {
  setIsOpen: (isOpen: boolean) => void;
  isOpen: boolean;
  defaultValues?: FormSchema;
  addressId?: string;
}

export const UpsertAddress = ({
  isOpen,
  setIsOpen,
  addressId,
  defaultValues,
}: UpsertAddressProps) => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues ?? {
      apartmentName: "",
      apartmentNumber: 0,
      city: "",
      houseNumber: 0,
      neighborhood: "",
      postalCode: "",
      state: "",
      street: "",
      type: "HOUSE",
    },
  });

  const selectedType = form.watch("type");
  const postalCodeValue = form.watch("postalCode");

  useEffect(() => {
    const fetchCep = async () => {
      if (postalCodeValue.length === 9) {
        const postalCode = postalCodeValue.replace("-", "");
        const cepData = await cepPromise(postalCode);

        form.setValue("state", cepData.state);
        form.setValue("city", cepData.city);
        form.setValue("neighborhood", cepData.neighborhood);
        form.setValue("street", cepData.street);
      }
    };

    fetchCep();
  }, [postalCodeValue, form]);

  useEffect(() => {
    if (selectedType !== "APARTMENT") {
      form.setValue("apartmentName", "");
      form.setValue("apartmentNumber", 0);
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

  const { mutateAsync: updateAddressMutate } = useMutation({
    mutationKey: ["update-address", addressId],
    mutationFn: async ({
      address,
      addressId,
    }: {
      address: FormSchema;
      addressId: string;
    }) => updateAddress({ address, addressId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-address-by-user"] });
    },
  });

  const onSubmit = async (data: FormSchema) => {
    if (addressId) {
      try {
        await updateAddressMutate({ address: data, addressId });
        toast.success("Endereço atualizado com sucesso");
      } catch {
        toast.error("Erro ao atualizar endereço");
      } finally {
        form.reset();
        setIsOpen(false);
      }
      return;
    }

    try {
      await createAddressMutate({ address: data });
    } catch {
      toast.error("Erro ao cadastrar endereço");
    } finally {
      form.reset();
      setIsOpen(false);
      toast.success("Endereço cadastrado com sucesso");
    }
  };

  const isUpdate = Boolean(addressId);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) form.reset();
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isUpdate ? "Atualizar" : "Criar"}</DialogTitle>
          <DialogDescription>Insira as informações abaixo</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-8 gap-x-4 gap-y-6"
          >
            <FormField
              control={form.control}
              name="postalCode"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel htmlFor="postalCode">CEP</FormLabel>
                  <FormControl>
                    <MaskInput
                      {...field}
                      id="postalCode"
                      format="#####-###"
                      placeholder="99999-999"
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
                      value={field.value}
                      onValueChange={(value) => {
                        field.onChange(value);
                      }}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione um tipo de endereço" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.entries(SHORT_DATE_ADDRESS).map(
                          ([key, value]) => (
                            <SelectItem key={key} value={key}>
                              {value}
                            </SelectItem>
                          ),
                        )}
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
                    <Input
                      {...field}
                      id="city"
                      placeholder="digite sua cidade"
                    />
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
                    <Input
                      {...field}
                      id="street"
                      placeholder="digite sua rua"
                    />
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
                    <Select onValueChange={field.onChange} value={field.value}>
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
                <FormItem className="col-span-3 col-start-6">
                  <FormLabel htmlFor="houseNumber">Nº</FormLabel>
                  <FormControl>
                    <NumericFormat
                      onValueChange={({ floatValue }) =>
                        field.onChange(floatValue)
                      }
                      onBlur={field.onBlur}
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
                  <FormLabel htmlFor="apartmentName">
                    Nome do Apartamento
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value ?? ""}
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
                  <FormLabel htmlFor="apartmentNumber">
                    Nº do Apartamento
                  </FormLabel>
                  <FormControl>
                    <NumericFormat
                      onValueChange={({ floatValue }) =>
                        field.onChange(floatValue)
                      }
                      value={field.value}
                      onBlur={field.onBlur}
                      customInput={Input}
                      placeholder="nº do apartamento"
                      disabled={selectedType !== "APARTMENT"}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="col-span-3 col-start-6"
            >
              {form.formState.isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" />
                  {isUpdate ? "Atualizando..." : "Cadastrando..."}
                </>
              ) : isUpdate ? (
                "Atualizar"
              ) : (
                "Cadastrar"
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
