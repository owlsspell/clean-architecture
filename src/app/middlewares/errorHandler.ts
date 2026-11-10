import { NextFunction, Request, Response } from "express";
import { injectable } from "inversify";
import { HttpResponseStatusCode } from "../../core/enums/http";
import { ErrorDTO } from "../dto/error/ErrorDTO";
import { BaseException } from "../errors/BaseException";

export interface IErrorHandler {
  handle(err: Error, req: Request, res: Response, next: NextFunction): void;
}

@injectable()
export class ErrorHandler implements IErrorHandler {
  // @ts-ignore
  handle(err: BaseException, req: Request, res: Response, next: NextFunction): void {
    console.error(`[ERROR] ${err.message}`, err);
    res
      .status(err.statusCode || HttpResponseStatusCode.INTERNAL_SERVER_ERROR)
      .json(new ErrorDTO(
        err.message || "Internal Server Error",
        err?.details || []
      ));
  }
}