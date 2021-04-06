import { formatDateStr } from "~/util/util";
import React from "react";
import styled from "styled-components";

const TitleDateStyled = styled.div`
  order: 2;
  width: 45%;
  text-align: left;
  display: flex;
  flex-direction: column;
  & h2 {
    font-size: 1.5rem;
    padding-left: 1rem;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  & h3 {
    margin-top: 4%;
    font-size: 1.2rem;
    padding-left: 1rem;
  }
  @media (max-width: 600px) {
    width: 70%;
  }
`;

type Props = {
  title: string;
  date: string;
};

const TitleDate = (props: Props) => {
  const { title, date } = props;

  return (
    <TitleDateStyled>
      <h2>{title}</h2>
      <h3>{formatDateStr(date)}</h3>
    </TitleDateStyled>
  );
};

export default TitleDate;
