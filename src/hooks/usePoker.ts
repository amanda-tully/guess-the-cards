import { useState, useCallback, useEffect } from "react";
import { Hand } from "pokersolver";

interface LeaderboardEntry {
  total_correct_answers: number;
  date: string;
}

interface PokerState {
  currentHand: string[];
  options: string[];
  correctAnswer: string;
  totalCorrect: number;
  gameOver: boolean;
}

interface UsePokerReturn {
  currentHand: string[];
  options: string[];
  totalCorrect: number;
  gameOver: boolean;
  dealNewHand: () => void;
  checkAnswer: (selectedRanking: string) => boolean;
  resetGame: () => void;
  endGame: () => void;
}

const SUITS = ["h", "d", "s", "c"];
const VALUES = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "T",
  "J",
  "Q",
  "K",
  "A",
];

const POKER_RANKINGS = [
  "Straight Flush",
  "Four of a Kind",
  "Full House",
  "Flush",
  "Straight",
  "Three of a Kind",
  "Two Pair",
  "Pair",
  "High Card",
];

/**
 * Custom hook to manage the poker game state.
 * The game will start with a new hand of 5 cards.
 * The player must choose the correct hand ranking from 3 options.
 *
 * @returns {UsePokerReturn}
 *
 */
export const usePoker = (): UsePokerReturn => {
  const [pokerState, setPokerState] = useState<PokerState>({
    currentHand: [],
    options: [],
    correctAnswer: "",
    totalCorrect: 0,
    gameOver: false,
  });

  // Create a full deck of cards
  const createDeck = useCallback((): string[] => {
    const deck: string[] = [];
    for (const suit of SUITS) {
      for (const value of VALUES) {
        deck.push(value + suit);
      }
    }
    return deck;
  }, []);

  const shuffleDeck = useCallback((deck: string[]): string[] => {
    const shuffled = [...deck];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }, []);

  const generateOptions = useCallback(
    (correctRanking: string): string[] => {
      const otherRankings = POKER_RANKINGS.filter(
        (ranking) => ranking !== correctRanking,
      );
      const shuffledOthers = shuffleDeck(otherRankings);
      const twoRandomRankings = shuffledOthers.slice(0, 2);

      // Add the correct answer and shuffle the options
      const allOptions = [...twoRandomRankings, correctRanking];
      return shuffleDeck(allOptions);
    },
    [shuffleDeck],
  );

  const dealNewHand = useCallback(() => {
    const deck = shuffleDeck(createDeck());
    const newHand = deck.slice(0, 5);

    // Use pokersolver to evaluate the hand
    const hand = Hand.solve(newHand);
    const correctRanking = hand.name;

    // Generate 3 options (including the correct one)
    const options = generateOptions(correctRanking);

    setPokerState((prev) => ({
      ...prev,
      currentHand: newHand,
      options,
      correctAnswer: correctRanking,
    }));
  }, [createDeck, shuffleDeck, generateOptions]);

  const updateLeaderboard = useCallback((totalCorrect: number) => {
    const newEntry: LeaderboardEntry = {
      total_correct_answers: totalCorrect,
      date: new Date().toISOString(),
    };

    // Get current leaderboard from localStorage
    let currentLeaderboard: LeaderboardEntry[] = [];
    try {
      const savedLeaderboard = localStorage.getItem("pokerLeaderboard");
      if (savedLeaderboard) {
        currentLeaderboard = JSON.parse(savedLeaderboard);
      }
    } catch (e) {
      console.error("Failed to parse leaderboard from localStorage", e);
    }

    // Update the leaderboard
    const updatedLeaderboard = [...currentLeaderboard, newEntry];

    // Sort by score (highest first) and then by date (newest first)
    updatedLeaderboard.sort((a, b) => {
      if (b.total_correct_answers !== a.total_correct_answers) {
        return b.total_correct_answers - a.total_correct_answers;
      }
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    // Save to localStorage
    localStorage.setItem(
      "pokerLeaderboard",
      JSON.stringify(updatedLeaderboard),
    );
  }, []);

  const checkAnswer = useCallback(
    (selectedRanking: string): boolean => {
      const isCorrect = selectedRanking === pokerState.correctAnswer;

      setPokerState((prev) => ({
        ...prev,
        totalCorrect: prev.totalCorrect + (isCorrect ? 1 : 0),
      }));

      return isCorrect;
    },
    [pokerState.correctAnswer],
  );

  const endGame = useCallback(() => {
    updateLeaderboard(pokerState.totalCorrect);

    setPokerState((prev) => ({
      ...prev,
      gameOver: true,
    }));
  }, [pokerState.totalCorrect, updateLeaderboard]);

  const resetGame = useCallback(() => {
    setPokerState({
      currentHand: [],
      options: [],
      correctAnswer: "",
      totalCorrect: 0,
      gameOver: false,
    });

    dealNewHand();
  }, [dealNewHand]);

  // Deal a hand when the game starts
  useEffect(() => {
    if (pokerState.currentHand.length === 0 && !pokerState.gameOver) {
      dealNewHand();
    }
  }, [dealNewHand, pokerState.currentHand.length, pokerState.gameOver]);

  return {
    currentHand: pokerState.currentHand,
    options: pokerState.options,
    totalCorrect: pokerState.totalCorrect,
    gameOver: pokerState.gameOver,
    dealNewHand,
    checkAnswer,
    resetGame,
    endGame,
  };
};
