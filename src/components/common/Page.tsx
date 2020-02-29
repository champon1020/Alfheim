import * as React from "react";
import styled from "styled-components";

const PageStyled = styled.div`
  margin: 40px 0;
`;

const PageComponentsStyled = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 0;
  margin: 0;
`;

const PageElementStyled = styled.li`
  margin: 0;
  font-size: 28px;
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
      <PageComponentsStyled>
        <PageElementStyled>
          {backText}
        </PageElementStyled>
        <PageElementStyled>1</PageElementStyled>
        <PageElementStyled>
          {nextText}
        </PageElementStyled>
      </PageComponentsStyled>
    </PageStyled>
  );
};

export default Page;