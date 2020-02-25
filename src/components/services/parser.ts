type Map = { [key: string]: string }

export const parseQueryParam = (url: string): Map => {
  const paramMap: Map = {};
  const elem = url.split("/")[-1].split("?");
  if(elem.length === 1) return paramMap;
  const paramSection = elem[1];
  paramSection.split("&").map(v => {
    const keyValue = v.split("=");
    if(keyValue.length === 2) {
      const key = v.split("=")[0];
      const value = v.split("=")[1];
      paramMap[key] = value;
    }
  });
  return paramMap;
};
