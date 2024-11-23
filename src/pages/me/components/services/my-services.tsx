import { ServiceResponse } from "@/@types/service/service-response";
import { ServiceCard } from "../cards/service-card";

interface MyServicesProps {
  services: ServiceResponse[];
}

export const MyServices = ({ services }: MyServicesProps) => {
  return (
    <>
      {services.map((service) => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </>
  );
};
