import * as React from "react";
import { useEffect } from "react";
import Editor from "tui-editor";
import "tui-editor/dist/tui-editor.css"; // editor's ui
import "tui-editor/dist/tui-editor-contents.css"; // editor's content
import "codemirror/lib/codemirror.css"; // codemirror
import "highlight.js/styles/github.css"; // code block highlight


let timerId: NodeJS.Timeout;
const observeConfig = { subtree: true, childList: true, characterData: true };

const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    const el = mutation.target as Element;
    if(el.className === "tui-editor-contents"){
      saveDraftContents();
    }
  });
});

const saveDraftContents = () => {
  if(timerId !== undefined){
    clearTimeout(timerId);
  }
  const newTimerId = setTimeout(() => {
    // save article process
  }, 1000);
  // timerId = newTimerId;
};

const ArticleForm = () => {
  useEffect(() => {
    const target = document.querySelector("#editorSelection");
    if(target === null) return console.error("#edit-container is null");
    observer.observe(target, observeConfig);

    const instance = new Editor({
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      el: document.querySelector("#editorSelection")!,
      initialEditType: "markdown",
      previewStyle: "vertical",
      height: "755px"
    });
    instance.getHtml();
  });

  const parseContents = () => {
    const contents = document.querySelector(".tui-editor-contents");
    if(contents === null) return console.error(".tui-editor-contents is null");
    contents.id = "article-contents";
  };

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
        <button onClick={() => parseContents()}>Submit</button>
      </div>
    </div>
  );
};

export default ArticleForm;