import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import { ComponentProps, useState } from "react";
import { ControllerRenderProps } from "react-hook-form";
import { FormSchema } from "./sign-up-form";

interface InputPasswordProps extends ComponentProps<"input"> {
  field: ControllerRenderProps<FormSchema, "confirmPassword">;
}

export const ConfirmInputPassword = ({
  field,
  ...props
}: InputPasswordProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <Input
        {...field}
        {...props}
        type={showPassword ? "text" : "password"}
        className={cn("pr-10", props.className)}
      />
      <Button
        type="button"
        onClick={() => setShowPassword((prev) => !prev)}
        className="absolute inset-y-0 right-0 mr-1 flex items-center bg-transparent px-2 hover:bg-transparent"
      >
        {showPassword ? (
          <EyeOff className="text-card-foreground" />
        ) : (
          <Eye className="text-card-foreground" />
        )}
      </Button>
    </div>
  );
};
