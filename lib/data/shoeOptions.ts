// Single source of truth for shoe product options.

export const SHOE_CATEGORIES = [
  "Boots",
  "Loafers",
  "Formal",
  "Sneakers",
  "Heels",
  "Sandals",
];

export const SHOE_COLORS = [
  { name: "Black", hex: "#111111" },
  { name: "Espresso", hex: "#3B2A20" },
  { name: "Chocolate", hex: "#5A3A26" },
  { name: "Cognac", hex: "#9A4E1C" },
  { name: "Tan", hex: "#C08A5B" },
  { name: "Oxblood", hex: "#5C1A1B" },
  { name: "Burgundy", hex: "#7A1F2B" },
  { name: "Navy", hex: "#1F2A44" },
  { name: "Olive", hex: "#5B5B35" },
  { name: "Taupe", hex: "#8B7D6B" },
  { name: "Grey", hex: "#8A8A8A" },
  { name: "Ivory", hex: "#F4EEDF" },
  { name: "White", hex: "#FFFFFF" },
  { name: "Nude", hex: "#D9B49A" },
  { name: "Gold", hex: "#C9A54C" },
  { name: "Silver", hex: "#BFC1C2" },
];

export const SHOE_MATERIALS = [
  "Calfskin",
  "Full-grain leather",
  "Suede",
  "Nubuck",
  "Patent leather",
  "Shell cordovan",
  "Shearling",
  "Satin",
  "Canvas",
];

export const SHOE_SIZE = [35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46];

// Hex for a colour name, or undefined for colours not in the list (e.g. older products)
export function getColorHex(name?: string | null) {
  return SHOE_COLORS.find((c) => c.name.toLowerCase() === name?.toLowerCase())
    ?.hex;
}
