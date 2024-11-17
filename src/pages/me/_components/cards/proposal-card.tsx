import { Proposal } from "@/@types/proposal";
import { Badge } from "@/_components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/_components/ui/card";
import { PROPOSAL_STATUS } from "@/_constants/proposal-status";
import { getServiceById } from "@/_http/services/get-service-by-id";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { pt } from "date-fns/locale";
import { Clock, DollarSign } from "lucide-react";
import { DeletionAlertDialog } from "../proposals/deletion-alert-dialog";
import { ViewServiceDialog } from "../proposals/view-service-dialog";

interface ProposalCardProps {
  proposal: Proposal;
}

export const ProposalCard = ({ proposal }: ProposalCardProps) => {
  const { data } = useQuery({
    queryKey: ["get-service-by-id", proposal.serviceId],
    queryFn: async () =>
      await getServiceById({ serviceId: proposal.serviceId }),
  });

  if (!data) return;

  return (
    <Card className="flex h-full w-full flex-col bg-white/5">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="line-clamp-2 text-xl font-bold">
            {data.service.title}
          </CardTitle>
          <Badge>{PROPOSAL_STATUS[proposal.status]}</Badge>
        </div>
        <CardDescription>Detalhes da proposta enviada</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="mb-2 font-semibold">Descrição do Serviço</h3>
          <p className="line-clamp-2 text-sm text-muted-foreground">
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
          <span>
            {format(proposal.estimatedCompletionTime, "dd 'de' MMMM", {
              locale: pt,
            })}
          </span>
        </div>
      </CardContent>
      <CardFooter className="mt-auto flex gap-2">
        <ViewServiceDialog service={data.service} />

        <DeletionAlertDialog proposalId={proposal.id} />
      </CardFooter>
    </Card>
  );
};
