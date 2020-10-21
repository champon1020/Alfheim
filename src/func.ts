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
  return Math.ceil((count - 1) / maxNum);
};
