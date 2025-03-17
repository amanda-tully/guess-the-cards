import { createGlobalStyle } from "styled-components";
import ModernNormalize from "./ModernNormalize";

export interface GlobalStyleProps {
  globalReset: boolean;
}

export const GlobalStyle = createGlobalStyle<GlobalStyleProps>`
  ${(props) => props.globalReset && ModernNormalize}

  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');


  body {
    font-family: 'Roboto', sans-serif;
    margin: 0;
    color: ${(props) => props.theme.colors.text};
    background: ${(props) => props.theme.colors.background};
  }

  p {
    font-weight: ${(props) => props.theme.fontWeights.normal};
    margin: 0;
    padding: 0;
  }

  h1, h2, h3, h4, h5, h5, h6 {
    font-family: 'Roboto', sans-serif;
    margin: 0;
    padding: 0;
  }

  button, input, textarea, select {
    outline: none;
    font-family: 'Roboto', sans-serif;
  }
`;
