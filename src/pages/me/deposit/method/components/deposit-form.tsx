import { QRCode } from "@/@types/qr-code";
import { User } from "@/@types/user/user";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { VALUES } from "@/constants/payment";
import { sendDeposit } from "@/http/send-deposit";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { Dispatch, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  amount: z.number(),
});

export type FormSchema = z.infer<typeof formSchema>;

interface DepositFormProps {
  user: User;
  setQRCode: Dispatch<React.SetStateAction<QRCode>>;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  maxValue: number;
}

export const DepositForm = ({
  user,
  setQRCode,
  setIsDialogOpen,
  maxValue,
}: DepositFormProps) => {
  const [amount, setAmount] = useState<number>(20);

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 20,
    },
  });

  useEffect(() => {
    form.setValue("amount", amount);
  }, [amount, form]);

  const onSubmit = async (data: FormSchema) => {
    try {
      const { payment } = await sendDeposit({
        transactionAmount: data.amount,
        description: "asfafsfsafsafsfsasf",
        payer: {
          email: user.email,
          firstName: user.name,
          identification: {
            type: "CPF",
            number: user.cpf,
          },
          lastName: user.name,
        },
      });

      setQRCode({ ...payment });
      setIsDialogOpen(true);
    } catch {
      toast.error("Erro ao realizar o depósito", {
        duration: 5000,
      });
    }
  };

  const handleSetValueDeposit = (value: number) => {
    setAmount((prev) => {
      const newAmount = prev + value > maxValue ? prev : prev + value;
      return newAmount;
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col items-center gap-6"
      >
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} type="hidden" value={amount} />
              </FormControl>
            </FormItem>
          )}
        />

        <h1 className="text-2xl font-bold">
          {Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(amount)}
        </h1>

        <div className="space-y-2">
          <div className="grid grid-cols-3 gap-x-2 gap-y-2">
            {VALUES.map((value) => (
              <Button
                key={value}
                type="button"
                variant="outline"
                onClick={() => handleSetValueDeposit(value)}
              >
                {Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(value)}
              </Button>
            ))}
          </div>
          <p
            className="cursor-pointer text-end hover:underline"
            onClick={() => setAmount(20)}
          >
            limpar
          </p>
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? (
            <>
              <Loader2 className="animate-spin" />
              Enviando...
            </>
          ) : (
            "Depositar"
          )}
        </Button>
      </form>
    </Form>
  );
};
