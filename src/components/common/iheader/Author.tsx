import React from "react";
import styled from "styled-components";

const StyledAuthor = styled.div`
  position: relative;
  font-size: 1.1rem;
  color: lightgray;
  top: -2.5rem;
  left: 1rem;
  display: inline-block;
  & a {
    color: white;
    &:hover {
      opacity: 0.6;
    }
  }
`;

const pixabyUrl = "https://pixaby.com/ja/";
const pixabyUserUrl = "https://pixabay.com/ja/users/";

type Props = {
  name: string;
  id: string;
};

const Author = (props: Props) => {
  const { id, name } = props;

  return (
    <StyledAuthor>
      <a href={pixabyUserUrl + id}>{name}</a>
      {" による "}
      <a href={pixabyUrl}>{"Pixabay"}</a>
      {" からの画像 "}
    </StyledAuthor>
  );
};

export default Author;
