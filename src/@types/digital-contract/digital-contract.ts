import { UserMin } from "../user/user-min";
import { ServiceMin } from "./service-min";
import { Status } from "./status";

export interface DigitalContract {
  id: string;
  service: ServiceMin;
  freelancer: UserMin;
  client: UserMin;
  cloudUrl: string;
  status: Status;
  signedByClient: boolean;
  signedByFreelancer: boolean;
  clientSignedAt: Date;
  freelancerSignedAt: Date;
}
