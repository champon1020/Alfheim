export type ArticleType = {
  id: number;
  title: string;
  categories: CategoryType[];
  createDate: Date;
  updateDate: Date;
  contentUrl: string;
  imageUrl: string;
  private: boolean;
} 

export type CategoryType = {
  id: number;
  name: string;
  articleNum?: number;
}