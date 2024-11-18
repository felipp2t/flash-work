import { SkeletonCardService } from "@/components/skeleton-card-service";
import { getServiceByCategory } from "@/http/services/get-services-by-cateogory";
import { useQuery } from "@tanstack/react-query";
import { ServiceCard } from "../../../../components/service-card";

interface CategoryProps {
  categoryId: string;
}

export const Category = ({ categoryId }: CategoryProps) => {
  const { data } = useQuery({
    queryKey: ["get-category-services", { categoryId }],
    queryFn: async () => await getServiceByCategory({ categoryId }),
  });

  return (
    <>
      {!data
        ? Array.from({ length: 20 }).map((_, i) => (
            <SkeletonCardService key={i} />
          ))
        : data.services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
    </>
  );
};
