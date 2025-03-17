import { useState, useEffect, useCallback } from "react";

interface UseTimerReturn {
  time: number;
  isActive: boolean;
  isGameOver: boolean;
  startTimer: () => void;
  resetTimer: () => void;
  addTime: (seconds: number) => void;
}

/**
 * Custom hook to manage a countdown timer. The timer will start counting down when `startTimer` is called.
 * The timer will stop when it reaches 0.
 * The timer can be reset with `resetTimer`.
 * Additional time can be added to the timer with `addTime`.
 *
 * @param initialTime
 *
 * @returns {UseTimerReturn}
 *
 * @example
 * const { time, isActive, isGameOver, startTimer, resetTimer, addTime } = useTimer();
 *
 */
export const useTimer = (initialTime = 100): UseTimerReturn => {
  const [time, setTime] = useState<number>(initialTime);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);

  const startTimer = useCallback(() => {
    setIsActive(true);
    setIsGameOver(false);
  }, []);

  const resetTimer = useCallback(() => {
    setTime(initialTime);
    setIsActive(false);
    setIsGameOver(false);
  }, [initialTime]);

  const addTime = useCallback(
    (seconds: number) => {
      if (isActive && !isGameOver) {
        setTime((prevTime) => prevTime + seconds);
      }
    },
    [isActive, isGameOver],
  );

  useEffect(() => {
    let interval: number | null = null;

    if (isActive && !isGameOver) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          const newTime = prevTime - 1;

          if (newTime <= 0) {
            // Game over when time reaches 0
            if (interval) clearInterval(interval);
            setIsActive(false);
            setIsGameOver(true);
            return 0;
          }

          return newTime;
        });
      }, 1000);
      // if not active or game over, clear interval
    } else if (interval) {
      clearInterval(interval);
    }

    // Cleanup
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, isGameOver]);

  return {
    time,
    isActive,
    isGameOver,
    startTimer,
    resetTimer,
    addTime,
  };
};
