import { getServiceByUserLocation } from "@/_http/services/get-service-by-user-location";
import { useQuery } from "@tanstack/react-query";
import { ServiceCard } from "../service-card";

export const Region = () => {
  const { data } = useQuery({
    queryKey: ["get-region-services"],
    queryFn: async () => await getServiceByUserLocation(),
    staleTime: 1000 * 60 * 15,
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
