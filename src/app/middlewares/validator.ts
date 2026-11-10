import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { BadRequestException } from "../errors/BadRequestException";

export function validateByDTO(dtoClass: any) {
  // @ts-ignore
  return async (req: Request, res: Response, next: NextFunction) => {
    const dtoInstance = plainToInstance(dtoClass, req.body);
    const errors = await validate(dtoInstance);
    if (errors?.length > 0) {
      return next(new BadRequestException("Validation failed", errors?.map(error => `Property "${error.property}" contains validation error.`)))
    }

    next();
  }
}