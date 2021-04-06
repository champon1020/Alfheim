import { ErrorStatus, ValidationErrorStatus } from "~/error";
import { ITag } from "~/interfaces";

// Max length of title.
const TITLE_MAX_LENGTH = 100;

// Regex of title and some strings.
// Allow alphabet including uppercase, lowercase and numbers.
//
// eslint-disable-next-line no-useless-escape
const re = /[!"#$%&'()\*\+\-\.,\/:;<=>?@\[\\\]^_`{|}~]/g;

// Regex of title and some strings.
// Allow alphabet including uppercase, lowercase and numbers.
// Also camma is ok.
//
// eslint-disable-next-line no-useless-escape
const tagRe = /[!"#$%&'()\*\+\-\.\/:;<=>?@\[\\\]^_`{|}~]/g;

// Validation of title form.
export const validateTitle = (
  title: string,
  errSetter: React.Dispatch<React.SetStateAction<ErrorStatus>>
) => {
  // Check empty.
  if (title.length === 0 || title === undefined) {
    errSetter(ValidationErrorStatus.EMPTY);
    return true;
  }

  // Check length.
  if (title.length >= TITLE_MAX_LENGTH) {
    errSetter(ValidationErrorStatus.LENGTH);
    return true;
  }

  // Check regex.
  if (re.test(title)) {
    errSetter(ValidationErrorStatus.COMFORTABLE);
    return true;
  }
  return false;
};

// Validation of categories form.
export const validateTag = (
  tags: ITag[],
  errSetter: React.Dispatch<React.SetStateAction<ErrorStatus>>
) => {
  let t = "";
  tags.forEach((v, i) => {
    if (i > 0) {
      t += ",";
    }
    t += v.name;
  });

  if (tagRe.test(t)) {
    errSetter(ValidationErrorStatus.COMFORTABLE);
    return true;
  }

  return false;
};
