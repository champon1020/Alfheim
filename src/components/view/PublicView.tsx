import Bar from "~/components/common/Bar";
import Footer from "~/components/common/Footer";
import Header from "~/components/common/Header";
import ImageHeader from "~/components/common/ImageHeader";
import ErrorBoundary from "~/components/error/ErrorBoundary";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import styled, { keyframes } from "styled-components";

import ArticleView from "./ArticleView";
import CategoryListView from "./CategoryListView";
import HomeView from "./HomeView";

const fadeIn = keyframes`
  from {
    opacity: 0
  }
  to {
    opacity: 1
  }
`;

const Container = styled.div`
  min-height: 95vh;
  animation: ${fadeIn} 1s ease 0s;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: var(--container-width);
  margin: 4rem auto;
  @media (max-width: 1000px) {
    flex-direction: column;
    width: 100%;
  }
`;

export type PathParams = {
  sortedId?: string;
  title?: string;
  category?: string;
  year?: string;
  month?: string;
};

export type IRouteProps = RouteComponentProps<PathParams>;

type Props = IRouteProps;

const PublicView = (props: Props) => {
  const selectView = React.useCallback(() => {
    const path = window.location.pathname;
    if (path.startsWith("/article")) return <ArticleView {...props} />;
    if (path.startsWith("/category")) return <CategoryListView />;
    return <HomeView {...props} />;
  }, [props]);

  return (
    <ErrorBoundary>
      <Container>
        <header>
          <Header />
          <ImageHeader />
        </header>
        <main>
          <Bar />
          <Wrapper>{selectView()}</Wrapper>
        </main>
        <footer>
          <Footer />
        </footer>
      </Container>
    </ErrorBoundary>
  );
};

export default PublicView;
