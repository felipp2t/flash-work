import { useQuery } from "@tanstack/react-query";
import { Bell } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export const NotificationDropdown = () => {


  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="aspect-square p-0">
          <Bell className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="mt-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <DropdownMenuItem className="max-w-md">
            <div key={i} className="border-b p-4">
              <h3 className="text-lg font-semibold">Notification {i + 1}</h3>
              <p className="text-sm text-gray-500">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
