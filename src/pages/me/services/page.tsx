import { PageTitle } from "@/components/page-title";
import { ServiceList } from "@/components/service-list";
import { Button } from "@/components/ui/button";
import { getServicesByUser } from "@/http/services/get-services-by-user";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { MyServices } from "../components/services/my-services";

export const MyServicesPage = () => {
  const navigate = useNavigate();
  const { data } = useQuery({
    queryKey: ["get-services-by-user"],
    queryFn: async () => await getServicesByUser(),
    staleTime: 1000 * 60 * 15,
  });

  if (!data) return;

  const handleVerifyServiceQuantity = () => {
    if (data.services.length >= 5) {
      toast.error("Você atingiu o limite de serviços cadastrados.");
      return;
    }

    navigate("/create-service");
  };

  return (
    <div className="flex flex-1 h-full flex-col gap-16 p-4">
      <div className="flex w-full items-center justify-between">
        <PageTitle title="Meus Serviços" 
        />
        <Button variant="outline" onClick={handleVerifyServiceQuantity}>
          Lançar serviços
        </Button>
      </div>

      <div className="flex h-full flex-col gap-16">
        <ServiceList>
          <MyServices services={data.services} />
        </ServiceList>
      </div>
    </div>
  );
};
