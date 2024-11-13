import { QRCode } from "@/@types/qr-code";
import { Button } from "@/_components/ui/button";
import { Card, CardContent } from "@/_components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/_components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/_components/ui/tooltip";
import { METHODS_PAYMENT } from "@/_constants/payment";
import { getUserByToken } from "@/_http/get-user-by-token";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowUpDown,
  Check,
  CheckCircle,
  ChevronLeft,
  Clock,
  Copy,
  Info,
  QrCode,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DepositForm } from "./_components/deposit-form";

export const DepositMethodPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<"pending" | "completed">(
    "pending",
  );
  const [QRCode, setQRCode] = useState<QRCode>({
    id: 0,
    detail: "",
    qrCode: "",
    qrCodeBase64: "",
    status: "",
  });
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { data } = useQuery({
    queryKey: ["get-user-by-token"],
    queryFn: async () => await getUserByToken(),
  });

  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => setIsCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isCopied]);

  if (!data) return;

  const method = METHODS_PAYMENT.find(
    (method) => method.link === pathname.split("/").pop(),
  );

  const checkPaymentStatus = async () => {
    setTimeout(() => {
      setPaymentStatus("completed");
    }, 5000);

    setTimeout(() => {
      setIsDialogOpen(false);
    }, 6000);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setIsCopied(true);
    });
  };

  if (!method) return;

  const handleBack = () => navigate(-1);

  return (
    <div className="flex flex-col gap-6">
      <div
        className="mx-auto flex w-full max-w-3xl cursor-pointer items-center gap-2 hover:underline"
        onClick={handleBack}
      >
        <ChevronLeft />
        <p className="font-bold">{method.method}</p>
      </div>
      <Card className="mx-auto w-full max-w-3xl bg-white bg-opacity-5">
        <CardContent className="flex flex-col items-center gap-6 p-6">
          {typeof method.minIcon === "string" ? (
            <img src={method.longIcon} alt={method.method} className="w-28" />
          ) : (
            <method.minIcon className="size-12" />
          )}

          <div className="flex w-full justify-between px-16">
            <div className="flex items-center gap-2">
              <Info className="size-5 text-primary" />
              <h2 className="text-lg font-bold">{method.text}</h2>
            </div>
            <p className="flex items-center gap-2 text-sm font-bold text-muted-foreground">
              <ArrowUpDown className="size-5" />{" "}
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(method.value.min)}{" "}
              {" - "}
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(method.value.max)}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="mx-auto w-full max-w-3xl bg-white bg-opacity-5">
        <CardContent className="mx-auto flex max-w-sm p-6">
          <DepositForm
            user={data.user}
            setQRCode={setQRCode}
            setIsDialogOpen={setIsDialogOpen}
            maxValue={method.value.max}
          />
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={() => setIsDialogOpen(false)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-center text-xl">
              <QrCode className="mr-2" /> Escaneie o QRCode
            </DialogTitle>
          </DialogHeader>
          <Card className="bg-white bg-opacity-5">
            <CardContent className="p-6">
              <div className="relative mb-4 flex items-center justify-center rounded-lg bg-white">
                <img
                  src={`data:image/png;base64,${QRCode.qrCodeBase64}`}
                  alt=""
                  className="size-52"
                />
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="absolute right-2 top-2"
                        onClick={() => copyToClipboard(QRCode.qrCode)}
                      >
                        {isCopied ? (
                          <Check className="size-4 text-primary" />
                        ) : (
                          <Copy className="size-4" />
                        )}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{isCopied ? "Copied!" : "Copy QR Code"}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="space-y-2 text-center">
                <p className="font-semibold">
                  Valor Total:{" "}
                  {Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(50)}
                </p>
                <p className="text-sm text-muted-foreground">
                  Escaneie o QRCode acima com o celular para realizar o
                  pagamento
                </p>
              </div>
            </CardContent>
          </Card>
          <div className="mt-4 flex justify-center">
            {paymentStatus === "pending" ? (
              <Button
                variant="outline"
                onClick={checkPaymentStatus}
                className="flex items-center"
              >
                <Clock className="mr-2 size-4 animate-spin" />
                Check Payment Status
              </Button>
            ) : (
              <div className="flex items-center text-primary">
                <CheckCircle className="mr-2 h-5 w-5" />
                Payment Completed
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
