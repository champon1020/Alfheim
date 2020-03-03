import React from "react";
import styled from "styled-components";

const SideBarBoxStyled = styled.div`
  border: solid 1px var(--base-color);
  margin-bottom: 30px;
`;

const TitleStyled = styled.div`
  background-color: var(--base-color);
  color: white;
  & h3 {
    margin: 0;
    padding: 10px;
    font-size: 20px;
  }
`;

const ContentStyled = styled.div`
  padding: 10px;
  background-color: white;
  font-size: 18px;
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    text-align: center;
  }
`;

type Props = {
  title: string;
  ContentComponent: React.FunctionComponent;
}

const SideBarBox = (props: Props) => {
  const { title, ContentComponent } = props;

  return(
    <SideBarBoxStyled>
      <TitleStyled>
        <h3>{title}</h3>
      </TitleStyled>
      <ContentStyled>
        <ContentComponent />
      </ContentStyled>
    </SideBarBoxStyled>
  );
};

export default SideBarBox;