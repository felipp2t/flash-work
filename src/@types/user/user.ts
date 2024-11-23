export interface User {
  id: string;
  email: string;
  name: string;
  cpf: string;
  phone: string;
  profession: string;
  description: string;
  profilePicture: string;
  birthDate: Date;
  role: "ADMIN" | "CUSTOMER";
}
