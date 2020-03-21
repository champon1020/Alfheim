import { ArticleRequestType, CategoryRequestType, DraftType, DraftRequestType, ArticleType, CategoryType } from "src/type";
import { EditorArticle } from "./ArticleForm";

const parseCategoryStrToList = (categories: string) => {
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

const parseCategoryListToStr = (categories: CategoryType[]): string => {
  let cateStr = "";
  if(categories === null || categories === undefined) return cateStr;
  categories.forEach((v, i) => {
    if(i !== 0) cateStr += ",";
    cateStr += v.name;
  });
  return cateStr;
};

const parseCategoryStrToDraftRequest = (category: string): string => {
  if(category === undefined || category === null) return "";
  const el = category.split(",");
  let res = "";
  el.forEach((v, i) => {
    if(i !== 0) res += "&";
    res += v;
  });
  return res;
};

const parseCategoryDraftStrToStr = (category: string): string => {
  if(category === undefined || category === null) return "";
  const el = category.split("&");
  let res = "";
  el.forEach((v, i) => {
    if(i !== 0) res += ",";
    res += v;
  });
  return res;
};

export const parseToRequestArticle = (e: EditorArticle): ArticleRequestType => {
  return {
    id: e.id,
    title: e.title,
    categories: parseCategoryStrToList(e.categories),
    contentHash: e.contentHash,
    imageHash: e.imageHash,
    isPrivate: e.isPrivate,
  };
};

export const parseToRequestDraft = (e: EditorArticle): DraftRequestType => {
  return {
    id: e.id,
    title: e.title,
    categories: parseCategoryStrToDraftRequest(e.categories),
    contentHash: e.contentHash,
    imageHash: e.imageHash,
  };
};

export const parseToDraft = (e: EditorArticle): DraftType => {
  return {
    id: e.id,
    sortedId: -1,
    title: e.title,
    categories: e.categories,
    updateDate: e.updateDate,
    contentHash: e.contentHash,
    imageHash: e.imageHash
  };
};

export const parseFromArticle = (a: ArticleType): EditorArticle => {
  return {
    id: a.id,
    title: a.title,
    categories: parseCategoryListToStr(a.categories),
    updateDate: a.updateDate,
    contentHash: a.contentHash,
    imageHash: a.imageHash,
    isPrivate: a.isPrivate,
  };
};

export const parseFromDraft = (d: DraftType): EditorArticle => {
  return {
    id: d.id,
    title: d.title,
    categories: parseCategoryDraftStrToStr(d.categories),
    updateDate: d.updateDate,
    contentHash: d.contentHash,
    imageHash: d.imageHash,
    isPrivate: true,
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