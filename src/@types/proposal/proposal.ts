type STATUS = "PENDING" | "ACCEPTED" | "REJECTED";

export interface Proposal {
  id: string;
  serviceId: string;
  freelancerId: string;
  status: STATUS;
  message: string;
  offerAmount: number;
  estimatedCompletionTime: Date;
  requestedAt: Date;
  completedAt: Date;
}
