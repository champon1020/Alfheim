export enum HttpErrorStatus {
  ERROR_403 = "ERROR_403",
  ERROR_404 = "ERROR_404",
  ERROR_500 = "ERROR_500",
}

export enum MyErrorStatus {
  NONE = "NONE",
  UNDEFINED = "UNDEFINED",
  NULL = "NULL",
}

export enum ValidationErrorStatus {
  EMPTY = "EMPTY",
  LENGTH = "LENGTH",
  COMFORTABLE = "COMFORTABLE",
}

export type ErrorStatus = HttpErrorStatus | MyErrorStatus | ValidationErrorStatus;

interface ErrorHandler {
  print: (err: ErrorStatus) => void;
}

export class AppErrorHandler implements ErrorHandler {
  public message = (err?: ErrorStatus): string => {
    switch(err) {
    // HttpErrorStatus
    case HttpErrorStatus.ERROR_403:
      return "HttpError: Status 403: Forbidden";
    case HttpErrorStatus.ERROR_404:
      return "HttpError: Status 404: Not Found";
    case HttpErrorStatus.ERROR_500:
      return "HttpError: Status500: Internal Server Error";
      
    // MyErrorStatus
    case MyErrorStatus.UNDEFINED:
      return "Error: This may be undefined";
    case MyErrorStatus.NULL:
      return "Error: This may be null";

    // ValidationErrorStatus
    case ValidationErrorStatus.EMPTY:
      return "ValidationError: Value must not be empty";
    case ValidationErrorStatus.LENGTH:
      return "ValidationError: Value length is too long";
    case ValidationErrorStatus.COMFORTABLE:
      return "ValidationError: Value is not comfortable";
    }
    return "";
  }

  public print = (err?: ErrorStatus) => {
    console.error(this.message(err));
  }
}

const appErrorHandler = new AppErrorHandler();

export default appErrorHandler;