import { DraftType, ArticleType, CategoryType } from "src/type";

type Map = { [key: string]: string }

export const parseQueryParam = (url: string): Map => {
  const elem = url.split("?");
  if(elem.length === 1)
    return {};
  const paramMap: Map = {};
  const paramSection = elem[1];
  paramSection.split("&").forEach(v => {
    const keyValue = v.split("=");
    if(keyValue.length === 2) {
      paramMap[keyValue[0]] = keyValue[1];
    }
  });
  return paramMap;
};

export const parseCookie = (cookies: string): Map => {
  if(cookies === "")
    return {};
  const elem = cookies.split(";");
  const paramMap: Map = {};
  elem.forEach(v => {
    const keyValue = v.split("=");
    if(keyValue.length === 2){
      paramMap[keyValue[0]] = keyValue[1];
    }
  });
  return paramMap;
};

export const parsePage = (href: string): number => {
  const page = parseQueryParam(href)["p"];
  return page === undefined ? 1 : Number.parseInt(page);
};

export const formatDateStr = (d?: string) => {
  if(d === undefined) return "";
  return d.substr(0, 10);
};

const parseCategoryDraftToArticle = (category: string): CategoryType[] => {
  const categories = category.split(",");
  const categoryList = [] as CategoryType[];
  categories.forEach(v => {
    categoryList.push({
      id: "id",
      name: v,
      articleNum: 1
    });
  });
  return categoryList;
};

export const parseDraftToArticle = (draft: DraftType): ArticleType => {
  const today = new Date();
  return {
    id: draft.id,
    sortedId: draft.sortedId,
    title: draft.title,
    categories: parseCategoryDraftToArticle(draft.categories),
    createDate: today.toISOString(),
    updateDate: "",
    contentHash: draft.contentHash,
    imageHash: draft.imageHash,
    isPrivate: true,
  };
};

export const pathJoin = (...el: string[]): string => {
  let res = "";
  el?.forEach((v, i) => {
    if(i !== 0) res += "/";
    res += v;
  });
  return res;
};
