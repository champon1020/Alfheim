import * as React from "react";
import styled from "styled-components";
import BarItem from "./BarItem";
import TwitterIcon from "../../assets/images/twitter.svg";
import QiitaIcon from "../../assets/images/qiita.png";
import WantedlyIcon from "../../assets/images/wantedly.svg";
import LinkedinIcon from "../../assets/images/linkedin.png";

const BarStyled = styled.div`
  background-color: var(--base-color);
  border-bottom: solid 1px rgb(197, 197, 197);
  text-align: center;
  position: relative;
  padding: 20px 100px;
`;

const SnsLinkListStyled = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: center;
  list-style: none;
`;

const Bar = () => {
  return(
    <BarStyled>
      <SnsLinkListStyled>
        <BarItem 
          icon={TwitterIcon} 
          href="https://twitter.com/nagatelu1020" />
        <BarItem 
          icon={LinkedinIcon} 
          href="https://www.linkedin.com/in/champon1020/" 
          background="var(--base-color)" />
        <BarItem 
          icon={WantedlyIcon} 
          href="https://www.wantedly.com/users/93296474" />
        <BarItem 
          icon={QiitaIcon}
          href="https://qiita.com/nagatelu1020" />
      </SnsLinkListStyled>
    </BarStyled>
  );
};

export default Bar;