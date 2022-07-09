import { pricingData } from "./const/pricingData";
import { IPricing } from "./interfaces";
import { ServiceType, ServiceYear } from "./types";

export const updateSelectedServices = (
  previouslySelectedServices: ServiceType[],
  action: { type: "Select" | "Deselect"; service: ServiceType }
) => {
  switch (action.type) {
    case "Select": {
      if (previouslySelectedServices.includes(action.service)) {
        return previouslySelectedServices;
      }

      const videoRecordingSelected =
        previouslySelectedServices.includes("VideoRecording");

      if (action.service === "BlurayPackage" && !videoRecordingSelected) {
        return previouslySelectedServices;
      }

      const photographySelected =
        previouslySelectedServices.includes("Photography");

      if (
        action.service === "TwoDayEvent" &&
        !(photographySelected || videoRecordingSelected)
      ) {
        return previouslySelectedServices;
      }

      return [...previouslySelectedServices, action.service];
    }

    case "Deselect": {
      let servicesToDeselect: ServiceType[] = [action.service];

      if (
        (action.service === "Photography" &&
          !previouslySelectedServices.includes("VideoRecording")) ||
        (action.service === "VideoRecording" &&
          !previouslySelectedServices.includes("Photography"))
      ) {
        servicesToDeselect.push("TwoDayEvent");
      }

      if (action.service === "VideoRecording") {
        servicesToDeselect.push("BlurayPackage");
      }

      return previouslySelectedServices.filter(
        (service) => !servicesToDeselect.includes(service)
      );
    }
  }
};

export const calculatePrice = (
  selectedServices: ServiceType[],
  selectedYear: ServiceYear
) => {
  const pricing: IPricing = pricingData[selectedYear];

  let basePrice: number = 0;
  for (const selectedService of selectedServices) {
    basePrice += pricing.basePrices[selectedService];
  }

  let finalPrice: number = basePrice;
  let discountAppliedForServices: ServiceType[] = [];
  for (const discount of pricing.discounts) {
    if (
      discountAppliedForServices.some((service) =>
        discount.forServices.includes(service)
      )
    ) {
      continue;
    }

    if (
      discount.requiredServices.every((service) =>
        selectedServices.includes(service)
      )
    ) {
      finalPrice -= discount.discountAmount;
      discountAppliedForServices.push(...discount.forServices);
    }
  }

  return { basePrice, finalPrice };
};
