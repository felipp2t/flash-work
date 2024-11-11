import { ReactNode } from "react";

interface ServiceListProps {
  children: ReactNode;
}

export const ServiceList = ({ children }: ServiceListProps) => {
  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-4">{children}</div>
  );
};
