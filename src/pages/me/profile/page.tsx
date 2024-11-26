import { PageTitle } from "@/components/page-title";
import { getUserByToken } from "@/http/user/get-user-by-token";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { AccordionForms } from "./components/accordion-forms";

export const ProfilePage = () => {
  const navigate = useNavigate();
  const { data } = useQuery({
    queryKey: ["get-user-by-token"],
    queryFn: async () => await getUserByToken(),
  });

  if (!data) {
    navigate("/sign-in");
    return;
  }

  return (
    <div className="mx-auto flex h-full max-w-2xl flex-col gap-16 p-4">
      <PageTitle title="Seus dados" />

      <div className="flex flex-col gap-6">
        <AccordionForms user={data.user} />
      </div>
    </div>
  );
};
