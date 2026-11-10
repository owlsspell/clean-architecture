import { Router } from "express";

export interface IAppRouter {
  getRouter(): Router;
}