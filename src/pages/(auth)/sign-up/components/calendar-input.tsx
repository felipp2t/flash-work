import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { FormControl } from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { pt } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { ControllerRenderProps } from "react-hook-form";
import { FormSchema } from "./sign-up-form";

interface CalendarInputProps {
  field: ControllerRenderProps<FormSchema, "birthDate">;
}

export const CalendarInput = ({ field }: CalendarInputProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant={"outline"}
            className={cn(
              "w-full pl-3 text-left font-normal",
              !field.value && "text-muted-foreground",
            )}
          >
            {field.value ? (
              format(field.value, "PPP", { locale: pt })
            ) : (
              <span>Pick a date</span>
            )}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={field.value}
          onSelect={field.onChange}
          disabled={(date) =>
            date > new Date() || date < new Date("1900-01-01")
          }
          className="bg-background"
          captionLayout="dropdown-buttons"
          fromYear={1900}
          toYear={new Date().getFullYear()}
          initialFocus
          locale={pt}
        />
      </PopoverContent>
    </Popover>
  );
};
