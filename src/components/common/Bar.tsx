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
  padding: 0;
  margin: 0;
`;

const Bar = () => {
  return(
    <BarStyled>
      <SnsLinkListStyled>
        <BarItem icon={TwitterIcon} />
        <BarItem icon={LinkedinIcon} background="var(--base-color)" />
        <BarItem icon={WantedlyIcon} />
        <BarItem icon={QiitaIcon} />
      </SnsLinkListStyled>
    </BarStyled>
  );
};

export default Bar;