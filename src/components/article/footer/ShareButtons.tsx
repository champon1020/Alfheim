import FacebookIcon from "~/assets/images/shareIcon/facebook.png";
import LinkedinIcon from "~/assets/images/shareIcon/linkedin.png";
import TwitterIcon from "~/assets/images/shareIcon/twitter.svg";
import { Config } from "~/config";
import { ITag } from "~/type";
import React, { useMemo } from "react";
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

export const Twitter = (props: { id: string; title: string; tags: ITag[] }) => {
  const { id, title, tags } = props;

  const hashtagArray = useMemo((): string[] => {
    if (tags == undefined || tags.length === 0) {
      return [];
    }

    const hash: string[] = [];
    tags.forEach((c) => hash.push(c.name));

    return hash;
  }, [tags]);

  return (
    <StyledButton>
      <TwitterShareButton
        url={`${Config.ogpUrl}/${id}`}
        title={title}
        hashtags={hashtagArray}
      >
        <StyledIcon src={TwitterIcon} alt={"twitter share"} />
      </TwitterShareButton>
    </StyledButton>
  );
};

export const Facebook = (props: { id: string; title: string }) => {
  const { id, title } = props;

  return (
    <StyledButton>
      <FacebookShareButton url={`${Config.ogpUrl}/${id}`} title={title}>
        <StyledIcon src={FacebookIcon} alt={"facebook share"} />
      </FacebookShareButton>
    </StyledButton>
  );
};

export const Linkedin = (props: { id: string; title: string }) => {
  const { id, title } = props;

  return (
    <StyledButton>
      <LinkedinShareButton url={`${Config.ogpUrl}/${id}`} title={title}>
        <StyledIcon src={LinkedinIcon} alt={"linkedin share"} />
      </LinkedinShareButton>
    </StyledButton>
  );
};
