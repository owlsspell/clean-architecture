import { BaseException } from "./BaseException";
import { HttpResponseStatusCode } from "../../core/enums/http";

export class ForbiddenException extends BaseException {
  constructor(message: string) {
    super(message, HttpResponseStatusCode.FORBIDDEN);
    this.name = "ForbiddenException";
    Object.setPrototypeOf(this, ForbiddenException.prototype);
  }
}