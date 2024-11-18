import { Webhook } from "lucide-react";
import { Link } from "react-router-dom";
import { SignInForm } from "./components/sign-in-form";
import AuthImage from "/auth-image.png";

export const SignInPage = () => {
  return (
    <div className="mt-20 flex h-full items-center justify-center p-6 xl:mt-0 xl:grid xl:grid-cols-[1fr,1fr] xl:p-0">
      <div className="grid w-full place-content-center gap-6 xl:p-6">
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
          Não possui uma conta?{" "}
          <Link to="/sign-up" className="text-primary hover:underline">
            Cadastre-se
          </Link>
        </p>
      </div>

      <div className="hidden h-full items-center justify-center bg-gradient-to-r from-background to-primary/10 xl:flex">
        <img src={AuthImage} alt="Auth Image" className="max-w-md rounded-lg" />
      </div>
    </div>
  );
};
