import { Pagination } from "@/components/pagination";
import { ServiceList } from "@/components/service-list";
import { SkeletonCardService } from "@/components/skeleton-card-service";
import { usePagination } from "@/hooks/use-pagination";
import { getServiceByUserLocation } from "@/http/services/get-service-by-user-location";
import { useQuery } from "@tanstack/react-query";
import { ServiceCard } from "../../../../components/service-card";

export const Region = () => {
  const { page, perPage } = usePagination();
  
  const { data } = useQuery({
    queryKey: ["get-region-services", page, perPage],
    queryFn: async () =>
      await getServiceByUserLocation({ page, size: perPage }),
    staleTime: 1000 * 60 * 15,
  });

  return (
    <>
      {!data ? (
        Array.from({ length: 20 }).map((_, i) => (
          <SkeletonCardService key={i} />
        ))
      ) : (
        <div className="flex flex-col gap-6">
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
        </div>
      )}
    </>
  );
};
