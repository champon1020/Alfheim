import * as React from "react";

interface ParentProps {
  mode: string;
}

type Props = ParentProps;

class ToolBar extends React.Component<Props> {
  render() {
    const style = {
      "backgroundColor": "rgb(61, 61, 61)",
      "color": "white"
    };

    const dummyStyle = {};

    return(
      <div id="tool-bar-container">
        <ul>
          <li style={this.props.mode === undefined ? style : dummyStyle}>
            create
            {/* eslint-disable-next-line */}
            <a className="link" href="/manage/"></a>
          </li>
          <li style={this.props.mode === "images" ? style : dummyStyle}>
            images
            {/* eslint-disable-next-line */}
            <a className="link" href="/manage/images"></a>
          </li>
          <li style={this.props.mode === "articles" ? style : dummyStyle}>
            articles
            {/* eslint-disable-next-line */}
            <a className="link" href="/manage/articles"></a>
          </li>
          <li style={this.props.mode === "settings" ? style : dummyStyle}>
            settings
            {/* eslint-disable-next-line */}
            <a className="link" href="/manage/settings"></a>
          </li>
        </ul>
      </div>
    );
  }
}

export default ToolBar;