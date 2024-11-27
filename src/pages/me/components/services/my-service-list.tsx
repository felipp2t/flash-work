import { ServiceStatus } from "@/@types/service/status";
import { Pagination } from "@/components/pagination";
import { ServiceList } from "@/components/service-list";
import { SkeletonCardService } from "@/components/skeleton-card-service";
import { Card, CardContent } from "@/components/ui/card";
import { STATUS_SERVICE } from "@/constants/status-service";
import { getServicesByUser } from "@/http/services/get-services-by-user";
import { useQuery } from "@tanstack/react-query";
import { BriefcaseBusiness } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { ServiceCard } from "../cards/service-card";

export const MyServiceList = () => {
  const [searchParams] = useSearchParams();

  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;
  const status = searchParams.get("status") || "OPEN";

  const { data } = useQuery({
    queryKey: ["get-services-by-user", status],
    queryFn: async () =>
      await getServicesByUser({ status: status as ServiceStatus }),
    enabled: !!status,
  });

  if (data && data.services.empty) {
    return (
      <Card className="mx-auto w-full max-w-2xl bg-white/5">
        <CardContent className="flex flex-col items-center justify-center py-10">
          <BriefcaseBusiness className="mb-4 size-16 text-muted-foreground" />
          <h2 className="mb-2 text-2xl font-semibold capitalize text-muted-foreground">
            {status === "OPEN" ? (
              <>nenhum serviço cadastrado.</>
            ) : (
              <>
                Nenhuma Serviço{" "}
                {STATUS_SERVICE[status as keyof typeof STATUS_SERVICE]} no
                momento
              </>
            )}
          </h2>
          <p className="mb-6 max-w-sm text-center text-muted-foreground">
            {status === "OPEN" ? (
              <>
                Você não tem nenhum serviço cadastrado. Clique no botão abaixo
                para criar um novo serviço.
              </>
            ) : (
              <>
                Você não tem nenhum serviço{" "}
                {STATUS_SERVICE[status as keyof typeof STATUS_SERVICE]} no
                momento. Espere um freelancer enviar uma proposta para você.
              </>
            )}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      {!data ? (
        <div className="grid grid-cols-4 gap-4">
          {Array.from({ length: 20 }).map((_, i) => (
            <SkeletonCardService key={i} />
          ))}
        </div>
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
