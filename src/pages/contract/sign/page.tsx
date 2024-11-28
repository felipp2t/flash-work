"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSignaturePad } from "@/hooks/user-signature-pad";
import { useState } from "react";

import { EMPTY_SIGNATURE_PLACEHOLDER } from "@/constants/empty-signature-placeholder";
import { getContractById } from "@/http/contract/get-contract-by-id";
import { signContract } from "@/http/contract/sign-contract";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { ContractModal } from "../components/contract-modal";

export const ContractSigningPage = () => {
  const { id } = useParams();

  const { data } = useQuery({
    queryKey: ["get-contract", id],
    queryFn: async () => {
      if (id) {
        return await getContractById({ digitalContractId: id });
      }
    },
    enabled: !!id,
  });

  const {
    canvasRef,
    startDrawing,
    draw,
    stopDrawing,
    clearSignature,
    getSignatureImage,
  } = useSignaturePad();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!data) return;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    const signatureImage = getSignatureImage();
    if (signatureImage === EMPTY_SIGNATURE_PLACEHOLDER) {
      console.log("adfsda");
      toast.error("Assinatura Obrigatória", {
        description: "Por favor, assine o contrato antes de enviar.",
      });
      setIsSubmitting(false);
      return;
    }

    await signContract({ contractId: id!, imageBase64: signatureImage });

    toast("Contrato assinado com sucesso", {
      description: "Obrigado por assinar o contrato.",
    });
    setIsSubmitting(false);
    navigate("/me/services?status=IN_PROGRESS");

  };

  return (
    <div className="container mx-auto p-4">
      <Card className="mx-auto w-full max-w-4xl">
        <CardHeader>
          <CardTitle>Assinatura de contrato</CardTitle>
          <CardDescription>
            Por favor, revise o contrato e assine abaixo
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            variant="outline"
            onClick={() => setIsModalOpen(true)}
            className="mb-4"
          >
            Ver Contrato Completo
          </Button>
          <div className="mb-6 max-h-96 overflow-y-auto rounded-md bg-muted p-4">
            <h2 className="mb-2 text-lg font-semibold">Termos de Contrato</h2>
            <iframe
              src={data.digitalContract.cloudUrl}
              width={1000}
              height={200}
            ></iframe>
          </div>
          <div>
            <h3 className="mb-2 text-lg font-semibold">Sua Assinatura</h3>
            <div className="rounded-md border border-gray-300">
              <canvas
                ref={canvasRef}
                width={600}
                height={200}
                className="w-full touch-none bg-white"
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={clearSignature}>
            Limpar Assinatura
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Enviando..." : "Assinar e Enviar"}
          </Button>
        </CardFooter>
      </Card>
      <ContractModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        cloudUrl={data.digitalContract.cloudUrl}
      />
    </div>
  );
};
