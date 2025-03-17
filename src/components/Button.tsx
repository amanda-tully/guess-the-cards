import { ButtonHTMLAttributes } from "react";
import styled from "styled-components";

type ButtonType = "filled" | "text";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonType?: ButtonType;
  disabled?: boolean;
}

const StyledButton = styled.button<{ $buttonType: ButtonType }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: ${({ theme }) => theme.fonts.default};
  font-size: ${({ theme }) => theme.fontSizes.s};
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};
  padding: ${({ theme }) => theme.spacing.s} ${({ theme }) => theme.spacing.m};
  border-radius: ${({ theme }) => theme.borderRadius.m};
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  /* Filled Button Styling */
  ${({ $buttonType, theme }) =>
    $buttonType === "filled" &&
    `
    background-color: ${theme.colors.primary.base};
    color: white;
    border: 2px solid ${theme.colors.primary.base};
    
    &:hover:not(:disabled) {
      background-color: ${theme.colors.primary.dark};
      border-color: ${theme.colors.primary.dark};
    }
    
    &:active:not(:disabled) {
      transform: translateY(1px);
    }
  `}

  /* Text Button Styling */
  ${({ $buttonType, theme }) =>
    $buttonType === "text" &&
    `
    background-color: transparent;
    color: ${theme.colors.primary.base};
    border: 2px solid ${theme.colors.primary.base};
    
    &:hover:not(:disabled) {
      background-color: rgba(230, 57, 70, 0.1);
      color: ${theme.colors.primary.dark};
    }
    
    &:active:not(:disabled) {
      transform: translateY(1px);
    }
  `}
  

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
    ${({ $buttonType, theme }) =>
      $buttonType === "filled" &&
      `
      background-color: ${theme.colors.border};
      border-color: ${theme.colors.border};
      color: ${theme.colors.text};
    `}

    ${({ $buttonType, theme }) =>
      $buttonType === "text" &&
      `
      color: ${theme.colors.text};
    `}
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px ${({ theme }) => `${theme.colors.primary.light}80`};
  }
`;

export const Button = ({
  buttonType = "filled",
  disabled = false,
  ...rest
}: ButtonProps) => (
  <StyledButton $buttonType={buttonType} disabled={disabled} {...rest}>
    {rest.children}
  </StyledButton>
);
