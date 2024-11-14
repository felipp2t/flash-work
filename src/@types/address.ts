import { User } from "./user";

export interface Address {
  id: string;
  state: string;
  neighborhood: string;
  street: string;
  postalCode: string;
  houseNumber: string;
  type: "HOUSE" | "APARTMENT";
  apartmentNumber: number;
  apartmentName: string;
  user: User;
}
