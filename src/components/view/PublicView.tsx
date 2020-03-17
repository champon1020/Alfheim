import * as React from "react";
import styled from "styled-components";
import Header from "../common/Header";
import ImageHeader from "../common/ImageHeader";
import Footer from "../common/Footer";
import { RouteComponentProps } from "react-router-dom";
import Bar from "../common/Bar";
import HomeView from "./HomeView";
import ArticleView from "./ArticleView";
import CategoryListView from "./CategoryListView";

const Container = styled.div`
  min-height: 95vh;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: var(--container-width);
  margin: 40px auto;
  @media (max-width: 1000px) {
    flex-direction: column;
    width: 100%;
  }
`;

export type PathParams = {
  articleId?: string;
  title?: string;
  category?: string;
  year?: string;
  month?: string;
}

export type IRouteProps = RouteComponentProps<PathParams>;

type Props = IRouteProps;

const PublicView = (props: Props) => {
  const selectView = React.useCallback(
    () => {
      const path = window.location.pathname;
      if(path.startsWith("/article")) return <ArticleView {...props}/>;
      if(path.startsWith("/category")) return <CategoryListView />;
      return <HomeView {...props} />;
    },
    [props],
  );

  return (
    <Container>
      <header>
        <Header />
        <ImageHeader />
      </header>
      <main>
        <Bar />
        <Wrapper>
          {selectView()}
        </Wrapper>
      </main>
      <footer>
        <Footer />
      </footer>
    </Container>
  );
};

export default PublicView;