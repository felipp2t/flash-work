export interface ServiceRequest {
  id: string;
  title: string;
  description: string;
  budget: {
    min: number;
    max: number;
  };
  location: string;
  workType: "REMOTE" | "ONSITE";
  deadline: Date;
  categories: string[];
}
