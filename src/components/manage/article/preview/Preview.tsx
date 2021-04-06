import { TTab } from "~/components/manage/article/Articles";
import { IArticle } from "~/interfaces";
import React, { useCallback, useEffect } from "react";
import styled from "styled-components";

import Content from "./Content";
import Header from "./Header";

const StyledPreview = styled.div`
  --header-height: 7rem;
  order: 2;
  width: 70%;
  background-color: white;
  height: var(--articles-container-height);
  @media (max-width: 800px) {
    width: 60%;
  }
  @media (max-width: 600px) {
    width: 100%;
  }
`;

type Props = {
  tab: TTab;
  focusedArticle: IArticle;
};

const Preview = (props: Props) => {
  const { tab, focusedArticle } = props;

  return (
    <StyledPreview>
      <Header tab={tab} focusedArticle={focusedArticle} />
      <Content content={focusedArticle.content} />
    </StyledPreview>
  );
};

export default Preview;
