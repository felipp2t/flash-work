import { Education } from "@/@types/education/education";
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
import { DEGREE } from "@/constants/degree";
import { createEducation } from "@/http/education/create-education";
import { updateEducation } from "@/http/education/update-education";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { CalendarInput } from "./calendar-input";

const formSchema = z
  .object({
    degree: z.string({ required_error: "O grau é obrigatório" }),
    institution: z.string({ required_error: "A instituição é obrigatória" }),
    course: z.string({ required_error: "O curso é obrigatório" }),
    yearOfInitiation: z.coerce.date({
      required_error: "O ano de início é obrigatório",
    }),
    yearOfCompletion: z.coerce.date({
      required_error: "O ano de conclusão é obrigatório",
    }),
  })
  .refine((data) => data.yearOfInitiation <= data.yearOfCompletion, {
    path: ["yearOfInitiation"],
    message: "O ano de início deve ser menor que o ano de conclusão",
  });

export type FormSchema = z.infer<typeof formSchema>;

interface UpsertEducationProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  educationId?: string;
  defaultValues?: Education;
}

export const UpsertEducation = ({
  setIsOpen,
  isOpen,
  defaultValues,
  educationId,
}: UpsertEducationProps) => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues ?? {
      degree: "",
      institution: "",
      course: "",
      yearOfInitiation: new Date(),
      yearOfCompletion: new Date(),
    },
  });

  const queryClient = useQueryClient();

  const { mutateAsync: createEducationMutate } = useMutation({
    mutationKey: ["create-education"],
    mutationFn: async (data: Omit<Education, "id">) =>
      await createEducation({ education: data }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["get-educations-by-user"] }),
  });

  const { mutateAsync: updateEducationMutate } = useMutation({
    mutationKey: ["update-education"],
    mutationFn: async ({
      educationId,
      education,
    }: {
      educationId: string;
      education: Omit<Education, "id">;
    }) => await updateEducation({ educationId, education }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["get-educations-by-user"] }),
  });

  const isUpdate = Boolean(educationId);

  const onSubmit = async (data: FormSchema) => {
    if (isUpdate && educationId) {
      try {
        await updateEducationMutate({
          educationId,
          education: data as Omit<Education, "id">,
        });
        toast.success("Educação atualizada com sucesso");
      } catch {
        toast.error("Erro ao atualizar educação");
      }
    } else {
      try {
        await createEducationMutate(data as Omit<Education, "id">);
        toast.success("Educação cadastrada com sucesso");
      } catch {
        toast.error("Erro ao cadastrar educação");
      } finally {
        form.reset();
        setIsOpen(false);
      }
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
              name="course"
              render={({ field }) => (
                <FormItem className="col-span-5">
                  <FormLabel htmlFor="course">Curso</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="course"
                      placeholder="Digite o curso"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="degree"
              render={({ field }) => (
                <FormItem className="col-span-3">
                  <FormLabel htmlFor="degree">Grau</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value}
                      onValueChange={(value) => {
                        field.onChange(value);
                      }}
                    >
                      <FormControl>
                        <SelectTrigger className="capitalize">
                          <SelectValue placeholder="Selecione um tipo de endereço" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.entries(DEGREE).map(([key, value]) => (
                          <SelectItem
                            key={key}
                            value={key}
                            className="capitalize"
                          >
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
              name="institution"
              render={({ field }) => (
                <FormItem className="col-span-5">
                  <FormLabel htmlFor="institution">Instituição</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="institution"
                      placeholder="Digite a instituição"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="yearOfInitiation"
              render={({ field }) => (
                <FormItem className="col-span-4">
                  <FormLabel htmlFor="yearOfInitiation">
                    Ano de Início
                  </FormLabel>
                  <FormControl>
                    <CalendarInput field={field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="yearOfCompletion"
              render={({ field }) => (
                <FormItem className="col-span-4">
                  <FormLabel htmlFor="yearOfCompletion">
                    Ano de Início
                  </FormLabel>
                  <FormControl>
                    <CalendarInput field={field} />
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
