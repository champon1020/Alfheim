import * as React from "react";
import Article from "../article/Article";
import SideBar from "../common/SideBar";
import Page from "../common/Page";
import { IRouteProps } from "./PublicView";
import styled from "styled-components";

const MainContainer = styled.div`
  order: 1;
  width: 78%;
  margin-right: 10px;
`;

const SubContainer = styled.div`
  order: 2;
  width: 22%;
  margin-left: 10px;
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
        <Page />
      </MainContainer>
      <SubContainer>
        <SideBar />
      </SubContainer>
    </>
  );
};

export default ArticleView;