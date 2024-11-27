import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DEGREE } from "@/constants/degree";
import { deleteEducation } from "@/http/education/delete-education";
import { getEducationsByUser } from "@/http/education/get-education-by-user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { MapPin, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { EditEducationButton } from "./edit-education-button";

export const EducationsTable = () => {
  const { data } = useQuery({
    queryKey: ["get-educations-by-user"],
    queryFn: async () => await getEducationsByUser(),
    staleTime: 1000 * 60 * 15,
  });

  const queryClient = useQueryClient();

  const { mutateAsync: deleteEducationMutate } = useMutation({
    mutationKey: ["delete-education"],
    mutationFn: async ({ educationId }: { educationId: string }) =>
      deleteEducation({ educationId }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["get-educations-by-user"] }),
  });

  const handleDeleteEducation = async (educationId: string) => {
    try {
      await deleteEducationMutate({ educationId });
      toast.success("Educação deletado com sucesso");
    } catch {
      toast.error("Erro ao deletar endereço");
    }
  };

  if (data && data.educations.empty) {
    return (
      <Card className="bg-white/5">
        <CardContent className="flex flex-col items-center justify-center py-10">
          <MapPin className="mb-4 h-16 w-16 text-muted-foreground" />
          <h2 className="mb-2 text-2xl font-semibold text-muted-foreground">
            Nenhum endereço cadastrado
          </h2>
          <p className="mb-6 max-w-sm text-center text-muted-foreground">
            Você não tem nenhum endereço no momento. Mas você pode adicionar um
            clicando no botão "Adicionar Endereço"
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Curso</TableHead>
          <TableHead>Instituição</TableHead>
          <TableHead>Graduação</TableHead>
          <TableHead>Ano de Inicialização</TableHead>
          <TableHead>Ano de Conclusão</TableHead>
          <TableHead>Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data &&
          data.educations.content.map((education) => (
            <TableRow key={education.id}>
              <TableCell>{education.institution}</TableCell>
              <TableCell>{education.course}</TableCell>
              <TableCell className="capitalize">
                {DEGREE[education.degree]}
              </TableCell>
              <TableCell>
                {format(education.yearOfInitiation, "dd'/'MM'/'yyyy")}
              </TableCell>
              <TableCell>
                {format(education.yearOfCompletion, "dd'/'MM'/'yyyy")}
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <EditEducationButton education={education} />
                  <Button
                    variant="secondary"
                    size="icon"
                    className="group"
                    onClick={() => handleDeleteEducation(education.id)}
                  >
                    <Trash2 className="size-4 group-hover:text-red-600" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};
