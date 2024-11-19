import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { verifyOTP } from "@/http/auth/password-reset/otp";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  otp: z
    .string({ required_error: "A senha de confirmação é obrigatória" })
    .length(6, { message: "A senha de confirmação deve ter 6 dígitos" }),
});

type FormSchema = z.infer<typeof formSchema>;

interface FormVerifyOTPProps {
  email: string;
}

export const FormVerifyOTP = ({ email }: FormVerifyOTPProps) => {
  const navigate = useNavigate();
  // const [searchParams] = useSearchParams();
  // const email = searchParams.get("email");

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormSchema) => {
    try {
      await verifyOTP({
        ...data,
        email,
      });

      toast.success("Senha de confirmação confirmada com sucesso", {
        duration: 5000,
      });

      navigate(`/password-reset/new-password?email=${email}`);
    } catch {
      toast.error("Erro ao confirmar a senha de confirmação", {
        duration: 5000,
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="otp">Senha de confirmação</FormLabel>
              <FormControl>
                <InputOTP maxLength={6} {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="font-semibold">
          Confirmar
        </Button>
      </form>
    </Form>
  );
};
