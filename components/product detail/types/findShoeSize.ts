"use server";

import { ProductVariant } from "./product";

const SHOE_SIZE_CHART = [
  { cm: 22.5, us: "5", eu: "36" },
  { cm: 23.0, us: "5.5", eu: "37" },
  { cm: 23.5, us: "6", eu: "37.5" },
  { cm: 24.0, us: "6.5", eu: "38" },
  { cm: 24.5, us: "7", eu: "39" },
  { cm: 25.0, us: "7.5", eu: "40" },
  { cm: 25.5, us: "8", eu: "41" },
  { cm: 26.0, us: "8.5", eu: "41.5" },
  { cm: 26.5, us: "9", eu: "42" },
  { cm: 27.0, us: "9.5", eu: "43" },
  { cm: 27.5, us: "10", eu: "43.5" },
  { cm: 28.0, us: "10.5", eu: "44" },
  { cm: 28.5, us: "11", eu: "45" },
  { cm: 29.0, us: "11.5", eu: "45.5" },
  { cm: 29.5, us: "12", eu: "46" },
  { cm: 30.5, us: "13", eu: "47" },
];

export interface SizeRecommendationResult {
  matchedVariant: ProductVariant | null;
  recommendedLabel: string;
}

export async function findMatchingShoeSize(
  footLength: number,
  unit: "cm" | "in",
  variants: ProductVariant[]
): Promise<SizeRecommendationResult> {
  if (!footLength || footLength <= 0) {
    throw new Error("Please enter a valid foot length.");
  }

  // Convert inches to cm on the server
  const lengthInCm = unit === "in" ? footLength * 2.54 : footLength;

  // Find the closest size in the chart
  const chartMatch =
    SHOE_SIZE_CHART.find((entry) => entry.cm >= lengthInCm - 0.15) ||
    SHOE_SIZE_CHART[SHOE_SIZE_CHART.length - 1];

  // Match against the product's available variants
  const matchedVariant =
    variants.find((v) => {
      const text = `${v.label} ${v.dimensions ?? ""}`.toLowerCase();
      return (
        text.includes(chartMatch.us) ||
        text.includes(chartMatch.eu) ||
        text.includes(String(chartMatch.cm))
      );
    }) ?? null;

  return {
    matchedVariant,
    recommendedLabel: matchedVariant
      ? matchedVariant.label
      : `US ${chartMatch.us} / EU ${chartMatch.eu}`,
  };
}