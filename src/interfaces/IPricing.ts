import { ServiceType } from "../types";
import { IDiscount } from "./IDiscount";

export interface IPricing {
  basePrices: { [serviceType in ServiceType]: number };
  discounts: IDiscount[];
}
