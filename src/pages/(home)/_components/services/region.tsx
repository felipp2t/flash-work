import { SkeletonCardService } from "@/_components/skeleton-card-service";
import { getServiceByUserLocation } from "@/_http/services/get-service-by-user-location";
import { useQuery } from "@tanstack/react-query";
import { ServiceCard } from "../service-card";

export const Region = () => {
  const { data } = useQuery({
    queryKey: ["get-region-services"],
    queryFn: async () => await getServiceByUserLocation(),
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
