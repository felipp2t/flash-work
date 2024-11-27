import { User } from "@/@types/user/user";
import { Separator } from "@/components/ui/separator";
import { useProfileFormStore } from "@/stores/use-profile-form-store";
import { ChevronRight } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface AccordionFormsProps {
  user: User;
}

export const AccordionForms = ({ user }: AccordionFormsProps) => {
  const navigate = useNavigate();
  const { setFormData } = useProfileFormStore();
  useEffect(() => {
    setFormData({
      formData: {
        description: user.description,
        name: user.name,
        phone: user.phone,
        cpf: user.cpf,
        email: user.email,
        profileImage: user.profileImage,
      },
    });
  }, [setFormData, user]);

  return (
    <div className="flex flex-col">
      <div
        className="flex cursor-pointer items-center py-6"
        onClick={() => navigate("/me/profile/personal-infomation")}
      >
        <div className="flex flex-1 flex-col">
          <h3 className="text-xl">Informações Pessoais</h3>
          <p className="tex-sm text-muted-foreground">
            Nome completo, descrição e CPF
          </p>
        </div>
        <ChevronRight className="text-primary" />
      </div>

      <Separator />

      <div
        className="flex cursor-pointer items-center py-6"
        onClick={() => navigate("/me/profile/contact-details")}
      >
        <div className="flex flex-1 flex-col">
          <h3 className="text-xl">Dados de Contato</h3>
          <p className="tex-sm text-muted-foreground">E-mail, telefone e CPF</p>
        </div>
        <ChevronRight className="text-primary" />
      </div>

      <Separator />

      <div
        className="flex cursor-pointer items-center py-6"
        onClick={() => navigate("/me/profile/educations")}
      >
        <div className="flex flex-1 flex-col">
          <h3 className="text-xl">Suas Educações</h3>
          <p className="tex-sm text-muted-foreground">
            Instituição, Curos e Ano de conclusão etc.
          </p>
        </div>
        <ChevronRight className="text-primary" />
      </div>
    </div>
  );
};
