import { Proposal } from "@/@types/proposal/proposal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getUserById } from "@/http/user/get-user-by-id";
import { useQuery } from "@tanstack/react-query";
import { differenceInDays, format } from "date-fns";
import { pt } from "date-fns/locale";
import { Clock, DollarSign } from "lucide-react";

interface ServiceProposalCardProps {
  proposal: Proposal;
}

export const ServiceProposalCard = ({ proposal }: ServiceProposalCardProps) => {
  const { data } = useQuery({
    queryKey: ["get-user-by-id", proposal.id],
    queryFn: async () => await getUserById({ userId: proposal.freelancerId }),
  });

  if (!data) return;

  return (
    <Card className="flex h-full w-full flex-col bg-white/5">
      <CardHeader>
        <div className="flex items-center gap-4">
          <Avatar className="size-20">
            <AvatarImage src={data.user.profileImage} alt={data.user.name} />
            <AvatarFallback>{data.user.name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <CardTitle className="line-clamp-2 text-xl font-bold">
              {data.user.name}
            </CardTitle>
            <CardDescription className="line-clamp-2">
              {data.user.description}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="mb-2 font-semibold">Descrição do Serviço</h3>
          <p className="line-clamp-4 text-sm text-muted-foreground">
            {proposal.message}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <DollarSign className="mr-2 size-5 text-primary" />
            <span className="font-semibold">Valor da Oferta</span>
          </div>
          <span className="text-lg font-bold">
            {Intl.NumberFormat("pt-BR", {
              currency: "BRL",
              style: "currency",
            }).format(proposal.offerAmount)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Clock className="mr-2 size-5 text-blue-600" />
            <span className="font-semibold">Tempo Estimado</span>
          </div>
          <div className="flex flex-col">
            <p>
              {format(proposal.estimatedCompletionTime, "dd 'de' MMMM", {
                locale: pt,
              })}
            </p>
            <p className="text-end text-sm text-muted-foreground">
              acaba em{" "}
              {differenceInDays(proposal.estimatedCompletionTime, new Date())}
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="mt-auto flex items-center justify-between gap-2">
        <Button variant="outline" className="w-1/2">
          Ver Perfil
        </Button>
        <Button className="w-1/2">Escolher</Button>
      </CardFooter>
    </Card>
  );
};
