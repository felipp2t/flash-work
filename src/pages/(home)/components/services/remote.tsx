import { Pagination } from "@/components/pagination";
import { ServiceList } from "@/components/service-list";
import { SkeletonCardService } from "@/components/skeleton-card-service";
import { getServicesByWorkType } from "@/http/services/get-services-by-work-type";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { ServiceCard } from "../../../../components/service-card";

export const Remotes = () => {
  const [searchParams] = useSearchParams();

  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;
  const perPage = searchParams.get("per_page")
    ? Number(searchParams.get("per_page"))
    : 10;

  const { data } = useQuery({
    queryKey: ["get-remotes-services", page, perPage],
    queryFn: async () =>
      await getServicesByWorkType({ workType: "REMOTE", page, size: perPage }),
    staleTime: 1000 * 60 * 15,
  });

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
