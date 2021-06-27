import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import throttle from "lodash/throttle";
import Overlay from "../../components/Overlay/Overlay";
import { Flex } from "../../components/Flex";
import { useMatchBreakpoints } from "../../hooks";
import Logo from "./Logo";
import UserBlock from "./UserBlock";
import { NavProps } from "./types";
import { MENU_HEIGHT } from "./config";
import Avatar from "./Avatar";

const Wrapper = styled.div`
  position: relative;
  width: 100%;
`;

const StyledNav = styled.div`
  display: grid;
  grid-template-columns: 1fr 0px;
  -webkit-box-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  align-items: center;
  flex-direction: row;
  width: 100%;
  top: 0px;
  position: relative;
  border-bottom: solid 2px rgba(133, 133, 133, 0.1);
  z-index: 2;
`;

const StyledNavLeft = styled.nav<{ showMenu: boolean }>`
  top: 0;
  left: 0;
  transition: top 0.2s;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 24px;
  padding-right: 16px;
  height: ${MENU_HEIGHT}px;
  z-index: 20;
  transform: translate3d(0, 0, 0);
  width: fit-content;
  @media only screen and (max-width: 960px) {
    width: 100%
	}
`;

const StyledNavRight = styled.nav`
  display: flex;
  justify-self: flex-end;
  @media only screen and (max-width: 960px) {
    position: fixed;
    bottom: 0;
    left: 0;
    transition: bottom 0.2s;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    padding-left: 24px;
    padding-right: 16px;
    height: ${MENU_HEIGHT}px;
    border-top: solid 2px rgba(133, 133, 133, 0.1);
    background: #2A1436;
    z-index: 20;
	}
`;

const BodyWrapper = styled.div`
  position: relative;
  display: flex;
`;

const Inner = styled.div<{ isPushed: boolean; showMenu: boolean }>`
  flex-grow: 1;
  transition: margin-top 0.2s;
  transform: translate3d(0, 0, 0);
`;

const MobileOnlyOverlay = styled(Overlay)`
  position: fixed;
  height: 100%;

  ${({ theme }) => theme.mediaQueries.nav} {
    display: none;
  }
`;

const StyledNavLink = styled.div`
  display: flex;
  align-items: center;
  width: fit-content;
  font-size: 1.2rem;
  font-weight 500;
  color: #C3C5CB;
  margin: 0px 12px;
  &:hover {
    text-decoration: underline;
  }
  @media only screen and (max-width: 500px) {
    display: none;
	}
`;

const StyledNavTitle = styled.div`
  display: flex;
  align-items: center;
  width: fit-content;
  font-size: 1.2rem;
  font-weight 600;
  color: #FFFFFF;
  margin-left: 24px;
  margin-right: 12px;
`;

const StyledLinkContainer = styled.div`
  display: flex;
  @media only screen and (max-width: 960px) {
    width: 100%;
    padding: 1rem 0px 1rem 1rem;
    justify-content: flex-end;
	}
`;

const Menu: React.FC<NavProps> = ({
  account,
  login,
  logout,
  isDark,
  buy,
  toggleTheme,
  langs,
  setLang,
  currentLang,
  cakePriceUsd,
  links,
  priceLink,
  profile,
  children,
}) => {
  const { isXl } = useMatchBreakpoints();
  const isMobile = isXl === false;
  const [isPushed, setIsPushed] = useState(!isMobile);
  const [showMenu, setShowMenu] = useState(true);
  const refPrevOffset = useRef(window.pageYOffset);

  useEffect(() => {
    const handleScroll = () => {
      const currentOffset = window.pageYOffset;
      const isBottomOfPage = window.document.body.clientHeight === currentOffset + window.innerHeight;
      const isTopOfPage = currentOffset === 0;
      // Always show the menu when user reach the top
      if (isTopOfPage) {
        setShowMenu(true);
      }
      // Avoid triggering anything at the bottom because of layout shift
      else if (!isBottomOfPage) {
        if (currentOffset < refPrevOffset.current) {
          // Has scroll up
          setShowMenu(true);
        } else {
          // Has scroll down
          setShowMenu(false);
        }
      }
      refPrevOffset.current = currentOffset;
    };
    const throttledHandleScroll = throttle(handleScroll, 200);

    window.addEventListener("scroll", throttledHandleScroll);
    return () => {
      window.removeEventListener("scroll", throttledHandleScroll);
    };
  }, []);

  // Find the home link if provided
  const homeLink = links.find((link) => link.label === "Home");

  return (
    <Wrapper>
      <StyledNav>
        <StyledNavLeft showMenu={showMenu}>
          <Logo
            isPushed={isPushed}
            togglePush={() => setIsPushed((prevState: boolean) => !prevState)}
            isDark={isDark}
            href={homeLink?.href ?? "/"}
          />
          <StyledLinkContainer>
            <StyledNavTitle as="a" href={`#/swap`}>
              $GHOSTFACE
            </StyledNavTitle>
            <StyledNavLink as="a" href={`https://charts.bogged.finance/?token=0x0952ddffde60786497c7ced1f49b4a14cf527f76`}>
              Chart
            </StyledNavLink>
          </StyledLinkContainer>
        </StyledNavLeft>
        <StyledNavRight>
          <Flex>
            <UserBlock account={account} login={login} logout={logout} buy={buy}/>
            {profile && <Avatar profile={profile} />}
          </Flex>
        </StyledNavRight>
      </StyledNav>
      <BodyWrapper>
        <Inner isPushed={isPushed} showMenu={showMenu}>
          {children}
        </Inner>
      </BodyWrapper>
    </Wrapper>
  );
};

export default Menu;
