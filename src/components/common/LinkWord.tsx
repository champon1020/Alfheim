import * as React from "react";
import { strUndefCheck } from "../../util/func";

interface ParentProps {
  text: string;
  href: string;
  id: string | undefined;
  className: string | undefined;
}

type Props = ParentProps;

const LinkWord: React.FC<Props> = (props) => {
  return (
    <a href={props.href}
      id={strUndefCheck(props.id)}
      className={strUndefCheck(props.className)}>
      {props.text}
    </a>
  );
};

export default LinkWord;