export type ArticleType = {
  id: number;
  title: string;
  date: Date;
  categories: string[];
  contentUrl: string;
  imageUrl: string;
} 

export type CategoryType = {
  id: number;
  name: string;
  articleNum: number;
}