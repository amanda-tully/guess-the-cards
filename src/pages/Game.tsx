import { Link } from "react-router";
import { Timer } from "../components/Timer.tsx";
import { useTimer } from "../hooks/useTimer.ts";
import { Button } from "../components/Button.tsx";
import { usePoker } from "../hooks/usePoker.ts";
import { useFetchMessage } from "../hooks/useFetchMessage.ts";
import { RandomMessage } from "../components/RandomMessage.tsx";
import styled from "styled-components";
import { Hand } from "../components/Hand.tsx";
import { HandRankings } from "../components/HandRankings.tsx";
import { useEffect, useState } from "react";

const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const WelcomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.s};
`;

const HandContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.s};

  @media (max-width: 768px) {
    width: 100%;
    display: grid;
    grid-template-rows: auto auto;
    gap: ${({ theme }) => theme.spacing.s};

    /* Top row with 3 cards */
    & > :nth-child(-n + 3) {
      grid-row: 1;
    }

    & > :nth-child(1) {
      grid-column: 1;
    }
    & > :nth-child(2) {
      grid-column: 2;
    }
    & > :nth-child(3) {
      grid-column: 3;
    }

    /* Bottom row with 2 cards, centered */
    & > :nth-child(4) {
      grid-row: 2;
      grid-column: 1 / span 2;
      justify-self: center;
      margin-right: ${({ theme }) => theme.spacing.xs};
    }

    & > :nth-child(5) {
      grid-row: 2;
      grid-column: 2 / span 2;
      justify-self: center;
      margin-left: ${({ theme }) => theme.spacing.xs};
    }
  }
`;

const LinkWrapper = styled(Link)`
  color: ${({ theme }) => theme.colors.accent3.base};
`;

const RandomMessageContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${({ theme }) => theme.spacing.m};
`;

const Game = () => {
  const [showTimeAdded, setShowTimeAdded] = useState(false);

  const { startTimer, time, isActive, addTime, isGameOver, resetTimer } =
    useTimer();

  const {
    dealNewHand,
    currentHand,
    options,
    checkAnswer,
    resetGame,
    totalCorrect,
    endGame,
  } = usePoker();

  const { message, fetchNewMessage, setMessage } = useFetchMessage();

  const startGame = () => {
    dealNewHand();
    startTimer();
  };

  const restartGame = () => {
    resetGame();
    resetTimer();
    startTimer();
    setMessage("");
  };

  const handleCheckAnswer = async (selectedRanking: string) => {
    const isCorrect = checkAnswer(selectedRanking);

    dealNewHand();
    await fetchNewMessage();

    if (isCorrect) {
      addTime(5);

      // Toggle the timeAdded indicator
      setShowTimeAdded(false);
      setTimeout(() => {
        setShowTimeAdded(true);

        setTimeout(() => {
          setShowTimeAdded(false);
        }, 1500);
      }, 10);
    }
  };

  useEffect(() => {
    if (isGameOver) {
      endGame();
    }
  }, [isGameOver, endGame]);

  return (
    <GameContainer>
      {isGameOver && (
        <WelcomeContainer>
          <h2>Game Over</h2>
          <p>
            Your final score is {totalCorrect}. Click the Start Game button to
            play again or check out the{" "}
            <LinkWrapper to="/leaderboard">Leaderboard</LinkWrapper>
          </p>
          <div>
            <Button onClick={restartGame}>Start Game</Button>
          </div>
        </WelcomeContainer>
      )}

      {!isActive && !isGameOver && (
        <WelcomeContainer>
          <h2>Welcome to Guess the Cards</h2>
          <p>
            Click the Start Game button to begin or check out the{" "}
            <LinkWrapper to="/leaderboard">Leaderboard</LinkWrapper> or{" "}
            <LinkWrapper to="/rules">Rules</LinkWrapper>
          </p>
          <div>
            <Button onClick={startGame}>Start Game</Button>
          </div>
        </WelcomeContainer>
      )}

      {isActive && !isGameOver && (
        <>
          <Timer time={time} showTimeAdded={showTimeAdded} />

          <HandContainer>
            {currentHand.map((card) => (
              <Hand key={card} card={card} />
            ))}
          </HandContainer>

          <HandRankings
            pokerRankings={options}
            onSelectRanking={handleCheckAnswer}
          />

          <RandomMessageContainer>
            <RandomMessage message={message} />
          </RandomMessageContainer>
        </>
      )}
    </GameContainer>
  );
};

export default Game;
