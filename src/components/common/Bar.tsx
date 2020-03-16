import * as React from "react";
import styled from "styled-components";
import BarItem from "./BarItem";
import TwitterIcon from "../../assets/images/twitter.svg";
import QiitaIcon from "../../assets/images/qiita.png";
import WantedlyIcon from "../../assets/images/wantedly.svg";
import LinkedinIcon from "../../assets/images/linkedin.png";
import GithubIcon from "../../assets/images/github.png";
import Accounts from "private/accounts.json";

const BarStyled = styled.div`
  background-color: var(--base-color);
  border-bottom: solid 1px rgb(197, 197, 197);
  text-align: center;
  position: relative;
  padding: 20px 100px;
  @media (max-width: 800px) {
    padding: 20px 0;
  }
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
          href={Accounts.twitter} />
        <BarItem 
          icon={LinkedinIcon} 
          href={Accounts.linkedin}
          background="var(--base-color)" />
        <BarItem 
          icon={GithubIcon} 
          href={Accounts.github}/>
        <BarItem 
          icon={WantedlyIcon} 
          href={Accounts.wantedly} />
        <BarItem 
          icon={QiitaIcon}
          href={Accounts.qiita} />
      </SnsLinkListStyled>
    </BarStyled>
  );
};

export default Bar;