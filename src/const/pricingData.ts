import { IPricing } from "../interfaces";
import { ServiceYear } from "../types";

export const pricingData: { [year in ServiceYear]: IPricing } = {
  "2020": {
    basePrices: {
      Photography: 1700,
      VideoRecording: 1700,
      WeddingSession: 600,
      BlurayPackage: 300,
      TwoDayEvent: 400,
    },
    discounts: [
      {
        forServices: ["Photography", "VideoRecording"],
        requiredServices: ["Photography", "VideoRecording"],
        discountAmount: 1200,
      },
      {
        forServices: ["WeddingSession"],
        requiredServices: ["WeddingSession", "Photography"],
        discountAmount: 300,
      },
      {
        forServices: ["WeddingSession"],
        requiredServices: ["WeddingSession", "VideoRecording"],
        discountAmount: 300,
      },
    ],
  },
  "2021": {
    basePrices: {
      Photography: 1800,
      VideoRecording: 1800,
      WeddingSession: 600,
      BlurayPackage: 300,
      TwoDayEvent: 400,
    },
    discounts: [
      {
        forServices: ["Photography", "VideoRecording"],
        requiredServices: ["Photography", "VideoRecording"],
        discountAmount: 1300,
      },
      {
        forServices: ["WeddingSession"],
        requiredServices: ["WeddingSession", "Photography"],
        discountAmount: 300,
      },
      {
        forServices: ["WeddingSession"],
        requiredServices: ["WeddingSession", "VideoRecording"],
        discountAmount: 300,
      },
    ],
  },
  "2022": {
    basePrices: {
      Photography: 1900,
      VideoRecording: 1900,
      WeddingSession: 600,
      BlurayPackage: 300,
      TwoDayEvent: 400,
    },
    discounts: [
      {
        forServices: ["Photography", "VideoRecording"],
        requiredServices: ["Photography", "VideoRecording"],
        discountAmount: 1300,
      },
      {
        forServices: ["WeddingSession"],
        requiredServices: ["WeddingSession", "Photography"],
        discountAmount: 600,
      },
      {
        forServices: ["WeddingSession"],
        requiredServices: ["WeddingSession", "VideoRecording"],
        discountAmount: 300,
      },
    ],
  },
};
