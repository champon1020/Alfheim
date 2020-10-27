import "highlight.js/styles/darcula.css";
import "katex/dist/katex.css";

import hljs from "highlight.js";
import katex from "katex";
import React from "react";

export const renderers = {
  inlineCode: ({ children }: any) => {
    if (/^\$\$(.*)\$\$/.test(children)) {
      const html = katex.renderToString(
        children.replace(/^\$\$(.*)\$\$/, "$1"),
        {
          throwOnError: false,
        }
      );
      return <code dangerouslySetInnerHTML={{ __html: html }} />;
    }

    if (children == null) {
      return <code />;
    }

    return children;
  },
  code: ({ children, language, value }: any) => {
    if (language.toLocaleLowerCase() === "katex") {
      const html = katex.renderToString(value, {
        throwOnError: false,
      });
      return (
        <pre>
          <code dangerouslySetInnerHTML={{ __html: html }} />
        </pre>
      );
    }

    if (language.toLocaleLowerCase() != "") {
      const html = hljs.highlight(language, value).value;
      return (
        <pre>
          <code dangerouslySetInnerHTML={{ __html: html }} />
        </pre>
      );
    }

    if (children == null) {
      return <code />;
    }

    return children;
  },
};
