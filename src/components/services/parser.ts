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

export const parseUrl = (url: string): string[] => {
  const elem = url.split("?")[0].split("/");
  return elem;
};

export const parseDateToString = (d: Date) => {
  return d.toString().substr(0, 10);
};