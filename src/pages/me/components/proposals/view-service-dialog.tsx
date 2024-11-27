import { Service } from "@/@types/service/service";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { WORK_TYPE } from "@/constants/work-type";
import { getAddressById } from "@/http/addresses/get-address-by-id";
import { hanldeSplitBudget } from "@/utils/split-budget";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { MapPin } from "lucide-react";

interface ViewServiceDialogProps {
  service: Service;
}

export const ViewServiceDialog = ({ service }: ViewServiceDialogProps) => {
  const { data, isLoading } = useQuery({
    queryKey: ["get-address-by-id"],
    queryFn: async () => await getAddressById({ addressId: service.addressId }),
    staleTime: 1000 * 60 * 15,
    enabled: !!service.addressId,
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex w-full items-center">
          Visualizar Serviço
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {service.title}
          </DialogTitle>
          <DialogDescription className="limp-3">
            {service.description}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage
                src={service.client.profileImage}
                alt={service.client.name}
              />
              <AvatarFallback>
                {service.client.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">{service.client.name}</h3>
              <p className="text-sm text-gray-500">
                {service.client.description}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Badge className="font-semibold">
                {WORK_TYPE[service.workType]}
              </Badge>
            </div>

            <div className="text-sm">
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
            </div>

            <div className="flex items-center gap-2">
              <MapPin className="size-4" />
              <span>
                {isLoading ? (
                  <span className="text-muted-foreground">Carregando...</span>
                ) : (
                  <span>
                    {data?.address.city}, {data?.address.state}
                  </span>
                )}
              </span>
            </div>
          </div>
          <div>
            <h4 className="mb-2 font-semibold text-primary">
              Descrição do Serviço
            </h4>
            <p className="text-sm text-muted-foreground">
              {service.description}
            </p>
          </div>
          <div className="text-xs text-muted-foreground">
            Postado {format(service.createdAt, "dd")} dias atrás
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
