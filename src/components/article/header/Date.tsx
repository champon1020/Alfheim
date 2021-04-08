import { formatDateStr } from "~/util/util";
import React from "react";
import styled from "styled-components";

const StyledDate = styled.div`
  display: inline-block;
  font-size: 2rem;
  border-bottom: solid thin gray;
  margin-left: 8%;
  padding: 0 5px;
  @media (max-width: 500px) {
    font-size: 1.8rem;
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
