import { Category } from "../categories/category";
import { UserMin } from "../user/user-min";
import { ServiceStatus } from "./status";

export interface Service {
  id: string;
  title: string;
  description: string;
  budget: string;
  workType: "REMOTE" | "ONSITE";
  deadline: Date;
  addressId: string;
  createdAt: Date;
  client: UserMin;
  status: ServiceStatus;
  categories: Category[];
  proposalQuantity: number;
  contractId: string | null
}
