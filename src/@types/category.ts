import { CATEGORIES } from "@/_constants/categories";

export interface Category {
  id: string;
  name: keyof typeof CATEGORIES;
  description: string;
  iconName: string;
}