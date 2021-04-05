import { MutableRefObject, useEffect, useRef } from "react";

// Format date string which is RFC3339 to HHHH/MM/DD.
export const formatDateStr = (d?: string) => {
  if (d === undefined) return "";
  return d.substr(0, 10);
};

export const convertRefFromFunc = (ref: any): MutableRefObject<any> => {
  const targetRef = useRef();

  useEffect(() => {
    if (!ref) return;
    if (typeof ref === "function") {
      ref(targetRef.current);
    }
  }, [ref]);

  return targetRef;
};

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
