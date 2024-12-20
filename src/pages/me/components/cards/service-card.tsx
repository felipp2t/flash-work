import { Service } from "@/@types/service/service";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAddressById } from "@/http/addresses/get-address-by-id";
import { hanldeSplitBudget } from "@/utils/split-budget";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { pt } from "date-fns/locale";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { DeletionAlertDialog } from "../services/deletion-alert-dialog";
import { EditServiceModal } from "../services/edit-service-modal";

interface ServiceCardProps {
  service: Service;
}

export const ServiceCard = ({ service }: ServiceCardProps) => {
  const navigate = useNavigate();

  const { data } = useQuery({
    queryKey: ["get-address-by-id", service.addressId],
    queryFn: async () => await getAddressById({ addressId: service.addressId }),
  });

  const handleVerifyIfExistProposal = () => {
    if (service.proposalQuantity === 0) {
      return toast(
        `O serviço "${service.title}" não possui propostas enviadas`,
      );
    }

    navigate(`/me/services/${service.id}`);
  };

  return (
    <Card className="flex h-full flex-col gap-6 rounded-lg border bg-white bg-opacity-5 p-6">
      <CardHeader className="p-0">
        <CardTitle className="text-2xl font-bold">{service.title}</CardTitle>
        <CardDescription>{service.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 p-0">
        <div className="space-x-2">
          {service.categories.map((category) => (
            <Badge key={category.id} variant="outline">
              {category.name}
            </Badge>
          ))}
        </div>

        <div className="flex justify-between">
          <div>
            <h2 className="text-sm text-muted-foreground">Valor do cliente:</h2>
            <p className="text-sm font-semibold text-primary">
              {service.budget.split("-")[0] !== "0" &&
                Intl.NumberFormat("pt-BR", {
                  currency: "BRL",
                  style: "currency",
                }).format(Number(hanldeSplitBudget(service.budget).min))}{" "}
              até{" "}
              {Intl.NumberFormat("pt-BR", {
                currency: "BRL",
                style: "currency",
              }).format(Number(hanldeSplitBudget(service.budget).max))}
            </p>
          </div>
          {data && (
            <div>
              <h2 className="text-sm text-muted-foreground">Localização:</h2>
              <p>
                {data.address.city}, {data.address.state}
              </p>
            </div>
          )}
        </div>

        <div>
          <h2 className="text-sm text-muted-foreground">
            Prazo para candidatura:
          </h2>
          <p className="text-sm font-semibold">
            até {format(service.deadline, "PPP", { locale: pt })}
          </p>
        </div>
      </CardContent>

      <CardFooter className="mt-auto flex flex-col gap-2 p-0">
        {service.status === "OPEN" ? (
          <>
            <div className="flex w-full gap-2">
              <EditServiceModal service={service} />
              <DeletionAlertDialog serviceId={service.id} />
            </div>
            <Button className="w-full" onClick={handleVerifyIfExistProposal}>
              {service.proposalQuantity === 0
                ? 0
                : String(service.proposalQuantity).padStart(2, "0")}{" "}
              propostas enviadas
            </Button>
          </>
        ) : (
          <Button className="w-full" asChild>
            <Link to={`/contracts/sign/${service.contractId}`}>Ver Contrato</Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
