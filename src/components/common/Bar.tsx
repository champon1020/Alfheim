import * as React from "react";
import styled from "styled-components";

const BarStyled = styled.div`
  background-color: var(--base-color);
  border-bottom: solid 1px rgb(197, 197, 197);
  text-align: center;
  position: relative;
  padding: 20px 100px;
`;

const SnsLinkListStyled = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: center;
  list-style: none;
  padding: 0;
  margin: 0;
`;

const SnsLinkListItemStyled = styled.li`
  margin: 0 30px;
  background-color: orange;
  height: 50px;
  width: 50px;
  border-radius: 10px 10px;
`;

const Bar = () => {
  return(
    <BarStyled>
      <SnsLinkListStyled>
        <SnsLinkListItemStyled>
          twitter
        </SnsLinkListItemStyled>
        <SnsLinkListItemStyled>
          linkedin
        </SnsLinkListItemStyled>
        <SnsLinkListItemStyled>
          wantedly
        </SnsLinkListItemStyled>
        <SnsLinkListItemStyled>
          qiita
        </SnsLinkListItemStyled>
      </SnsLinkListStyled>
    </BarStyled>
  );
};

export default Bar;