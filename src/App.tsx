import { BrowserRouter, Route, Routes } from "react-router";
import Game from "./pages/Game.tsx";
import Leaderboard from "./pages/Leaderboard.tsx";
import { ThemeProvider } from "./theme/ThemeProvider.tsx";
import styled from "styled-components";
import { Navigation } from "./components/Navigation.tsx";
import Rules from "./pages/Rules.tsx";

const Container = styled.main`
  margin: ${({ theme }) => theme.spacing.xl} auto;
  width: 80vw;
  min-height: 100vh;

  @media (max-width: 768px) {
    margin: ${({ theme }) => theme.spacing.l} auto;
  }
`;

const Root = () => {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Navigation />
        <Container>
          <Routes>
            <Route path="/" element={<Game />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/rules" element={<Rules />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default Root;
