import GithubIcon from "~/assets/images/accounts/github.png";
import LinkedinIcon from "~/assets/images/accounts/linkedin.png";
import TwitterIcon from "~/assets/images/accounts/twitter.svg";
import { Config } from "~/config";
import React from "react";
import styled from "styled-components";

import BarItem from "./BarItem";

const StyledBar = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: center;
  list-style: none;
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

const Bar = () => {
  return (
    <StyledBar>
      <BarItem icon={TwitterIcon} href={Config.twitterUrl} num={1} />
      <BarItem
        icon={LinkedinIcon}
        href={Config.linkedinUrl}
        background="var(--base-color)"
        num={2}
      />
      <BarItem icon={GithubIcon} href={Config.githubUrl} num={3} />
    </StyledBar>
  );
};

export default Bar;
