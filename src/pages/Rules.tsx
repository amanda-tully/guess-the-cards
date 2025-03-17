import styled from "styled-components";

const Subtitle = styled.h2`
  margin: ${({ theme }) => theme.spacing.l} 0 ${({ theme }) => theme.spacing.m};
`;

const Section = styled.section`
  margin-bottom: ${({ theme }) => theme.spacing.l};
`;

const Rules = () => {
  return (
    <>
      <Section>
        <Subtitle>Goal of the Game:</Subtitle>
        <p>Answer correctly as many times as possible.</p>
      </Section>

      <Section>
        <Subtitle>Gameplay:</Subtitle>
        <ul>
          <li>Player starts with 100 seconds (time acts as life).</li>
          <li>
            Each round, 5 cards are dealt, and the time starts ticking down.
          </li>
          <li>
            Player is presented with 3 possible hand rankings (e.g., Straight
            Flush).
          </li>
          <li>Player must choose the correct hand ranking.</li>
          <li>A correct answer adds 5 seconds to the player's time.</li>
          <li>The game ends when time runs out (reaches 0).</li>
        </ul>
      </Section>

      <Section>
        <Subtitle>Game Summary:</Subtitle>
        <p>At the end of the game, a summary screen displays:</p>
        <ul>
          <li>Total correct answers.</li>
          <li>Previous attempts.</li>
        </ul>
      </Section>
    </>
  );
};

export default Rules;
