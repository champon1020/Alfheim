import { Error } from "~/error";
import { IArticle } from "~/interfaces";
import React, { useCallback, useEffect } from "react";
import styled from "styled-components";

import Content from "./Content";
import Footer from "./Footer";
import Header from "./Header";

const StyledPreview = styled.div`
  --management-articles-preview-header-height: 10rem;
  --management-articles-preview-footer-height: 7rem;

  order: 2;
  width: 70%;
  background-color: white;
  height: var(--management-articles-container-height);
  border: solid thin var(--border-color);
  @media (max-width: 750px) {
    width: 60%;
  }
  @media (max-width: 600px) {
    width: 100%;
  }
`;

type Props = {
  focusedArticle?: IArticle;
  setErr: (err: Error) => void;
  setVerified: (value: boolean) => void;
};

const Preview = (props: Props) => {
  const { focusedArticle, setErr, setVerified } = props;

  return (
    <StyledPreview>
      <Header focusedArticle={focusedArticle} />
      <Content focusedArticle={focusedArticle} />
      <Footer
        setErr={setErr}
        setVerified={setVerified}
        focusedArticle={focusedArticle}
      />
    </StyledPreview>
  );
};

export default Preview;
