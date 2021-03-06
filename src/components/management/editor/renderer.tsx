import "highlight.js/styles/paraiso-dark.css";
import "katex/dist/katex.css";

import hljs from "highlight.js";
import katex from "katex";
import React from "react";
import styled from "styled-components";

const StyledCode = styled.code`
  background: #2f1e2e !important;
  text-shadow: none !important;
`;

export const renderers = {
  inlineCode: ({ children }: any) => {
    if (children != null && /^\$\$(.*)\$\$/.test(children)) {
      const html = katex.renderToString(
        children.replace(/^\$\$(.*)\$\$/, "$1"),
        {
          throwOnError: false,
        }
      );
      return <code dangerouslySetInnerHTML={{ __html: html }} />;
    }

    if (children != null && /^\$(.*)\$/.test(children)) {
      children = children.replace(/^\$(.*)\$/, "$1");
      const html = `<span className={"inlineCode"}>${children}</span>`;
      return <code dangerouslySetInnerHTML={{ __html: html }} />;
    }

    if (children == null) {
      return <code />;
    }

    return children;
  },
  code: ({ language, value, children }: any) => {
    if (language != null && language.toLocaleLowerCase() === "katex") {
      const html = katex.renderToString(value, {
        throwOnError: false,
      });
      return (
        <pre>
          <code dangerouslySetInnerHTML={{ __html: html }} />
        </pre>
      );
    }

    if (
      value != null &&
      hljs.getLanguage(language) != null &&
      language.toLocaleLowerCase() != ""
    ) {
      const html = hljs.highlight(language, value).value;
      return (
        <pre>
          <StyledCode
            className={`hljs ${language}`}
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </pre>
      );
    }

    if (children == null) {
      return <code />;
    }

    return children;
  },
};
