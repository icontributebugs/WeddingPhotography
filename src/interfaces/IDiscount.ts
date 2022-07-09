import { ServiceType } from "../types";

export interface IDiscount {
  forServices: ServiceType[];
  requiredServices: ServiceType[];
  discountAmount: number;
}
