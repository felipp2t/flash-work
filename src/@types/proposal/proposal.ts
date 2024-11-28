type Status = "PENDING" | "ACCEPTED" | "IN_PROGRESS" |"REJECTED";

export interface Proposal {
  id: string;
  serviceId: string;
  freelancerId: string;
  status: Status;
  message: string;
  offerAmount: number;
  estimatedCompletionTime: Date;
  requestedAt: Date;
  completedAt: Date;
}
