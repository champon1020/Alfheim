import { formatDateStr } from "~/util/util";
import React from "react";
import styled from "styled-components";

const StyledDate = styled.div`
  display: inline-block;
  margin-top: 2%;
  color: white;
  background-color: var(--base-color);
  font-size: 2rem;
  & p {
    padding: 0 10px;
  }
  @media (max-width: 500px) {
    font-size: 1.6rem;
  }
`;

const Date = (props: { date: string }) => {
  const { date } = props;

  return (
    <StyledDate>
      <p>{formatDateStr(date)}</p>
    </StyledDate>
  );
};

export default Date;
