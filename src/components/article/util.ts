export const checkIsDraft = () => {
  return window.location.pathname.startsWith("/article-draft");
};
