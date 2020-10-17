import {
  ArticleIface,
  ArticleReq,
  CategoryIface,
  DraftIface,
  DraftReq,
} from "~/type";

import { EditorArticle } from "./ArticleForm";

// Category (string) => CategoryIface[]
const parseCategoryStrToList = (categories: string) => {
  const categoryList = categories.split(",");
  const result = [] as CategoryIface[];
  if (categoryList[0] === "") return result;
  categoryList.forEach((v) => {
    result.push({
      id: "",
      name: v,
    });
  });
  return result;
};

// CategoryIface[] => Category (string)
const parseCategoryListToStr = (categories: CategoryIface[]): string => {
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

// EditorArticle => ArticleReq
export const parseToRequestArticle = (e: EditorArticle): ArticleReq => {
  return {
    id: e.id,
    title: e.title,
    categories: parseCategoryStrToList(e.categories),
    content: e.content,
    imageHash: e.imageHash,
    isPrivate: e.isPrivate,
  };
};

// EditorArticle => DraftReq
export const parseToRequestDraft = (e: EditorArticle): DraftReq => {
  return {
    id: e.id,
    title: e.title,
    categories: parseCategoryStrToDraftRequest(e.categories),
    content: e.content,
    imageHash: e.imageHash,
  };
};

// EditorArticle => DraftIface
export const parseToDraft = (e: EditorArticle): DraftIface => {
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

// ArticleIface => EditorType
export const parseFromArticle = (a: ArticleIface): EditorArticle => {
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

// DraftIface => EditorType
export const parseFromDraft = (d: DraftIface): EditorArticle => {
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
