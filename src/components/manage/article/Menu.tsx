import MenuIcon from "~/assets/images/icons/menu.svg";
import React from "react";
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
  background-color: var(--manage-base-color);
  &:hover {
    opacity: 0.6;
  }
`;

const StyledIcon = styled.img`
  width: 60%;
  margin-top: 1.2rem;
`;

type Props = {
  menu: boolean;
  toggleMenu: () => void;
};

const Menu = (props: Props) => {
  const { menu, toggleMenu } = props;

  return (
    <StyledMenu hidden={!menu} onClick={toggleMenu}>
      <StyledIcon src={MenuIcon} alt="menu" />
    </StyledMenu>
  );
};

export default Menu;
