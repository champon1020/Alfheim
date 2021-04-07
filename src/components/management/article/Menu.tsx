import MenuIcon from "~/assets/images/icons/menu.svg";
import React, { forwardRef } from "react";
import styled from "styled-components";

const StyledMenu = styled.div<{ hidden: boolean }>`
  display: ${({ hidden }) => (hidden ? "none" : "")};
  position: absolute;
  left: 2.5rem;
  bottom: 2.5rem;
  width: 6rem;
  height: 6rem;
  border-radius: 5rem;
  cursor: pointer;
  z-index: 999;
  text-align: center;
  background-color: var(--management-base-color);
  &:hover {
    opacity: 0.6;
  }
`;

const StyledIcon = styled.img`
  width: 60%;
  margin-top: 1.2rem;
`;

type Props = {
  showMenu: boolean;
  openMenu: () => void;
};

const Menu = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { showMenu, openMenu } = props;

  return (
    <StyledMenu hidden={!showMenu} onClick={openMenu} ref={ref}>
      <StyledIcon src={MenuIcon} alt="menu" />
    </StyledMenu>
  );
});

export default Menu;
