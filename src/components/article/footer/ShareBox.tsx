import { Config } from "~/config";
import { IArticle } from "~/type";
import React, { useCallback } from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";

import { Facebook, Linkedin, Twitter } from "./ShareButtons";

const StyledShareList = styled.ul`
  margin-bottom: 50px;
  display: flex;
  flex-direction: row;
  justify-content: start;
  width: 86%;
  margin: 0 auto;
`;

type Props = {
  article: IArticle;
};

const ShareBox = (props: Props) => {
  const { article } = props;

  const meta = useCallback(() => {
    return (
      <Helmet
        title={article.title}
        meta={[
          { property: "og:title", content: `${article.title}` },
          { property: "og:description", content: `${article.content}` },
          { property: "og:type", content: "article" },
          {
            property: "og:url",
            content: `${Config.url}/article/${article.sortedId}`,
          },
          {
            property: "og:image ",
            content: `${Config.fileUrl}/images/${article.imageHash}`,
          },
        ]}
      />
    );
  }, [article]);

  return (
    <>
      {meta()}
      <StyledShareList>
        <Twitter
          sortedId={article.sortedId}
          title={article.title}
          categories={article.categories}
        />
        <Facebook sortedId={article.sortedId} title={article.title} />
        <Linkedin sortedId={article.sortedId} title={article.title} />
      </StyledShareList>
    </>
  );
};

export default ShareBox;
