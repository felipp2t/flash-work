import { SkeletonCardService } from "@/_components/skeleton-card-service";
import { getServicesByUser } from "@/_http/services/get-services-by-user";
import { useQuery } from "@tanstack/react-query";
import { ServiceCard } from "./cards/service-card";

export const MyServices = () => {
  const { data } = useQuery({
    queryKey: ["get-services-by-user"],
    queryFn: async () => await getServicesByUser(),
    staleTime: 1000 * 60 * 15,
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
