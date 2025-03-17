import { useState, useCallback, Dispatch, SetStateAction } from "react";

interface UseFetchMessageReturn {
  message: string;
  fetchNewMessage: () => Promise<void>;
  setMessage: Dispatch<SetStateAction<string>>;
}

/**
 * Custom hook to fetch a random word and make a sentence around it
 *
 * @returns {UseFetchMessageReturn}
 */
export const useFetchMessage = (): UseFetchMessageReturn => {
  const [message, setMessage] = useState<string>("");

  const fetchNewMessage = useCallback(async (): Promise<void> => {
    try {
      const endpoint = "https://api.api-ninjas.com/v1/randomword";

      // @TODO: Hide this in production with an env variable
      const headers = {
        "X-Api-Key": "aDPsk5WkrB+mqwI5Szwcbw==M7gifpLPaZvt8oPq",
      };

      const response = await fetch(endpoint, { headers });

      if (!response.ok) {
        throw new Error(
          `Failed to fetch: ${response.status} ${response.statusText}`,
        );
      }

      const data = await response.json();

      if (!data || !data.word) {
        throw new Error("Invalid response format from API");
      }

      const word = data.word?.[0];
      console.log(word);

      setMessage(`That was ${word.toUpperCase()}!`);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setMessage("Failed to get a witty message. Try again?");
    }
  }, []);

  return {
    message,
    setMessage,
    fetchNewMessage,
  };
};
