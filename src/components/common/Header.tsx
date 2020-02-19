import * as React from "react";
import LinkWord from "./LinkWord";
import styled from "styled-components";

const HeaderStyled = styled.div`
  height: 60px;
  background-color: var(--base-color);
  position: relative;
  box-shadow: 2px 2px 4px white;
  & a {
    text-decoration: none;
    color: var(--base-font-color);
  }
  & a:hover {
    opacity: 0.7;
  }
  & h1 {
    position: absolute;
    display: inline-block;
    top: 10px;
    left: 70px;
    font-size: 32px;
    margin: 0;
  }
`;

const NavStyled = styled.nav`
  position: absolute;
  display: inline-block;
  right: 100px;
  top: 10px;
`;

const NavListStyled = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: row;
  font-size: 28px;
  margin: 0;
  padding: 0;
  & li {
    margin: 0 25px;
  }
`;

const Header = () => {
  return(
    <HeaderStyled>
      <h1>
        <LinkWord text="Cham Cham Champon" href="/" className={undefined} id={undefined} />
      </h1>
      <NavStyled>
        <NavListStyled>
          <li>
            <LinkWord text="Category" href="/category/list" className={undefined} id={undefined} />
          </li>
          <li>
            <LinkWord text="Portfolio" href="##" className={undefined} id={undefined} />
          </li>
        </NavListStyled>
      </NavStyled>
    </HeaderStyled>
  );
};

export default Header;