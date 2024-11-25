import { Category } from "../categories/category";

export interface ServiceRequest {
  id?: string;
  title: string;
  description: string;
  budget: {
    min: number;
    max: number;
  };
  location: {
    id: string;
    city: string;
    state: string;
  };
  deadline: Date;
  workType: "REMOTE" | "ONSITE";
  categories: Category[];
}
