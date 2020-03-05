import { ArticleType, CategoryType } from "src/type";

const parseCategoriesToList = (categories: string) => {
  const categoryList = categories.split(",");
  const result = [] as CategoryType[];
  categoryList.forEach(v => {
    result.push({
      id: -1,
      name: v,
      articleNum: -1
    });
  });
  return result;
};

export const parseToRequestArticle = (title: string, categories: string, article?: ArticleType): ArticleType => {
  return {
    id: article === undefined ? -1 : article.id,
    title: title,
    categories: parseCategoriesToList(categories),
    createDate: article === undefined ? new Date() : article.createDate,
    updateDate: new Date(),
    contentUrl: article === undefined ? "" : article.contentUrl,
    imageUrl: article === undefined ? "" : article.imageUrl,
    private: article === undefined ? false : article.private
  };
};

export const parseContents = (setContents: React.Dispatch<React.SetStateAction<string>>) => {
  const newContents = document.querySelector(".tui-editor-contents");
  if(newContents === null) return console.error(".tui-editor-contents is null");
  const div = document.createElement("div");
  div.appendChild(newContents.cloneNode(true));
  setContents(div.innerHTML);
};