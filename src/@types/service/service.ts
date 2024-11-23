import { Category } from "../category";
import { UserMin } from "../user-min";

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
  categories: Category[];
  proposalQuantity: number;
}
