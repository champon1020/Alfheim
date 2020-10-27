import * as React from "react";
import styled from "styled-components";

const StyledPageBox = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 3%;
`;

const StyledPage = styled.li`
  font-size: 2.4rem;
  text-align: center;
  width: 40%;
`;

const StyledText = styled.div`
  display: inline-block;
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
  prevText: string;
  nextText: string;
  prevCallback: () => void;
  nextCallback: () => void;
};

const Page = (props: Props) => {
  const { prevText, nextText, prevCallback, nextCallback } = props;

  return (
    <StyledPageBox>
      <StyledPage>
        <StyledText onClick={prevCallback}>{prevText}</StyledText>
      </StyledPage>
      <StyledPage>
        <StyledText onClick={nextCallback}>{nextText}</StyledText>
      </StyledPage>
    </StyledPageBox>
  );
};

export default Page;
