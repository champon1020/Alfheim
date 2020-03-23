import { ErrorStatus, ValidationErrorStatus } from "src/components/error/ErrorHandler";

// validation parameters
const TITLE_MAX_LENGTH = 50;

// eslint-disable-next-line no-useless-escape
const re = /[!"#$%&'()\*\+\-\.,\/:;<=>?@\[\\\]^_`{|}~]/g;
// eslint-disable-next-line no-useless-escape
const categoryRe = /[!"#$%&'()\*\+\-\.\/:;<=>?@\[\\\]^_`{|}~]/g;

export const validateTitle = (title: string, errSetter: React.Dispatch<React.SetStateAction<ErrorStatus>>) => {
  if(title.length === 0 || title === undefined) {
    errSetter(ValidationErrorStatus.EMPTY);
    return true;
  }
  if(title.length >= TITLE_MAX_LENGTH) {
    errSetter(ValidationErrorStatus.LENGTH);
    return true;
  }

  if(re.test(title)) {
    errSetter(ValidationErrorStatus.COMFORTABLE);
    return true;
  }
  return false;
};

export const validateCategory = (category: string, errSetter: React.Dispatch<React.SetStateAction<ErrorStatus>>) => {
  if(categoryRe.test(category)) {
    errSetter(ValidationErrorStatus.COMFORTABLE);
    return true;
  }
  return false;
};