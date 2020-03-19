import { ArticleRequestType, CategoryRequestType, Draft } from "src/type";

const parseRequestCategoriesToList = (categories: string) => {
  const categoryList = categories.split(",");
  const result = [] as CategoryRequestType[];
  if(categoryList[0] === "") return result;
  categoryList.forEach(v => {
    result.push({
      id: "",
      name: v
    });
  });
  return result;
};

export const parseDraftToRequestArticle = (draft: Draft): ArticleRequestType => {
  return {
    id: draft.id,
    title: draft.title,
    categories: parseRequestCategoriesToList(draft.categories),
    contentHash: draft.contentHash,
    imageHash: draft.imageHash,
    _private: draft._private === undefined ? false : draft._private,
  };
};

export const parseContents = (setContents: React.Dispatch<React.SetStateAction<string>>): string => {
  const newContents = document.querySelector(".tui-editor-contents");
  if(newContents === null) {
    console.error(".tui-editor-contents is null");
    return "";
  }
  const div = document.createElement("div");
  div.appendChild(newContents.cloneNode(true));
  setContents(div.innerHTML);
  return div.innerHTML;
};