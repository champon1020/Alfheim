// validation parameters
const TITLE_MAX_LENGTH = 50;

// eslint-disable-next-line no-useless-escape
const re = /[!"#$%&'()\*\+\-\.,\/:;<=>?@\[\\\]^_`{|}~]/g;
// eslint-disable-next-line no-useless-escape
const categoryRe = /[!"#$%&'()\*\+\-\.\/:;<=>?@\[\\\]^_`{|}~]/g;

export const validateTitle = (title: string, errSetter: React.Dispatch<React.SetStateAction<string>>) => {
  if(title.length === 0) {
    errSetter("Title must not be empty");
    return;
  }
  if(title.length >= TITLE_MAX_LENGTH) {
    errSetter("Title length must be less and equal than " + TITLE_MAX_LENGTH);
    return;
  }

  if(re.test(title)) {
    errSetter("Title is not comfortable");
    return;
  }
  errSetter("");
};

export const validateCategory = (category: string, errSetter: React.Dispatch<React.SetStateAction<string>>) => {
  if(categoryRe.test(category)) {
    errSetter("Category is not comfortable");
    return;
  }
};