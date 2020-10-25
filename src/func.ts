import Cookie from "js-cookie";
import { MutableRefObject, useEffect, useRef } from "react";

const AddScript = (src: string, isAsync: boolean, id?: string) => {
  const script = document.createElement("script");
  script.src = src;
  script.async = isAsync;
  if (id !== undefined) {
    script.id = id;
  }
  document.head.appendChild(script);
};

export const loadMathJax = () => {
  AddScript("https://polyfill.io/v3/polyfill.min.js?features=es6", false);
  AddScript(
    "https://cdn.jsdelivr.net/npm/mathjax@3.0.5/es5/tex-svg-full.js",
    false
  );
};

export const countToMaxPage = (count: number, maxNum: number): number => {
  return Math.ceil(count / maxNum);
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

// Format date string which is RFC3339 to HHHH/MM/DD.
export const formatDateStr = (d?: string) => {
  if (d === undefined) return "";
  return d.substr(0, 10);
};

// Join uri path.
export const pathJoin = (...el: string[]): string => {
  let res = "";
  el?.forEach((v, i) => {
    if (i !== 0) res += "/";
    res += v;
  });
  return res;
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

export const bearerAuthHeader = () => {
  return { Authorization: `Bearer ${Cookie.get("alfheim_id_token")}` };
};
