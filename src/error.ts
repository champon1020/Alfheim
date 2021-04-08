export enum HttpErrorStatus {
  BadRequest = 400,
  Forbidden = 403,
  NotFound = 400,
  InternalServerError = 500,
}

export interface Error {
  error: () => string;
}

export class HttpError implements Error {
  private status: number;
  private msg: string;

  constructor(status: number, msg: string) {
    this.status = status;
    this.msg = msg;
  }

  public getStatus = (): number => {
    return this.status;
  };

  public error = (): string => {
    return `Status ${this.status}: ${this.msg}`;
  };
}

export class AppError implements Error {
  private msg: string;

  constructor(msg: string) {
    this.msg = msg;
  }

  public error = (): string => {
    return this.msg;
  };
}
