import React, { useCallback } from "react";
import styled from "styled-components";
import { Config } from "../../App";
import { ArticleType } from "src/type";
import { Helmet } from "react-helmet";

const ArticleShareBoxStyled = styled.div`
  margin-bottom: 50px;
`;

const ShareListStyled = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: start;
  width: 86%;
  margin: 0 auto;
`;

const ShareListItemStyled = styled.li`
  margin-right: 2rem;
`;

const ShareDivButton = styled.div`
  &:hover {
    opacity: 0.6;
  }
`;

type Props = {
  article: ArticleType;
}

const ShareBox = (props: Props) => {
  const { article } = props;

  const hashtags = useCallback(
    () => {
      let hash = "";
      if(article.categories === null 
        || article.categories === undefined 
        || article.categories.length === 0) return hash;
      article.categories.forEach(c => hash += `#${c.name} `);
      return hash;
    },
    [article.categories],
  );

  const meta = useCallback(
    () => {
      return(<Helmet
        title={article.title}
        meta={[
          { property: "og:url", content: `${Config.host}/article/${article.sortedId}`},
          { property: "og:title", content: `${article.title}` },
          { property: "og:description", content: `${article.content}` },
          { property: "og:type", content: "article" },
          { name: "og:image ", content: `${Config.srcHost}/images/${article.imageHash}` },
        ]}
      />);
    },
    [article],
  );

  const twitterButton = useCallback(
    () => {
      return(
        <ShareListItemStyled>
          <script async src="https://platform.twitter.com/widgets.js"></script>
          <a
            className="twitter-share-button"
            data-text={`champon's notebook から 「${article.title}」 ${hashtags()}`}
            data-url={`${Config.host}/article/${article.sortedId}`}
            data-lang="ja"
            href="https://twitter.com/intent/tweet">
          </a>
        </ShareListItemStyled>
      );
    },
    [article.sortedId, article.title, hashtags],
  );

  const facebookButton = useCallback(
    () => {
      return(
        <ShareListItemStyled>
          <ShareDivButton
            className="fb-share-button"
            //data-href={`${Config.host}/article/${article.sortedId}`}
            data-href={`https://blog.champonian.com/article/${article.sortedId}`}
            data-layout="button" 
            data-size="small">
            <a 
              rel="noopener noreferrer"
              target="_blank"
              href="https://www.facebook.com/sharer/sharer.php" 
              className="fb-xfbml-parse-ignore">
              シェア
            </a>
          </ShareDivButton>
        </ShareListItemStyled>
      );
    },
    [article.sortedId],
  );

  return (
    <ArticleShareBoxStyled>
      <ShareListStyled>
        {meta()}
        {twitterButton()}
        {facebookButton()}
      </ShareListStyled>
    </ArticleShareBoxStyled>
  );
};

export default ShareBox;