import Bar from "~/components/common/Bar";
import Footer from "~/components/common/Footer";
import Header from "~/components/common/header/Header";
import ImageHeader from "~/components/common/iheader/ImageHeader";
import ErrorBoundary from "~/components/error/ErrorBoundary";
import React, { useMemo } from "react";
import { RouteComponentProps } from "react-router-dom";
import styled, { keyframes } from "styled-components";

import ArticlePage from "./ArticlePage";
import HomePage from "./HomePage";
import TagsPage from "./TagsPage";

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
  id?: string;
  title?: string;
  tag?: string;
  year?: string;
  month?: string;
};

export type IRouteProps = RouteComponentProps<PathParams>;

type Props = IRouteProps;

const PublicPage = (props: Props) => {
  const view = useMemo(() => {
    const path = window.location.pathname;
    if (path.startsWith("/article")) {
      return <ArticlePage {...props} />;
    }
    if (path.startsWith("/tag")) {
      return <TagsPage />;
    }
    return <HomePage {...props} />;
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
          <Wrapper>{view}</Wrapper>
        </main>
        <footer>
          <Footer />
        </footer>
      </Container>
    </ErrorBoundary>
  );
};

export default PublicPage;
