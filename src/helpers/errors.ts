// eslint-disable-next-line max-classes-per-file
export class ErrorForbidden extends Error {
  status: number;

  constructor(message: string) {
    super(message);
    this.status = 403;
  }
}

export class ErrorUnauthorized extends Error {
  status: number;

  constructor(message: string) {
    super(message);
    this.status = 401;
  }
}
