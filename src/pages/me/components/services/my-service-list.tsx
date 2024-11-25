import { Pagination } from "@/components/pagination";
import { ServiceList } from "@/components/service-list";
import { SkeletonCardService } from "@/components/skeleton-card-service";
import { Card, CardContent } from "@/components/ui/card";
import { getServicesByUser } from "@/http/services/get-services-by-user";
import { useQuery } from "@tanstack/react-query";
import { BriefcaseBusiness } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { ServiceCard } from "../cards/service-card";

export const MyServiceList = () => {
  const [searchParams] = useSearchParams();

  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;

  const { data } = useQuery({
    queryKey: ["get-services-by-user"],
    queryFn: async () => await getServicesByUser(),
  });

  return (
    <>
      {!data ? (
        <div className="grid grid-cols-4 gap-4">
          {Array.from({ length: 20 }).map((_, i) => (
            <SkeletonCardService key={i} />
          ))}
        </div>
      ) : data.services.empty ? (
        <Card className="mx-auto w-full max-w-2xl bg-white/5">
          <CardContent className="flex flex-col items-center justify-center py-10">
            <BriefcaseBusiness className="mb-4 size-16 text-muted-foreground" />
            <h2 className="mb-2 text-2xl font-semibold text-muted-foreground">
              Nenhuma Serviço Lançado
            </h2>
            <p className="mb-6 max-w-sm text-center text-muted-foreground">
              Você não tem nenhum serviço no momento. Você pode lançar um novo
              serviço clicando no botão acima "Lançar Serviço"
            </p>
          </CardContent>
        </Card>
      ) : (
        <>
          <ServiceList>
            {data.services.content.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </ServiceList>

          <Pagination
            items={data.services.totalElements}
            page={page}
            pages={data.services.totalPages}
          />
        </>
      )}
    </>
  );
};
