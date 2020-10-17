import * as React from "react";
import styled from "styled-components";

const PageStyled = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 0 3%;
`;

const PageCurrentStyled = styled.li<{ current: string | number | boolean }>`
  display: ${({ current }) => `${!current ? "hidden" : ""}`};
  font-size: 2.8rem;
  width: 20%;
  text-align: center;
`;

const PageElementStyled = styled.li`
  font-size: 2.4rem;
  text-align: center;
  width: 40%;
`;

const PageElementText = styled.div<{ hidden: boolean }>`
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
  hiddenPrev: boolean;
  hiddenNext: boolean;
  prevText: string;
  nextText: string;
  prevCallback: () => void;
  nextCallback: () => void;
};

const Page = (props: Props) => {
  const {
    current,
    hiddenPrev,
    hiddenNext,
    prevText,
    nextText,
    prevCallback,
    nextCallback,
  } = props;

  return (
    <PageStyled>
      <PageElementStyled>
        <PageElementText hidden={hiddenPrev} onClick={prevCallback}>
          {prevText}
        </PageElementText>
      </PageElementStyled>
      <PageCurrentStyled current={current}>{current}</PageCurrentStyled>
      <PageElementStyled>
        <PageElementText hidden={hiddenNext} onClick={nextCallback}>
          {nextText}
        </PageElementText>
      </PageElementStyled>
    </PageStyled>
  );
};

export default Page;
