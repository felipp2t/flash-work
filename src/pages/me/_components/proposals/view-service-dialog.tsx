import { ServiceResponse } from "@/@types/service/service-response";
import { Avatar, AvatarFallback, AvatarImage } from "@/_components/ui/avatar";
import { Badge } from "@/_components/ui/badge";
import { Button } from "@/_components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/_components/ui/dialog";
import { WORK_TYPE } from "@/_constants/work-type";
import { hanldeSplitBudget } from "@/_utils/split-budget";
import { format } from "date-fns";
import { DollarSign, MapPin } from "lucide-react";

interface ViewServiceDialogProps {
  service: ServiceResponse;
}

export const ViewServiceDialog = ({ service }: ViewServiceDialogProps) => {
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
                src={service.client.profilePicture}
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
            <div className="flex items-center gap-2">
              <DollarSign className="size-4 text-primary" />
              <span className="text-sm">
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
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>{service.location}</span>
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
