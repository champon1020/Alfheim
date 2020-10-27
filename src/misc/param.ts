// This module provides some functions for query parementers.

type Map = { [key: string]: string };

// Parse query parameters and return the map of them.
export const parseQueryParam = (url: string): Map => {
  const elem = url.split("?");
  if (elem.length === 1) return {};
  const paramMap: Map = {};
  const paramSection = elem[1];
  paramSection.split("&").forEach((v) => {
    const keyValue = v.split("=");
    if (keyValue.length === 2) {
      paramMap[keyValue[0]] = keyValue[1];
    }
  });
  return paramMap;
};

// Get only page parameter from query parameters.
export const parsePage = (href: string): number => {
  const page = parseQueryParam(href)["p"];
  return page === undefined ? 1 : Number.parseInt(page);
};
