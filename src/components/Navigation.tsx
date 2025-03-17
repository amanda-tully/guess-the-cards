import { NavLink } from "react-router";
import styled from "styled-components";
import { useState } from "react";

const MenuIcon = styled.div`
  display: none;
  flex-direction: column;
  cursor: pointer;
  margin-left: auto;

  @media (max-width: 768px) {
    display: flex;
  }

  span {
    height: 3px;
    width: 25px;
    background: ${({ theme }) => theme.colors.primary.base};
    margin-bottom: 4px;
    border-radius: 2px;
    transition: all 0.3s ease;
  }
`;

const NavBar = styled.nav`
  border-bottom: 2px solid ${({ theme }) => theme.colors.primary.base};
  padding: ${({ theme }) => theme.spacing.m};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const NavList = styled.ul<{ $isOpen: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.l};
  list-style: none;
  margin: 0;
  padding: 0;

  @media (max-width: 768px) {
    flex-direction: column;
    position: fixed;
    top: 0;
    right: ${({ $isOpen }) => ($isOpen ? "0" : "-100%")};
    width: 250px;
    height: 100vh;
    background: white;
    padding: 50px 20px;
    box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
    z-index: 999;
    align-items: flex-start;
    justify-content: flex-start;
    transition: right 0.3s ease;
  }
`;

// Add a background overlay when menu is open
const Overlay = styled.div<{ $isOpen: boolean }>`
  display: ${({ $isOpen }) => ($isOpen ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 998;
`;

const NavItem = styled.li`
  font-size: ${({ theme }) => theme.fontSizes.s};
  position: relative;

  @media (max-width: 768px) {
    margin-bottom: 20px;
    width: 100%;
  }
`;

const Link = styled(NavLink)`
  text-decoration: none;
  color: ${({ theme }) => theme.colors.tertiary.dark};
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};
  padding: ${({ theme }) => theme.spacing.s} ${({ theme }) => theme.spacing.m};
  border-radius: ${({ theme }) => theme.borderRadius.m};
  transition: all 0.2s ease;
  position: relative;

  &:hover {
    background-color: rgba(69, 134, 160, 0.08);
    color: ${({ theme }) => theme.colors.tertiary.base};
  }

  &.active {
    color: ${({ theme }) => theme.colors.primary.dark};
    background-color: rgba(230, 57, 70, 0.1);

    /* bottom indicator */
    &:after {
      content: "";
      position: absolute;
      bottom: -4px;
      left: 0;
      width: 100%;
      height: 3px;
      background-color: ${({ theme }) => theme.colors.primary.base};
      border-radius: ${({ theme }) => theme.borderRadius.s};

      @media (max-width: 768px) {
        bottom: 0;
      }
    }
  }

  @media (max-width: 768px) {
    display: block;
    width: 100%;
  }
`;

const Logo = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.m};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.primary.base};
  margin-right: auto;
  letter-spacing: 0.5px;
`;

const NavContainer = styled.div`
  display: flex;
  align-items: center;
  max-width: 80vw;
  margin: 0 auto;

  @media (max-width: 768px) {
    justify-content: space-between;
  }
`;

const CloseButton = styled.button`
  display: none;
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.tertiary.dark};

  @media (max-width: 768px) {
    display: block;
  }
`;

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <NavBar>
      <NavContainer>
        <Logo>GtC</Logo>

        <MenuIcon onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </MenuIcon>

        <Overlay $isOpen={isMenuOpen} onClick={closeMenu} />

        <NavList $isOpen={isMenuOpen}>
          <CloseButton onClick={closeMenu}>&times;</CloseButton>
          <NavItem>
            <Link to="/" onClick={closeMenu}>
              Game
            </Link>
          </NavItem>
          <NavItem>
            <Link to="/leaderboard" onClick={closeMenu}>
              Leaderboard
            </Link>
          </NavItem>
          <NavItem>
            <Link to="/rules" onClick={closeMenu}>
              Rules
            </Link>
          </NavItem>
        </NavList>
      </NavContainer>
    </NavBar>
  );
};
