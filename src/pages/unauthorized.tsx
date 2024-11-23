"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function UnauthorizedPage() {
  const navigate = useNavigate();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <XCircle className="mx-auto h-16 w-16 text-destructive" />
        <h1 className="mt-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Acesso Não Autorizado
        </h1>
        <p className="mt-4 text-base text-muted-foreground sm:text-lg">
          Desculpe, você não tem permissão para acessar esta página.
        </p>
        <div className="mt-10">
          <Button onClick={() => navigate("/services")} className="px-4 py-2">
            Voltar para a Página Inicial
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
