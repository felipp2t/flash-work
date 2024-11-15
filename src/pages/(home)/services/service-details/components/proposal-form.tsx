import { ServiceResponse } from "@/@types/service/service-response";
import { MoneyInput } from "@/_components/money-input";
import { Button } from "@/_components/ui/button";
import { CalendarEditService } from "@/_components/ui/calendar-edit-service";
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
import { Textarea } from "@/_components/ui/textarea";
import { sendProposal } from "@/_http/proposals/send-proposal";
import { cn } from "@/_lib/utils";
import { hanldeSplitBudget } from "@/_utils/split-budget";
import { zodResolver } from "@hookform/resolvers/zod";
import { ptBR } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

interface FormProposalData {
  amount: {
    min: number;
    max: number;
  };
}

const formSchema = ({ amount }: FormProposalData) =>
  z.object({
    serviceId: z.string(),
    message: z
      .string({ message: "A mensagem é obrigatória" })
      .trim()
      .min(20, { message: "A mensagem deve ter no mínimo 20 caracteres" }),
    offerAmount: z
      .number({ required_error: "O valor da oferta é obrigatório" })
      .refine((value) => value >= amount.min && value <= amount.max, {
        message: `O valor da oferta deve estar entre R$${amount.min} e R$${amount.max}`,
      }),
    estimatedCompletionTime: z.date(),
  });

type FormSchema = z.infer<ReturnType<typeof formSchema>>;

interface ProposalFormProps {
  service: ServiceResponse;
  toggleFlip: () => void;
}

export const ProposalForm = ({ service, toggleFlip }: ProposalFormProps) => {
  const navigate = useNavigate();

  const form = useForm<FormSchema>({
    resolver: zodResolver(
      formSchema({
        amount: {
          min: Number(hanldeSplitBudget(service.budget).min),
          max: Number(hanldeSplitBudget(service.budget).max),
        },
      }),
    ),
    defaultValues: {
      estimatedCompletionTime: new Date(),
      message: "",
      offerAmount: 0,
      serviceId: service.id,
    },
  });

  const onSubmit = async (data: FormSchema) => {
    try {
      await sendProposal(data);

      toast.success("Proposta enviada com sucesso!", {
        description: "Verifique na página de suas propostas!",
        duration: 5000,
      });

      form.reset();

      navigate("/me/proposals");
    } catch {
      toast.error("Erro ao enviar proposta", {
        duration: 5000,
      });
    }
  };

  return (
    <div className="space-y-4 rounded-lg border bg-white bg-opacity-5 p-6">
      <h1 className="text-xl font-semibold text-primary">
        Escreva sua proposta aqui!
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="serviceId"
            render={({ field }) => (
              <FormItem className="hidden">
                <FormControl>
                  <Input {...field} type="hidden" id="id" value={service.id} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="offerAmount"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel htmlFor="offerAmount">
                  Valor da Oferta (R$)
                </FormLabel>
                <FormControl>
                  <MoneyInput
                    id="offerAmount"
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
            name="estimatedCompletionTime"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2">
                <FormLabel>Defina a data de entrega</FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? (
                          new Date(field.value).toLocaleDateString("pt-BR", {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                          })
                        ) : (
                          <span>Selecione uma data</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <CalendarEditService
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                        locale={ptBR}
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
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="message">Mensagem Adicional</FormLabel>
                <FormControl>
                  <Textarea
                    id="message"
                    {...field}
                    placeholder="Descreva sua proposta aqui..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-between gap-2">
            <Button
              variant="outline"
              type="button"
              className="w-1/2"
              onClick={toggleFlip}
            >
              Visualizar Serviço
            </Button>

            <Button type="submit" className="w-1/2">
              Enviar Proposta
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};