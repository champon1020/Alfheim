import { ITag } from "~/type";
import React, { MouseEvent, useCallback } from "react";
import styled from "styled-components";

const StyledList = styled.ul`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: start;
  margin-top: 10%;
  padding: 0 15%;
  @media (max-width: 800px) {
    margin: 0;
    margin-top: 10%;
  }
  @media (max-width: 500px) {
    padding: 0;
  }
`;

const StyledTag = styled.li`
  font-size: 2.5rem;
  margin: 2%;
  border: solid thin brown;
  color: brown;
  padding: 0 1%;
  cursor: pointer;
  &:hover {
    opacity: 0.6;
  }
`;

const StyledEmptyMsg = styled.h3`
  font-size: 2.4rem;
  color: gray;
  margin: 5% auto 5% auto;
`;

type Props = {
  tags: ITag[];
};

const TagList = (props: Props) => {
  const { tags } = props;

  const onClickTag = useCallback((e: MouseEvent<HTMLLIElement>) => {
    const len = e.currentTarget.classList.length;
    const cid = e.currentTarget.classList[len - 1];
    window.open("/home/tag/" + cid, "_self");
  }, []);

  const tagList = useCallback(() => {
    if (tags === undefined || tags === null || tags.length === 0) {
      return <StyledEmptyMsg>{"No Tags"}</StyledEmptyMsg>;
    }

    const list = [] as JSX.Element[];

    tags.forEach((c, i) => {
      list.push(
        <StyledTag key={i} className={c.id} onClick={onClickTag}>
          {c.name + "(" + c.articleNum + ")"}
        </StyledTag>
      );
    });

    return list;
  }, [tags, onClickTag]);

  return <StyledList>{tagList()}</StyledList>;
};

export default TagList;
