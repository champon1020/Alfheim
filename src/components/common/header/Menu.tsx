import React from "react";
import styled, { keyframes } from "styled-components";

import NavItems from "./NavItems";

const AnimShowMenu = keyframes`
  from {
    height: 0vh;
  }
  to {
    height: 20vh;
  }
`;

const MenuContent = styled.ul<{ hidden: boolean }>`
  position: absolute;
  right: 0;
  top: 6rem;
  width: 40%;
  height: 20vh;
  padding-top: 3%;
  display: ${({ hidden }) => (hidden ? "none" : "flex")};
  flex-direction: column;
  font-size: 3rem;
  text-align: center;
  background-color: var(--base-color);
  z-index: 999;
  animation: ${AnimShowMenu} 0.7s cubic-bezier(0, 0, 0.2, 1) 0s;
  @media (max-width: 600px) {
    width: 50%;
  }
  @media (max-width: 500px) {
    width: 60%;
  }
  @media (max-width: 400px) {
    width: 70%;
  }
`;

type Props = {
  isMenuOpened: boolean;
};

const Menu = (props: Props) => {
  const { isMenuOpened } = props;

  return (
    <MenuContent hidden={!isMenuOpened}>
      <NavItems />
    </MenuContent>
  );
};

export default Menu;
