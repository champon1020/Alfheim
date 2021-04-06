import { ITag } from "~/interfaces";

export const ConvertITagsToStr = (tags: ITag[]): string => {
  let tagsStr = "";
  tags.forEach((t, i) => {
    if (i > 0) {
      tagsStr += ",";
    }
    tagsStr += t.name;
  });
  return tagsStr;
};

export const ConvertStrToITags = (tagsStr: string): ITag[] => {
  let tags = [] as ITag[];
  tagsStr.split(",").forEach((t) => {
    tags.push({ name: t, nArticles: 0 });
  });
  return tags;
};
