import { ITag } from "~/type";
import React, { MouseEvent, useCallback, useMemo } from "react";
import styled from "styled-components";

const StyledTags = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  width: 80%;
  margin: 2rem auto 0 auto;
  font-size: 1.6rem;
  padding: 0;
  @media (max-width: 500px) {
    font-size: 1.2rem;
  }
`;

const StyledTag = styled.li`
  margin: 0.5rem 1rem;
  color: brown;
  border: solid 1px brown;
  padding: 1px 5px;
  cursor: pointer;
  &:hover {
    opacity: 0.6;
  }
`;

type Props = {
  tags: ITag[];
};

const Tag = (props: Props) => {
  const { tags } = props;

  const onClickTag = useCallback((e: MouseEvent<HTMLLIElement>) => {
    const len = e.currentTarget.classList.length;
    const cid = e.currentTarget.classList[len - 1];
    window.open("/home/tag/" + cid, "_self");
  }, []);

  const tagList = useMemo(() => {
    const list = [] as JSX.Element[];

    if (tags == undefined) {
      return list;
    }

    tags.forEach((c, i) => {
      list.push(
        <StyledTag key={i} className={c.id} onClick={onClickTag}>
          {c.name}
        </StyledTag>
      );
    });

    return list;
  }, [tags, onClickTag]);

  return <StyledTags>{tagList}</StyledTags>;
};

export default Tag;
