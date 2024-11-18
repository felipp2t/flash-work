import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { ComponentProps, useState } from "react";
import { ControllerRenderProps } from "react-hook-form";
import { FormSchema } from "./sign-in-form";

type Value = FormSchema;

interface InputPasswordProps extends ComponentProps<"input"> {
  field: ControllerRenderProps<Value, "password">;
}

export const InputPassword = ({ field, ...props }: InputPasswordProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <Input
        {...field}
        {...props}
        type={showPassword ? "text" : "password"}
        className="pr-10"
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
