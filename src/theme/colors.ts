export type ColorHex = string;

export type ColorShades = "base" | "light" | "dark";

type ColorShadesHex = Record<ColorShades, ColorHex>;

export type CoreColors =
  | "primary"
  | "secondary"
  | "tertiary"
  | "accent1"
  | "accent2"
  | "accent3";
export type UtilityColors = "success" | "danger" | "warning" | "info";

export type RawColorPalette = {
  background: ColorHex;
  text: ColorHex;
  border: ColorHex;
  navbar: ColorHex;
} & Record<CoreColors, ColorShadesHex> &
  Record<UtilityColors, ColorHex>;

export const themeColors: RawColorPalette = {
  background: "#F8F9FA", // Soft, near-white for a modern light UI
  text: "#212529", // Deep charcoal for excellent contrast and readability
  border: "#D1D5DB", // Light gray for subtle separation
  navbar: "#E9ECEF", // Very light gray for a clean, airy feel

  primary: {
    base: "#E63946", // Warm, energetic red
    light: "#F8A5A6", // Soft, approachable red for accents
    dark: "#B22234", // Rich red for contrast
  },

  secondary: {
    base: "#E9A75B", // Modern muted gold for warmth
    light: "#F6C188", // Softer golden hue for highlights
    dark: "#D48B45", // Deep bronze for depth
  },

  tertiary: {
    base: "#4586A0", // Cool, muted blue for balance
    light: "#70A9C1", // Light, airy blue for highlights
    dark: "#36667F", // Deeper blue for contrast
  },

  // Keeping utility colors the same
  success: "#06D6A0",
  danger: "#EF476F",
  warning: "#FFD166",
  info: "#48CAE4",

  // **Extra Colors**
  accent1: {
    base: "#6D597A", // Muted purple for depth & elegance
    light: "#A084AF", // Soft lavender for subtle highlights
    dark: "#4E3D5A", // Deep purple for strong contrast
  },

  accent2: {
    base: "#8AC926", // Fresh green for eco/positive UI elements
    light: "#B9E266", // Soft lime for background highlights
    dark: "#5E8417", // Deeper green for contrast
  },

  accent3: {
    base: "#FF6B35", // Vibrant orange-red for playful or bold accents
    light: "#FFA07A", // Lighter peach for soft highlights
    dark: "#C54A1D", // Rich burnt orange for depth
  },
};
