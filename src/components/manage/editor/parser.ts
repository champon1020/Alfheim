import {
  ArticleRequestType,
  ArticleType,
  CategoryRequestType,
  CategoryType,
  DraftRequestType,
  DraftType,
} from "~/type";

import { EditorArticle } from "./ArticleForm";

// Category (string) => CategoryRequestType[]
const parseCategoryStrToList = (categories: string) => {
  const categoryList = categories.split(",");
  const result = [] as CategoryRequestType[];
  if (categoryList[0] === "") return result;
  categoryList.forEach((v) => {
    result.push({
      id: "",
      name: v,
    });
  });
  return result;
};

// CategoryType[] => Category (string)
const parseCategoryListToStr = (categories: CategoryType[]): string => {
  let cateStr = "";
  if (categories === null || categories === undefined) return cateStr;
  categories.forEach((v, i) => {
    if (i !== 0) cateStr += ",";
    cateStr += v.name;
  });
  return cateStr;
};

// Category (string) => Category (string: for draft request)
//
// Difference of above two categories
// is separated categories by ',' or '&'.
const parseCategoryStrToDraftRequest = (category: string): string => {
  if (category === undefined || category === null) return "";
  const el = category.split(",");
  let res = "";
  el.forEach((v, i) => {
    if (i !== 0) res += "&";
    res += v;
  });
  return res;
};

// Category (string: for draft request) => Category (string)
//
// Difference of above two categories
// is separated categories by '&' or ','.
const parseCategoryDraftStrToStr = (category: string): string => {
  if (category === undefined || category === null) return "";
  const el = category.split("&");
  let res = "";
  el.forEach((v, i) => {
    if (i !== 0) res += ",";
    res += v;
  });
  return res;
};

// EditorArticle => ArticleRequestType
export const parseToRequestArticle = (e: EditorArticle): ArticleRequestType => {
  return {
    id: e.id,
    title: e.title,
    categories: parseCategoryStrToList(e.categories),
    content: e.content,
    imageHash: e.imageHash,
    isPrivate: e.isPrivate,
  };
};

// EditorArticle => DraftRequestType
export const parseToRequestDraft = (e: EditorArticle): DraftRequestType => {
  return {
    id: e.id,
    title: e.title,
    categories: parseCategoryStrToDraftRequest(e.categories),
    content: e.content,
    imageHash: e.imageHash,
  };
};

// EditorArticle => DraftType
export const parseToDraft = (e: EditorArticle): DraftType => {
  return {
    id: e.id,
    sortedId: -1,
    title: e.title,
    categories: e.categories,
    updateDate: e.updateDate,
    content: e.content,
    imageHash: e.imageHash,
  };
};

// ArticleType => EditorType
export const parseFromArticle = (a: ArticleType): EditorArticle => {
  return {
    id: a.id,
    title: a.title,
    categories: parseCategoryListToStr(a.categories),
    updateDate: a.updateDate,
    content: a.content,
    imageHash: a.imageHash,
    isPrivate: a.isPrivate,
  };
};

// DraftType => EditorType
export const parseFromDraft = (d: DraftType): EditorArticle => {
  return {
    id: d.id,
    title: d.title,
    categories: parseCategoryDraftStrToStr(d.categories),
    updateDate: d.updateDate,
    content: d.content,
    imageHash: d.imageHash,
    isPrivate: false,
  };
};
