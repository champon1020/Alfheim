import * as React from "react";
import { strUndefCheck } from "../../util/func";

interface ParentProps {
  text: string;
  href: string;
  id: string | undefined;
  className: string | undefined;
}

class LinkWord extends React.Component<ParentProps> {
  render() {
    return (
      <a href={this.props.href}
        id={strUndefCheck(this.props.id)}
        className={strUndefCheck(this.props.className)}>
        {this.props.text}
      </a>
    );
  }
}

export default LinkWord;