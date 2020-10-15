import * as React from "react";
import styled from "styled-components";
import BarItem from "./BarItem";
import TwitterIcon from "~/assets/images/accounts/twitter.svg";
import LinkedinIcon from "~/assets/images/accounts/linkedin.png";
import GithubIcon from "~/assets/images/accounts/github.png";
// import QiitaIcon from "~/assets/images/accounts/qiita.png";
// import WantedlyIcon from "~/assets/images/accounts/wantedly.svg";
import Accounts from "~/private/accounts.json";

const BarStyled = styled.div`
  background-color: var(--base-color);
  border-bottom: solid 1px rgb(197, 197, 197);
  text-align: center;
  position: relative;
  padding: 20px 100px;
  overflow-x: hidden;
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
          href={Accounts.twitter}
          num={1} />
        <BarItem 
          icon={LinkedinIcon} 
          href={Accounts.linkedin}
          background="var(--base-color)"
          num={2} />
        <BarItem 
          icon={GithubIcon} 
          href={Accounts.github}
          num={3} />
        {/* <BarItem 
          icon={WantedlyIcon} 
          href={Accounts.wantedly}
          num={4} />
        <BarItem 
          icon={QiitaIcon}
          href={Accounts.qiita}
          num={5} /> */}
      </SnsLinkListStyled>
    </BarStyled>
  );
};

export default Bar;
