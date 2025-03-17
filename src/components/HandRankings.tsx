import styled from "styled-components";
import { Button } from "./Button.tsx";

interface HandRankingsProps {
  pokerRankings: string[];
  onSelectRanking: (ranking: string) => void;
}

const RankingsContainer = styled.section`
  display: flex;
  gap: ${({ theme }) => theme.spacing.m};
  width: 100%;
  justify-content: center;
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.colors.text};
  margin: ${({ theme }) => theme.spacing.l} 0 ${({ theme }) => theme.spacing.m}
    0;
  text-align: center;
`;

export const HandRankings = ({
  pokerRankings,
  onSelectRanking,
}: HandRankingsProps) => {
  return (
    <>
      <Title>Hand Rankings</Title>
      <RankingsContainer>
        {pokerRankings.map((ranking) => (
          <Button
            key={ranking}
            onClick={() => onSelectRanking && onSelectRanking(ranking)}
          >
            {ranking}
          </Button>
        ))}
      </RankingsContainer>
    </>
  );
};
