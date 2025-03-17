import { RawColorPalette, themeColors } from "./colors.ts";
import { DefaultTheme } from "styled-components";

export interface GuessTheCardsTheme {
  colors: RawColorPalette;
  fonts: {
    default: string;
  };
  fontWeights: {
    normal: number;
    semiBold: number;
    bold: number;
  };
  fontSizes: {
    s: string;
    m: string;
    l: string;
    xl: string;
  };
  borderRadius: {
    s: string;
    m: string;
    l: string;
  };
  spacing: {
    xs: string;
    s: string;
    m: string;
    l: string;
    xl: string;
  };
}

declare module "styled-components" {
  export interface DefaultTheme extends GuessTheCardsTheme {}
}

export const defaultTheme: DefaultTheme = {
  colors: themeColors,
  fonts: {
    default: "'Roboto', sans-serif",
  },
  fontWeights: {
    normal: 400,
    semiBold: 500,
    bold: 700,
  },
  fontSizes: {
    s: "1rem",
    m: "1.5rem",
    l: "2rem",
    xl: "3rem",
  },
  borderRadius: {
    s: "4px",
    m: "8px",
    l: "16px",
  },
  spacing: {
    xs: "4px",
    s: "8px",
    m: "16px",
    l: "32px",
    xl: "64px",
  },
};
