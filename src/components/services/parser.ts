import { Draft, ArticleType } from "src/type";

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

export const parseViewArticle = (articles: ArticleType[], page: number, maxPage: number): ArticleType[] => {
  const start = page === 1 ? 0 : 1;
  const end = page === maxPage ? articles.length : articles.length-1;
  return articles.slice(start, end);
};

export const parseStringToDate = (s: string) => {
  return new Date(s);
};

export const parseDraftToArticle = (draft: Draft): ArticleType => {
  const today = new Date();
  return {
    id: draft.id,
    sortedId: draft.sortedId,
    title: draft.title,
    categories: [],
    createDate: today.toString(),
    updateDate: today.toString(),
    contentHash: draft.contentHash,
    imageHash: draft.imageHash,
    _private: draft._private === undefined ? false : draft._private
  };
};
