import { BaseException } from "./BaseException";
import { HttpResponseStatusCode } from "../../core/enums/http";

export class NotFoundException extends BaseException {
  constructor(message: string) {
    super(message, HttpResponseStatusCode.NOT_FOUND);
    this.name = "NotFoundException";
    Object.setPrototypeOf(this, NotFoundException.prototype);
  }
}