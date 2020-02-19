import * as React from "react";
import styled from "styled-components";

const FooterStyled = styled.div`
  padding: 50px 0;
  width: 100%;
  background-color: var(--base-color);
  text-align: center;
`;

const Footer = () => {
  return(
    <FooterStyled>
        copyright champon
    </FooterStyled>
  );
};

export default Footer;