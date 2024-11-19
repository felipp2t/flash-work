import { Undo2, Webhook } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FormNewPassword } from "./components/form";
import AuthImage from "/new-password.png";

export const NewPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const email = searchParams.get("email");

  if (!email) {
    navigate(-1);
    return;
  }

  return (
    <div className="mt-20 flex h-full items-center justify-center p-6 xl:mt-0 xl:grid xl:grid-cols-[1fr,1fr] xl:p-0">
      <div className="hidden h-full items-center justify-center bg-gradient-to-l from-background to-primary/10 xl:flex">
        <img src={AuthImage} alt="Auth Image" className="max-w-xl rounded-lg" />
      </div>

      <div className="grid w-full place-content-center gap-6 xl:p-6">
        <div
          className="flex w-fit cursor-pointer items-center gap-2 hover:underline"
          onClick={() => navigate(-1)}
        >
          <Undo2 className="text-muted-foreground" />
          <p className="text-muted-foreground">Voltar</p>
        </div>

        <div className="flex items-center gap-3">
          <Webhook className="text-primary" size={40} />
          <h1 className="text-4xl font-bold">FlashWork</h1>
        </div>

        <div className="space-y-2">
          <h2 className="text-3xl font-bold">Confirme seu e-mail</h2>
          <p className="text-sm text-muted-foreground">
            Insira seu e-mail para continuar aproveitando todos os benefícios do
            FlashWork.
          </p>
        </div>

        <FormNewPassword email={email} />
      </div>
    </div>
  );
};
