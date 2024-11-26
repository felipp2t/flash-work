import { User } from "../user/user";

export interface Address {
  id: string;
  state: string;
  neighborhood: string;
  street: string;
  city: string;
  postalCode: string;
  houseNumber: number;
  type: "HOUSE" | "APARTMENT";
  apartmentNumber: number;
  apartmentName: string;
  user: User;
}
