import React, { useCallback, useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

import Icon from "./Icon";
import Menu from "./Menu";
import Nav from "./Nav";
import Title from "./Title";

const StyledHeader = styled.div`
  height: 6rem;
  background-color: var(--base-color);
  position: relative;
`;

type Props = {
  onResizeHandler?: () => void;
};

const Header = (props: Props) => {
  const { onResizeHandler } = props;
  const [showMenu, setShowMenu] = useState(false);
  const [isMenuOpened, setMenuOpened] = useState(false);

  const toggleMenu = useCallback(() => {
    setMenuOpened(!isMenuOpened);
  }, [isMenuOpened]);

  // When the window is resized,
  // it's toggled that menu icon is active or not.
  useEffect(() => {
    if (window.innerWidth <= 800) {
      setShowMenu(true);
    }

    window.onresize = () => {
      window.innerWidth <= 800 ? setShowMenu(true) : setShowMenu(false);
      if (onResizeHandler !== undefined) {
        onResizeHandler();
      }
    };
  }, [onResizeHandler]);

  return (
    <StyledHeader>
      <Icon />
      <Title />
      <Nav showMenu={showMenu} toggleMenu={toggleMenu} />
      <Menu isMenuOpened={isMenuOpened} />
    </StyledHeader>
  );
};

export default Header;
