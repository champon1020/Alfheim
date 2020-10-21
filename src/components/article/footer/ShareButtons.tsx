import FacebookIcon from "~/assets/images/shareIcon/facebook.png";
import LinkedinIcon from "~/assets/images/shareIcon/linkedin.png";
import TwitterIcon from "~/assets/images/shareIcon/twitter.svg";
import { Config } from "~/config";
import { ICategory } from "~/type";
import React, { useCallback } from "react";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from "react-share";
import styled from "styled-components";

const StyledButton = styled.li`
  margin-right: 2rem;
  &:hover {
    opacity: 0.6;
  }
`;

const StyledIcon = styled.img`
  height: 4rem;
  width: 4rem;
`;

export const Twitter = (props: {
  sortedId: number;
  title: string;
  categories: ICategory[];
}) => {
  const { sortedId, title, categories } = props;

  const hashtagArray = useCallback((): string[] => {
    if (
      categories === null ||
      categories === undefined ||
      categories.length === 0
    ) {
      return [];
    }

    const hash: string[] = [];
    categories.forEach((c) => hash.push(c.name));

    return hash;
  }, [categories]);

  return (
    <StyledButton>
      <TwitterShareButton
        url={`${Config.url}/article/${sortedId}`}
        title={title}
        hashtags={hashtagArray()}
      >
        <StyledIcon src={TwitterIcon} alt={"twitter share"} />
      </TwitterShareButton>
    </StyledButton>
  );
};

export const Facebook = (props: { sortedId: number; title: string }) => {
  const { sortedId, title } = props;

  return (
    <StyledButton>
      <FacebookShareButton
        url={`${Config.url}/article/${sortedId}`}
        title={title}
      >
        <StyledIcon src={FacebookIcon} alt={"facebook share"} />
      </FacebookShareButton>
    </StyledButton>
  );
};

export const Linkedin = (props: { sortedId: number; title: string }) => {
  const { sortedId, title } = props;

  return (
    <StyledButton>
      <LinkedinShareButton
        url={`${Config.url}/article/${sortedId}`}
        title={title}
      >
        <StyledIcon src={LinkedinIcon} alt={"linkedin share"} />
      </LinkedinShareButton>
    </StyledButton>
  );
};
