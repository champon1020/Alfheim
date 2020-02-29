import * as React from "react";

interface ParentProps {
  text: string;
  href: string;
  id: string | undefined;
  className: string | undefined;
}

type Props = ParentProps;

function strUndefCheck(value: string | undefined): string {
  return value!==undefined ? value : "";
}

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