import * as React from "react";
import Article from "../article/Article";
import SideBar from "../common/SideBar";
import Page from "../common/Page";
import { IRouteProps } from "./PublicView";
import styled from "styled-components";

const MainContainer = styled.div`
  order: 1;
  width: calc(var(--container-width) / 4 * 3);
  margin-right: 20px;
  @media (max-width: 1000px) {
    width: 800px;
    margin: 0 auto;
  }
  @media (max-width: 800px) {
    width: 80%;
    margin: 0 auto;
  }
`;

const SubContainer = styled.div`
  order: 2;
  margin: 0;
  width: calc(var(--container-width) / 4);
  @media (max-width: 1000px) {
    width: calc(var(--container-width) / 2.5);
    margin: 10% auto 0 auto;
  }
  @media (max-width: 800px) {
    width: 78%;
  }
`;

type Props = IRouteProps;

const ArticleView: React.FC<Props> = (props) => {
  const validArticleId = () => {
    const articleId = props.match.params.articleId;
    return articleId === undefined ? -1 : Number.parseInt(articleId);
  };

  return(
    <>
      <MainContainer>
        <Article articleId={validArticleId()}/>
        <Page backText="backArticleTitle" nextText="nextArticleTitle" />
      </MainContainer>
      <SubContainer>
        <SideBar />
      </SubContainer>
    </>
  );
};

export default ArticleView;