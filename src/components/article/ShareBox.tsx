import { Config } from "~/App";
import FacebookIcon from "~/assets/images/shareIcon/facebook.png";
import LinkedinIcon from "~/assets/images/shareIcon/linkedin.png";
import TwitterIcon from "~/assets/images/shareIcon/twitter.svg";
import { ArticleIface } from "~/type";
import React, { useCallback } from "react";
import { Helmet } from "react-helmet";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from "react-share";
import styled from "styled-components";

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
  &:hover {
    opacity: 0.6;
  }
`;

const IconImage = styled.img`
  height: 4rem;
  width: 4rem;
`;

type Props = {
  article: ArticleIface;
};

const ShareBox = (props: Props) => {
  const { article } = props;

  const hashtagArray = useCallback(() => {
    const hash: string[] = [];
    if (
      article.categories === null ||
      article.categories === undefined ||
      article.categories.length === 0
    )
      return hash;
    article.categories.forEach((c) => hash.push(c.name));
    return hash;
  }, [article.categories]);

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
            content: `${Config.host}/article/${article.sortedId}`,
          },
          {
            property: "og:image ",
            content: `${Config.srcHost}/images/${article.imageHash}`,
          },
        ]}
      />
    );
  }, [article]);

  return (
    <ArticleShareBoxStyled>
      {meta()}
      <ShareListStyled>
        <ShareListItemStyled>
          <TwitterShareButton
            url={`${Config.host}/article/${article.sortedId}`}
            title={article.title}
            hashtags={hashtagArray()}
          >
            <IconImage src={TwitterIcon} alt={"twitter share"} />
          </TwitterShareButton>
        </ShareListItemStyled>
        <ShareListItemStyled>
          <FacebookShareButton
            url={`${Config.host}/article/${article.sortedId}`}
            title={article.title}
          >
            <IconImage src={FacebookIcon} alt={"facebook share"} />
          </FacebookShareButton>
        </ShareListItemStyled>
        <ShareListItemStyled>
          <LinkedinShareButton
            url={`${Config.host}/article/${article.sortedId}`}
            title={article.title}
          >
            <IconImage src={LinkedinIcon} alt={"linkedin share"} />
          </LinkedinShareButton>
        </ShareListItemStyled>
      </ShareListStyled>
    </ArticleShareBoxStyled>
  );
};

export default ShareBox;
