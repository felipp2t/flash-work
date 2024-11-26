type Degree = "BACHELOR" | "MASTER" | "DOCTORATE" | "ASSOCIATE" | "DIPLOMA";

export interface Education {
  id: string;
  degree: Degree;
  institution: string;
  course: string;
  yearOfCompletion: Date;
  yearOfInitiation: Date;
}
