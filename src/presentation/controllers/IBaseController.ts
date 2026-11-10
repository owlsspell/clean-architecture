import { Request, Response } from "express";

export interface IBaseController {
  getById(request: Request, response: Response): Promise<void>
  create(request: Request, response: Response): Promise<void>;
  search(request: Request, response: Response): Promise<void>
}