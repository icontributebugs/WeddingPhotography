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

      if (
        action.service === "BlurayPackage" &&
        !previouslySelectedServices.includes("VideoRecording")
      ) {
        return previouslySelectedServices;
      }

      if (
        action.service === "TwoDayEvent" &&
        !(
          previouslySelectedServices.includes("Photography") ||
          previouslySelectedServices.includes("VideoRecording")
        )
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

  let discountAppliedForServices: ServiceType[] = [];
  let finalPrice: number = basePrice;
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
