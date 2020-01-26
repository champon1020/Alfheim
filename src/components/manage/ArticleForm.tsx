import * as React from "react";
import Editor from "tui-editor"; /* ES6 */
import "tui-editor/dist/tui-editor.css"; // editor's ui
import "tui-editor/dist/tui-editor-contents.css"; // editor's content
import "codemirror/lib/codemirror.css"; // codemirror
import "highlight.js/styles/github.css"; // code block highlight

class ArticleForm extends React.Component {
  componentDidMount() {
    const instance = new Editor({
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      el: document.querySelector("#editorSelection")!,
      initialEditType: "markdown",
      previewStyle: "vertical",
      height: "700px"
    });
    instance.getHtml();
  }

  render() {
    return(
      <div id="edit-container">
        <div id="editorSelection"></div>
      </div>
    );
  }
}

export default ArticleForm;