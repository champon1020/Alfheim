import * as React from "react";
import Editor from "tui-editor"; /* ES6 */
import "tui-editor/dist/tui-editor.css"; // editor's ui
import "tui-editor/dist/tui-editor-contents.css"; // editor's content
import "codemirror/lib/codemirror.css"; // codemirror
import "highlight.js/styles/github.css"; // code block highlight

interface State {
  timerId?: NodeJS.Timeout;
}

class ArticleForm extends React.Component<{}, State> {
  constructor(props: {}){
    super(props);
    this.state = {
      timerId: undefined
    };
  }

  componentDidMount() {
    const editContainer = document.querySelector("#edit-container");
    if(editContainer === null) return console.error("#edit-container is null");
    const observer = new MutationObserver((mutations) => {
      mutations.forEach(m => {
        const el = m.target as Element;
        if(el.className === "tui-editor-contents") this.saveDraftContents();
      });
    });
    const config = {childList: true, subtree: true, characterData: true};
    observer.observe(editContainer, config);

    const instance = new Editor({
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      el: document.querySelector("#editorSelection")!,
      initialEditType: "markdown",
      previewStyle: "vertical",
      height: "755px"
    });
    instance.getHtml();
  }

  parseContents() {
    const contents = document.querySelector(".tui-editor-contents");
    if(contents === null) return console.error(".tui-editor-contents is null");
    contents.id = "article-contents";
    contents.className = "";
  }

  saveDraftContents() {
    if(this.state.timerId !== undefined){
      clearTimeout(this.state.timerId);
    }
    const timerId = setTimeout(() => {
      // save article process
    }, 1000);
    this.setState({ timerId: timerId });
  }

  render() {
    return(
      <div id="edit-container">
        <div id="edit-title-container">
          <input placeholder=" title" />
        </div>
        <div id="edit-category-container">
          <input placeholder=" category" />
        </div>
        <div id="editorSelection"></div>
        <div id="edit-button-container">
          <button>Preview</button>
          <button onClick={() => this.parseContents()}>Submit</button>
        </div>
      </div>
    );
  }
}

export default ArticleForm;