import React from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { GlobalStyle } from "./global";
import { defaultTheme } from "./theme";

type ThemeProviderProps = {
  dangerouslyDisableGlobalStyle?: boolean;
  children?: React.ReactNode;
  globalReset?: boolean;
};

export const ThemeProvider = ({
  dangerouslyDisableGlobalStyle = false,
  globalReset = false,
  children,
}: ThemeProviderProps) => {
  return (
    <StyledThemeProvider theme={defaultTheme}>
      {!dangerouslyDisableGlobalStyle && (
        <GlobalStyle globalReset={globalReset} />
      )}
      {children}
    </StyledThemeProvider>
  );
};
