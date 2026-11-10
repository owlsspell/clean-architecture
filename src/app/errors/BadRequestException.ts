import { BaseException } from "./BaseException";
import { HttpResponseStatusCode } from "../../core/enums/http";

export class BadRequestException extends BaseException {
  constructor(message: string, details?: any) {
    super(message, HttpResponseStatusCode.BAD_REQUEST);
    this.details = details;
    this.name = "BadRequestException";
    Object.setPrototypeOf(this, BadRequestException.prototype);
  }
}