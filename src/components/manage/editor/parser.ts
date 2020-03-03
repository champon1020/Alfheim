import { RequestCategoryType, ArticleType } from "src/type";

export const parseContents = (setContents: React.Dispatch<React.SetStateAction<Element>>) => {
  const newContents = document.querySelector(".tui-editor-contents");
  if(newContents === null) return console.error(".tui-editor-contents is null");
  setContents(newContents);
};

const parseCategoriesToList = (categories: string, article?: ArticleType) => {
  const categoryList = categories.split(",");
  const result = [] as RequestCategoryType[];
  categoryList.forEach(v => {
    result.push({
      id: -1,
      name: v,
    });
  });
  return result;
};

export const parseToRequestArticle = (title: string, categories: string, article?: ArticleType) => {
  const categoryList = parseCategoriesToList(categories);
  return {
    id: article === undefined ? -1 : article.id,
    title: title,
    categories: categoryList,
    createDate: article === undefined ? new Date() : article.createDate,
    updateDate: new Date(),
    contentUrl: article === undefined ? "" : article.contentUrl,
    imageUrl: article === undefined ? "" : article.imageUrl,
    private: article === undefined ? false : article.private
  };
};