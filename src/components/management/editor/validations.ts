import { AppError, Error } from "~/error";
import { ITag } from "~/interfaces";

// Max length of title.
const TITLE_MAX_LENGTH = 100;

// Regex of title and some strings.
// Allow alphabet including uppercase, lowercase and numbers.
//
// eslint-disable-next-line no-useless-escape
const re = /["$%'()\*\+\-\.,\/:;<=>\\^_`{|}~]/g;

// Regex of title and some strings.
// Allow alphabet including uppercase, lowercase and numbers.
// Also camma is ok.
//
// eslint-disable-next-line no-useless-escape
const tagRe = /[!"#$%&'()\*\+\-\.\/:;<=>?@\[\\\]^_`{|}~]/g;

// Validation of title form.
export const validateTitle = (title: string, setErr: (err: Error) => void) => {
  if (title == null) {
    setErr(new AppError("title must no be null or undefined"));
    return false;
  }

  if (title.length === 0 || title === undefined) {
    setErr(new AppError("length of title must be larger than 0"));
    return false;
  }

  if (title.length >= TITLE_MAX_LENGTH) {
    setErr(
      new AppError(`length of title must be less than ${TITLE_MAX_LENGTH}`)
    );
    return false;
  }

  if (re.test(title)) {
    setErr(new AppError("invalid format of title"));
    return false;
  }

  return true;
};

// Validation of categories form.
export const validateTag = (tags: ITag[], setError: (err: Error) => void) => {
  let t = "";
  tags.forEach((v, i) => {
    if (i > 0) {
      t += ",";
    }
    t += v.name;
  });

  if (tagRe.test(t)) {
    setError(new AppError("invalid format of tags"));
    return false;
  }

  return true;
};
