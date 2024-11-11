import { getServicesByWorkType } from "@/_http/services/get-services-by-work-type";
import { useQuery } from "@tanstack/react-query";
import { ServiceCard } from "../service-card";

export const OnSite = () => {
  const { data } = useQuery({
    queryKey: ["get-onsite-services"],
    queryFn: async () => await getServicesByWorkType({ workType: "ONSITE" }),
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
