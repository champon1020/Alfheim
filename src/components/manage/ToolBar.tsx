import * as React from "react";
import styled from "styled-components";

const ToolBarContainerStyled = styled.div`
  text-align: center;
  background-color: white;
  height: 60px;
  margin-bottom: 10px;
  & ul {
    display: flex;
    flex-direction: row;
    justify-content: center;
    list-style: none;
    padding-top: 4px;
  }
  & li {
    font-size: 26px;
    width: 100px;
    padding: 13px;
    position: relative;
    border-radius: 10px 10px 0 0;
  }
  & .link {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
  }
`;

interface ParentProps {
  mode: string;
}

type Props = ParentProps;

const ToolBar: React.FC<Props> = (props) => {
  const style = {
    "backgroundColor": "rgb(61, 61, 61)",
    "color": "white"
  };

  const dummyStyle = {};

  return(
    <ToolBarContainerStyled>
      <ul>
        <li style={props.mode === undefined ? style : dummyStyle}>
            create
          {/* eslint-disable-next-line */}
            <a className="link" href="/manage/"></a>
        </li>
        <li style={props.mode === "images" ? style : dummyStyle}>
            images
          {/* eslint-disable-next-line */}
            <a className="link" href="/manage/images"></a>
        </li>
        <li style={props.mode === "articles" ? style : dummyStyle}>
            articles
          {/* eslint-disable-next-line */}
            <a className="link" href="/manage/articles"></a>
        </li>
        <li style={props.mode === "settings" ? style : dummyStyle}>
            settings
          {/* eslint-disable-next-line */}
            <a className="link" href="/manage/settings"></a>
        </li>
      </ul>
    </ToolBarContainerStyled>
  );
};

export default ToolBar;