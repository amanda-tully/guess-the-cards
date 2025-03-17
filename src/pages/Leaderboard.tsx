import styled from "styled-components";
import { useEffect, useState } from "react";
import { ResetLeaderboardModal } from "../components/modals";
import { Button } from "../components/Button.tsx";

interface LeaderboardEntry {
  total_correct_answers: number;
  date: string;
}

const LeaderboardContainer = styled.div`
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.l};
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.l};
  color: ${({ theme }) => theme.colors.text};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: ${({ theme }) => theme.spacing.l};
  border-radius: ${({ theme }) => theme.borderRadius.m};
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const TableHeader = styled.th`
  background-color: ${({ theme }) => theme.colors.primary.base};
  color: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => theme.spacing.m};
  text-align: left;
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: ${({ theme }) => theme.colors.navbar};
  }

  &:nth-child(odd) {
    background-color: ${({ theme }) => `${theme.colors.navbar}J4`};
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.border};
  }
`;

const TableCell = styled.td`
  padding: ${({ theme }) => theme.spacing.m};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${({ theme }) => theme.spacing.l};
`;

const EmptyMessage = styled.p`
  text-align: center;
  font-style: italic;
  color: ${({ theme }) => theme.colors.tertiary.base};
  font-size: ${({ theme }) => theme.fontSizes.m};
  margin-top: ${({ theme }) => theme.spacing.xl};
`;

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>(
    [],
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Load leaderboard data from localStorage on component mount
  useEffect(() => {
    const loadLeaderboard = () => {
      const storedData = localStorage.getItem("pokerLeaderboard");
      if (storedData) {
        try {
          const parsedData = JSON.parse(storedData);

          // Sort by score (highest first) and then by date (newest first)
          parsedData.sort((a: LeaderboardEntry, b: LeaderboardEntry) => {
            if (b.total_correct_answers !== a.total_correct_answers) {
              return b.total_correct_answers - a.total_correct_answers;
            }
            return new Date(b.date).getTime() - new Date(a.date).getTime();
          });

          setLeaderboardData(parsedData);
        } catch (error) {
          console.error("Error parsing leaderboard data:", error);
          setLeaderboardData([]);
        }
      }
    };

    loadLeaderboard();
  }, []);

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  };

  const handleResetLeaderboard = () => {
    setIsModalOpen(true);
  };

  const confirmReset = () => {
    localStorage.removeItem("pokerLeaderboard");
    setLeaderboardData([]);
    setIsModalOpen(false);
  };

  return (
    <LeaderboardContainer>
      <Title>Leaderboard</Title>

      {leaderboardData.length > 0 ? (
        <>
          <Table>
            <thead>
              <tr>
                <TableHeader>Rank</TableHeader>
                <TableHeader>Score</TableHeader>
                <TableHeader>Date</TableHeader>
              </tr>
            </thead>
            <tbody>
              {leaderboardData.map((entry: LeaderboardEntry, index: number) => {
                return (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{entry.total_correct_answers}</TableCell>
                    <TableCell>{formatDate(entry.date)}</TableCell>
                  </TableRow>
                );
              })}
            </tbody>
          </Table>
          <ButtonContainer>
            <Button onClick={handleResetLeaderboard}>Reset Leaderboard</Button>
          </ButtonContainer>

          <ResetLeaderboardModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onConfirm={confirmReset}
          />
        </>
      ) : (
        <EmptyMessage>
          No scores yet. Play a game to add your score!
        </EmptyMessage>
      )}
    </LeaderboardContainer>
  );
};

export default Leaderboard;
