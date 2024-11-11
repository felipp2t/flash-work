import { getServiceByCategory } from "@/_http/services/get-services-by-cateogory";
import { useQuery } from "@tanstack/react-query";
import { ServiceCard } from "../service-card";

interface CategoryProps {
  categoryId: string;
}

export const Category = ({ categoryId }: CategoryProps) => {
  const { data } = useQuery({
    queryKey: ["get-category-services", { categoryId }],
    queryFn: async () => await getServiceByCategory({ categoryId }),
  });

  if (!data) return;

  return (
    <>
      {data.services.map((service) => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </>
  );
};
