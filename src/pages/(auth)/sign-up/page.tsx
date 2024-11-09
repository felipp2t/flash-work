import { Webhook } from "lucide-react";
import { Link } from "react-router-dom";
import { SignUpForm } from "./_components/sign-up-form";
import AuthImage from "/auth-image-2.png";

export const SignUpPage = () => {
  return (
    <div className="mt-20 flex h-full items-center justify-center p-6 xl:mt-0 xl:grid xl:grid-cols-[1fr,1fr] xl:p-0">
      <div className="hidden h-full items-center justify-center bg-gradient-to-l from-background to-primary/10 xl:flex">
        <img src={AuthImage} alt="Auth Image" className="max-w-md rounded-lg" />
      </div>

      <div className="grid w-full place-content-center gap-6 xl:p-6">
        <div className="flex items-center gap-3">
          <Webhook className="text-primary" size={40} />
          <h1 className="text-4xl font-bold">FlashWork</h1>
        </div>

        <div className="space-y-2">
          <h2 className="text-3xl font-bold">Crie sua Conta</h2>
          <p className="text-sm text-muted-foreground">
            Cadastre-se e comece a usar o FlashWork hoje mesmo!
          </p>
        </div>

        <SignUpForm />

        <div className="mb-20">
          <p className="text-center">
            Já possui uma conta?{" "}
            <Link to="/sign-in" className="text-primary hover:underline">
              Entrar
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
