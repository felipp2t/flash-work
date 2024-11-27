import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { STATUS_SERVICE } from "@/constants/status-service";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export const SelectServicesByStatus = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const status = searchParams.get("status");
    if (!status) {
      const firstStatus = "OPEN";
      setSearchParams((params) => {
        params.set("status", firstStatus);
        return params;
      });
    }
  }, [searchParams, setSearchParams]);

  const handleSelectStatus = (status: string) => {
    setSearchParams((params) => {
      params.set("status", status);
      return params;
    });
  };

  return (
    <Select
      onValueChange={(status) => handleSelectStatus(status)}
      defaultValue="OPEN"
    >
      <SelectTrigger className="w-[180px] capitalize">
        <SelectValue placeholder="Status" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {Object.entries(STATUS_SERVICE).map(([key, value]) => (
            <SelectItem key={key} value={key} className="capitalize">
              {value}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
