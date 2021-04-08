import * as React from "react";
import styled from "styled-components";

const StyledPageBox = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 0 3%;
`;

const StyledCurrentPage = styled.li<{ current: string | number | boolean }>`
  display: ${({ current }) => `${!current ? "hidden" : ""}`};
  font-size: 2.8rem;
  width: 20%;
  text-align: center;
`;

const StyledPage = styled.li`
  font-size: 2.4rem;
  text-align: center;
  width: 40%;
`;

const StyledText = styled.div<{ hidden: boolean }>`
  display: ${({ hidden }) => `${hidden ? "none" : "inline-block"}`};
  font-size: 2.4rem;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  cursor: pointer;
  &:hover {
    opacity: 0.6;
  }
`;

type Props = {
  current: number;
  isPrev: boolean;
  isNext: boolean;
  prevCallback: () => void;
  nextCallback: () => void;
};

const Page = (props: Props) => {
  const { current, isPrev, isNext, prevCallback, nextCallback } = props;

  return (
    <StyledPageBox>
      <StyledPage>
        <StyledText hidden={!isPrev} onClick={prevCallback}>
          {"Prev"}
        </StyledText>
      </StyledPage>
      <StyledCurrentPage current={current}>{current}</StyledCurrentPage>
      <StyledPage>
        <StyledText hidden={!isNext} onClick={nextCallback}>
          {"Next"}
        </StyledText>
      </StyledPage>
    </StyledPageBox>
  );
};

export default Page;
