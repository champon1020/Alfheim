import MenuIcon from "~/assets/images/icons/menu.svg";
import React, { useMemo } from "react";
import styled, { keyframes } from "styled-components";

import NavItems from "./NavItems";

const AnimSlideDown = keyframes`
  from {
    top: -6rem;
  }
  to {
    top: 0rem;
  }
`;

const StyledNav = styled.nav`
  position: absolute;
  display: inline-block;
  right: 2%;
  line-height: 6rem;
  animation: ${AnimSlideDown} 1.7s ease 0s;
  @media (max-width: 800px) {
    line-height: 5rem;
  }
`;

const StyledMenuIcon = styled.img`
  width: 4rem;
  height: 4rem;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
`;

const StyledNavList = styled.ul`
  display: flex;
  flex-direction: row;
  font-size: 2.8rem;
`;

type Props = {
  showMenu: boolean;
  toggleMenu: () => void;
};

const Nav = (props: Props) => {
  const { showMenu, toggleMenu } = props;

  const navigation = useMemo(() => {
    // Show menu icon if the screen width is small as smartphone.
    if (showMenu) {
      return (
        <div onClick={toggleMenu}>
          <StyledMenuIcon src={MenuIcon} />
        </div>
      );
    }

    return (
      <StyledNavList>
        <NavItems />
      </StyledNavList>
    );
  }, [showMenu, toggleMenu]);

  return <StyledNav>{navigation}</StyledNav>;
};

export default Nav;
