import * as React from "react";
import styled from "styled-components";

const PageStyled = styled.ul`
  margin: 40px 0;
  list-style: none;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const PageElementStyled = styled.li`
  font-size: 2.8rem;
  text-align: center;
  width: 250px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

type Props = {
  backText: string;
  nextText: string;
}

const Page = (props: Props) => {
  const { backText, nextText } = props;

  return(
    <PageStyled>
      <PageElementStyled>
        {backText}
      </PageElementStyled>
      <PageElementStyled>1</PageElementStyled>
      <PageElementStyled>
        {nextText}
      </PageElementStyled>
    </PageStyled>
  );
};

export default Page;