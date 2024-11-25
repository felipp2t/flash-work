import { Pagination } from "@/components/pagination";
import { ServiceList } from "@/components/service-list";
import { SkeletonCardService } from "@/components/skeleton-card-service";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getNotifications } from "@/http/notifications/get-notification";
import { getServiceByCategory } from "@/http/services/get-services-by-cateogory";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Bell, Loader2, RefreshCw } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { ServiceCard } from "../../../../components/service-card";

interface CategoryProps {
  categoryId: string;
}

export const Category = ({ categoryId }: CategoryProps) => {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;
  const perPage = searchParams.get("per_page")
    ? Number(searchParams.get("per_page"))
    : 10;

  const { data, isLoading } = useQuery({
    queryKey: ["get-category-services", categoryId, page, perPage],
    queryFn: async () =>
      await getServiceByCategory({ categoryId, page, size: perPage }),
    enabled: !!categoryId,
  });

  const { mutateAsync: getNewNotificationsMutate } = useMutation({
    mutationFn: async () => await getNotifications({ page, perPage }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-notifications"] });
    },
  });

  const handleGetNewNotifications = async () => {
    try {
      await getNewNotificationsMutate();
      toast.success("Carregando novas notificações");
    } catch {
      toast.error("Erro ao carregar novas notificações");
    }
  };

  return (
    <>
      {!data ? (
        <div className="grid grid-cols-4 gap-4">
          {Array.from({ length: 20 }).map((_, i) => (
            <SkeletonCardService key={i} />
          ))}
        </div>
      ) : data.services.empty ? (
        <Card className="bg-white/5">
          <CardContent className="flex flex-col items-center justify-center py-10">
            <Bell className="mb-4 h-16 w-16 text-muted-foreground" />
            <h2 className="mb-2 text-2xl font-semibold text-muted-foreground">
              Nenhuma notificação
            </h2>
            <p className="mb-6 max-w-sm text-center text-muted-foreground">
              Você não tem nenhuma notificação no momento. As novas notificações
              aparecerão aqui quando chegarem.
            </p>
            <Button
              variant="outline"
              className="gap-2"
              onClick={handleGetNewNotifications}
            >
              {isLoading ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Carregando
                </>
              ) : (
                <>
                  <RefreshCw className="size-4" />
                  Atualizar
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
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
        </>
      )}
    </>
  );
};
