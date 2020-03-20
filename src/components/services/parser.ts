import { DraftType, ArticleType, CategoryType } from "src/type";

type Map = { [key: string]: string }

export const parseQueryParam = (url: string): Map => {
  const elem = url.split("?");
  if(elem.length === 1) return {};
  const paramMap: Map = {};
  const paramSection = elem[1];
  paramSection.split("&").forEach(v => {
    const keyValue = v.split("=");
    if(keyValue.length === 2) {
      const key = v.split("=")[0];
      const value = v.split("=")[1];
      paramMap[key] = value;
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
    _private: true,
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
