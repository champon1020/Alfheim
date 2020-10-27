import React from "react";
import styled from "styled-components";

const StyledInfo = styled.div`
  margin: 2% auto 0 auto;
  color: gray;
  display: block;
  width: fit-content;
  font-size: 1.2rem;
  @media (max-width: 650px) {
    font-size: 1rem;
  }
  & a {
    color: gray;
  }
`;

const userUrl = "https://pixabay.com/ja/users/steinchen-21981";
const pixabayUrl = "https://pixabay.com/ja/";

const Info = () => {
  return (
    <StyledInfo>
      {"The picture is made by "}
      <a href={userUrl}>{"Gaby Stein"}</a>
      {" from "}
      <a href={pixabayUrl}>{" Pixabay"}</a>
    </StyledInfo>
  );
};

export default Info;
