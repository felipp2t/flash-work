import { Education } from "@/@types/education/education";
import { Button } from "@/components/ui/button";
import { Pen } from "lucide-react";
import { useState } from "react";
import { UpsertEducation } from "./upsert-education";
// import { UpsertAddress } from "./upsert-address";

interface EditEducationButtonProps {
  education: Education;
}

export const EditEducationButton = ({
  education,
}: EditEducationButtonProps) => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  return (
    <>
      <Button
        variant="secondary"
        size="icon"
        className="group"
        onClick={() => setDialogIsOpen(true)}
      >
        <Pen className="size-4 group-hover:text-primary" />
      </Button>

      <UpsertEducation
        isOpen={dialogIsOpen}
        setIsOpen={setDialogIsOpen}
        defaultValues={education}
        educationId={education.id}
      />
    </>
  );
};
