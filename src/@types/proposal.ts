type WORK_TYPE = "PENDING" | "ACCEPTED" | "REJECTED";

export interface Proposal {
  id: string;
  serviceId: string;
  freelancerId: string;
  status: WORK_TYPE;
  message: string;
  offerAmount: number;
  estimatedCompletionTime: Date;
  requestedAt: Date;
  completedAt: Date;
}
