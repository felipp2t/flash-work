import { getServicesByWorkType } from "@/_http/services/get-services-by-work-type";
import { useQuery } from "@tanstack/react-query";
import { ServiceCard } from "../service-card";

export const Remotes = () => {
  const { data } = useQuery({
    queryKey: ["get-remotes-services"],
    queryFn: async () => await getServicesByWorkType({ workType: "REMOTE" }),
    staleTime: 1000 * 60 * 15,
  });

  console.log(data);

  if (!data) return;

  return (
    <>
      {data.services.map((service) => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </>
  );
};
