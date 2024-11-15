import { ServiceResponse } from "@/@types/service/service-response";
import { Avatar, AvatarFallback, AvatarImage } from "@/_components/ui/avatar";
import { Badge } from "@/_components/ui/badge";
import { Button } from "@/_components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/_components/ui/card";
import { CATEGORIES } from "@/_constants/categories";
import { hanldeSplitBudget } from "@/_utils/split-budget";
import { format } from "date-fns";
import { pt } from "date-fns/locale";
import { Link } from "react-router-dom";

interface ServiceCardProps {
  service: ServiceResponse;
}

export const ServiceCard = ({ service }: ServiceCardProps) => {
  return (
    <Card className="flex h-full flex-col gap-6 rounded-lg border bg-white bg-opacity-5 p-6">
      <CardHeader className="w-full flex-row items-center justify-around gap-6 p-0">
        <Avatar className="size-24 shadow-md">
          <AvatarFallback className="text-xl">
            {service.client.name
              .split(" ")
              .filter((_, i) => i <= 1)
              .map((word) => word[0])}
          </AvatarFallback>
          <AvatarImage src={service.client.profilePicture} />
        </Avatar>

        <div>
          <h2 className="line-clamp-1 text-2xl">{service.client.name}</h2>
          {service.client.description && (
            <p className="text-muted-foreground">
              {service.client.description}
            </p>
          )}
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-4 p-0">
        <h2 className="text-xl font-semibold text-primary">{service.title}</h2>

        <div className="space-y-1">
          <h2 className="text-sm text-muted-foreground">
            Detalhes do serviço:
          </h2>
          <p className="line-clamp-2 text-sm">{service.description}</p>
        </div>

        <div className="space-x-2">
          {service.categories.map((category) => (
            <Badge key={category.id} variant="outline">
              {CATEGORIES[category.name as keyof typeof CATEGORIES]}
            </Badge>
          ))}
        </div>

        <div className="flex justify-between">
          <div>
            <h2 className="text-sm text-muted-foreground">Valor do cliente:</h2>
            <p className="text-sm font-semibold">
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
          <div>
            <h2 className="text-sm text-muted-foreground">Localização:</h2>
            <p>{service.location}</p>
          </div>
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

      <CardFooter className="mt-auto p-0">
        <Button className="w-full font-semibold" asChild>
          <Link to={`/services/${service.id}`}>Mais detalhes</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
