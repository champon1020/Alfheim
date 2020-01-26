import {Article} from "../types/types";
import { updateArticles, UpdateArticlesAction } from "./articleAction";

export enum ActionEnum {
  UPDATE_ARTICLES = "UPDATE_ARTICLES"
}

export interface ActionCreator {
  updateArticles(articles: Article[]): UpdateArticlesAction;
}

class AppActionCreator implements ActionCreator {
  public updateArticles = updateArticles;
}

export const appActionCreator: AppActionCreator = new AppActionCreator();