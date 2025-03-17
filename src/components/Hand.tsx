import styled from "styled-components";

interface HandProps {
  card: string;
}

const CardImage = styled.img`
  @media (max-width: 768px) {
    height: 120px;
    width: 80px;
  }

  height: 150px;
  width: 100px;
`;

export const Hand = ({ card }: HandProps) => {
  const imagePath = `./src/assets/cards/${card}.png`;

  return <CardImage src={imagePath} alt={`Card ${card}`} />;
};
