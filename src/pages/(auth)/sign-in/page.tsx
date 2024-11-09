import { Webhook } from "lucide-react";
import { Link } from "react-router-dom";
import { SignInForm } from "./_components/sign-in-form";

export const SignInPage = () => {
  return (
    <div className="grid h-full grid-cols-2">
      <div className="grid place-content-center gap-6">
        <div className="flex items-center gap-3">
          <Webhook className="text-primary" size={40} />
          <h1 className="text-4xl font-bold">FlashWork</h1>
        </div>

        <div className="space-y-2">
          <h2 className="text-3xl font-bold">Bem vindo de Volta!</h2>
          <p className="text-sm text-muted-foreground">
            Entre e continue aproveitando todos os benefícios do FlashWork.
          </p>
        </div>

        <SignInForm />

        <p className="text-center">
          não possui uma conta?{" "}
          <Link to="/register" className="text-primary hover:underline">
            Cadastre-se
          </Link>
        </p>

      </div>
      <div className="bg-white bg-opacity-5"></div>
    </div>
  );
};
