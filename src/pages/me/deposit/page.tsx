import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { METHODS_PAYMENT } from "@/constants/payment";
import { getUserByToken } from "@/http/user/get-user-by-token";
import { useQuery } from "@tanstack/react-query";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const DepositPage = () => {
  const navigate = useNavigate();
  const { data } = useQuery({
    queryKey: ["get-user-by-token"],
    queryFn: async () => await getUserByToken(),
  });

  const handleChooseMethod = (method: string) =>
    navigate(`/me/deposit/${method}`);

  if (!data) return;

  return (
    <div className="flex justify-between gap-6">
      <div className="w-full space-y-4">
        {METHODS_PAYMENT.map((method) => (
          <Card
            key={method.method}
            className="col-span-5 h-fit bg-white/5 p-4 transition-all hover:bg-opacity-10"
            onClick={() => handleChooseMethod(method.link)}
          >
            <CardContent className="flex items-center justify-between p-0">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-28 items-center justify-center rounded-lg border px-3">
                  {typeof method.minIcon === "string" ? (
                    <img
                      src={method.minIcon}
                      alt={method.method}
                      className="w-6"
                    />
                  ) : (
                    <method.minIcon className="size-6" />
                  )}
                </div>
                <div>
                  <h2 className="text-lg font-bold">{method.method}</h2>
                  <p className="text-muted-foreground">{method.text}</p>
                </div>
              </div>
              <Button
                asChild
                className="bg-transparent p-0 text-xl text-white hover:bg-transparent"
              >
                <ChevronRight className="mr-4 cursor-pointer hover:text-primary hover:transition-all" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="col-span-3 h-fit w-[500px] bg-white bg-opacity-5">
        <CardContent className="flex flex-col items-center px-6 py-12">
          <div className="flex w-full items-center justify-between">
            <h2 className="text-xl font-bold">Saldo</h2>
            <p className="text-lg font-bold text-primary">
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(data.user.wallet.balance)}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
