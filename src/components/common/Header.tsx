import React, { useCallback, useState, useMemo, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import MenuIcon from "../../assets/images/menu.svg";

const slideDownAnim = keyframes`
  from {
    top: -6rem;
  }
  to {
    top: 0rem;
  }
`;

const HeaderStyled = styled.div`
  height: 6rem;
  background-color: var(--base-color);
  position: relative;
  box-shadow: 2px 2px 2px var(--base-color);
`;

const BlogTitle = styled.h1`
  position: absolute;
  cursor: pointer;
  color: white;
  display: inline-block;
  left: 2%;
  line-height: 6rem;
  font-size: 2.4rem;
  animation: ${slideDownAnim} 1.7s ease 0s;
  &:hover {
    opacity: 0.7;
  }
  @media (max-width: 800px) {
    left: 5%;
  }
`;

// const BlogTitle2 = styled.a`
//   font-size: 1.8rem;
// `;

const NavStyled = styled.nav`
  position: absolute;
  display: inline-block;
  right: 2%;
  line-height: 6rem;
  animation: ${slideDownAnim} 1.7s ease 0s;
  @media (max-width: 800px) {
    top: 20%;
  }
`;

const NavListStyled = styled.ul`
  display: flex;
  flex-direction: row;
  font-size: 2.8rem;
`;

const NavListItem = styled.li`
  margin: 0 2rem;
  color: white;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
  @media (max-width: 800px) {
    margin: 1rem 20%;
    border-bottom: solid thin white;
  }
`;

const NavMenuImage = styled.img`
  width: 4rem;
  height: 4rem;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
`;

const ShowMenu = keyframes`
  from {
    height: 0vh;
  }
  to {
    height: 30vh;
  }
`;

const MenuContent = styled.ul<{hidden: boolean}>`
  position: absolute;
  right: 0;
  top: 6rem;
  width: 40%;
  height: 30vh;
  padding-top: 3%;
  display: ${({hidden}) => hidden ? "none" : "flex"};
  flex-direction: column;
  font-size: 3rem;
  text-align: center;
  background-color: var(--base-color);
  z-index: 999;
  animation: ${ShowMenu} .7s cubic-bezier(0, 0, 0.20, 1.0) 0s;
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
  onResizeHandler?: () => void;
}

const Header = (props: Props) => {
  const { onResizeHandler } = props;

  const [isMenu, setMenu] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  const toggleMenu = useCallback(() => { setOpenMenu(!openMenu); },[openMenu]);
  const handleTitleClick = useCallback(() => { window.open("/", "_self"); },[]);
  const handleCateClick = useCallback(() => { window.open("/category/list", "_self"); },[]);
  const handlePortClick = useCallback(() => { window.open("##", "_self"); },[]);

  const navigationItems = useMemo(() => (
    <>
      <NavListItem onClick={handleCateClick}>
        {"Category"}
      </NavListItem>
      {/* <NavListItem onClick={handlePortClick}>
        {"Portfolio"}
      </NavListItem> */}
    </>
  ), [handleCateClick, handlePortClick]);

  const navigation = useMemo(() => {
    if(isMenu){
      return (
        <div onClick={toggleMenu}>
          <NavMenuImage src={MenuIcon} />
        </div>
      );
    }
    return (
      <NavListStyled>
        {navigationItems}
      </NavListStyled>
    );
  }, [isMenu, toggleMenu, navigationItems]);

  useEffect(() => {
    if(window.innerWidth <= 800) setMenu(true);
    window.onresize = () => {
      if(window.innerWidth <= 800) setMenu(true);
      else setMenu(false);
      if(onResizeHandler !== undefined) onResizeHandler();
    };
  }, [onResizeHandler]);

  return(
    <HeaderStyled>
      <BlogTitle onClick={handleTitleClick}>
        {"Champon's Notebook"}
      </BlogTitle>
      <NavStyled>
        {navigation}
      </NavStyled>
      <MenuContent 
        hidden={!openMenu}>
        {navigationItems}
      </MenuContent>
    </HeaderStyled>
  );
};

export default Header;