import { Pagination } from "@/components/pagination";
import { ServiceList } from "@/components/service-list";
import { SkeletonCardService } from "@/components/skeleton-card-service";
import { usePagination } from "@/hooks/use-pagination";
import { getServiceByCategory } from "@/http/services/get-services-by-cateogory";
import { useQuery } from "@tanstack/react-query";
import { ServiceCard } from "../../../../components/service-card";

interface CategoryProps {
  categoryId: string;
}

export const Category = ({ categoryId }: CategoryProps) => {
  const { page, perPage } = usePagination();

  const { data } = useQuery({
    queryKey: ["get-category-services", { categoryId }],
    queryFn: async () =>
      await getServiceByCategory({ categoryId, page, size: perPage }),
  });

  return (
    <>
      {!data ? (
        Array.from({ length: 20 }).map((_, i) => (
          <SkeletonCardService key={i} />
        ))
      ) : (
        <div className="space-y-6">
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
