export class ValidationError extends Error {
  errors: string[] = [];

  constructor(msg: string, errors?: string[]) {
    super(msg);

    if (errors) {
      this.errors = errors;
    }
  }
}
