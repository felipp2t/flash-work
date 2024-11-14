import { Category } from "../category";
import { UserMin } from "./user-min";

export interface ServiceResponse {
  id: string;
  title: string;
  description: string;
  budget: string;
  workType: "REMOTE" | "ONSITE";
  deadline: string;
  location: string;
  createdAt: string;
  client: UserMin;
  categories: Category[];
}
