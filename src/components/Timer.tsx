import styled, { keyframes } from "styled-components";

interface TimerProps {
  time: number;
  showTimeAdded?: boolean;
}

const TimerContainer = styled.div`
  position: relative;
  align-self: end;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 100;
  margin-bottom: ${({ theme }) => theme.spacing.l};
`;

const TimerCircle = styled.div<{ $colorKey: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: ${({ theme, $colorKey }) =>
    $colorKey === "danger"
      ? `rgba(${theme.colors.danger}, 0.1)`
      : $colorKey === "warning"
        ? `rgba(${theme.colors.warning}, 0.1)`
        : theme.colors.tertiary.light};
  border: 4px solid
    ${({ theme, $colorKey }) =>
      $colorKey === "danger"
        ? theme.colors.danger
        : $colorKey === "warning"
          ? theme.colors.warning
          : theme.colors.tertiary.base};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    width: 80px;
    height: 80px;
  }
`;

const TimeValue = styled.div<{ $colorKey: string }>`
  font-family: ${({ theme }) => theme.fonts.default};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme, $colorKey }) =>
    $colorKey === "danger"
      ? theme.colors.danger
      : $colorKey === "warning"
        ? theme.colors.warning
        : theme.colors.tertiary.dark};

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.fontSizes.l};
  }
`;

const fadeUpAnimation = keyframes`
  0% {
    opacity: 0;
    transform: translateY(0);
  }
  20% {
    opacity: 1;
  }
  80% {
    opacity: 1;
    transform: translateY(-30px);
  }
  100% {
    opacity: 0;
    transform: translateY(-45px);
  }
`;

const TimeAddedIndicator = styled.div`
  position: absolute;
  top: 50%;
  right: -15px;
  background-color: ${({ theme }) => theme.colors.success};
  color: white;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.s}`};
  border-radius: ${({ theme }) => theme.borderRadius.s};
  animation: ${fadeUpAnimation} 1.5s ease-out forwards;
  font-size: ${({ theme }) => theme.fontSizes.m};
`;

export const Timer = ({ time, showTimeAdded }: TimerProps) => {
  // Determine color based on time remaining
  const getColorKey = () => {
    if (time <= 10) return "danger";
    if (time <= 30) return "warning";
    return "tertiary";
  };

  const colorKey = getColorKey();

  return (
    <TimerContainer>
      <TimerCircle $colorKey={colorKey}>
        <TimeValue $colorKey={colorKey}>{Math.max(0, time)}</TimeValue>
      </TimerCircle>
      {showTimeAdded && <TimeAddedIndicator>+5</TimeAddedIndicator>}
    </TimerContainer>
  );
};
