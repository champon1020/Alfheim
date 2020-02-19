import * as React from "react";
import styled from "styled-components";

const TitleStyled = styled.div`
  background-color: var(--base-color);
  box-shadow: 2px 2px 4px gray;
  & h3 {
    margin: 0;
    padding: 10px;
    font-size: 20px;
  }
`;

const ContentStyled = styled.div`
  height: 200px;
  padding: 10px;
  background-color: whitesmoke;
  font-size: 18px;
  margin: 10px 0 30px 0;
  box-shadow: 2px 2px 4px gray;
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    text-align: center;
  }
`;

const SideBarBox = () => {
  return(
    <div>
      <TitleStyled>
        <h3>Side Bar Example</h3>
      </TitleStyled>
      <ContentStyled>
        <ul>
          <li>
            <p>Sample article 1</p>
          </li>
          <li>
            <p>Sample aritcle 2</p>
          </li>
        </ul>
      </ContentStyled>
    </div>
  );
};

export default SideBarBox;