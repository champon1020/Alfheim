import * as React from "react";
import styled from "styled-components";

const FooterStyled = styled.div`
  width: 100%;
  height: 13vh;
  background-color: var(--base-color);
  text-align: center;
  color: white;
`;

const CopyRight = styled.h3`
  padding-top: 3rem;
  font-size: 1.4rem;
`;

const Powered = styled.h3`
  padding-top: 1rem;
  font-size: 1.4rem;
`;

const Footer = () => {
  return (
    <FooterStyled>
      <CopyRight>{"Copyright champon"}</CopyRight>
      <Powered>{"Powered by Golang & React"}</Powered>
    </FooterStyled>
  );
};

export default Footer;
