import express, { Application } from "express";
import { inject, injectable } from "inversify";
import { IAppConfig } from "../config/app.config";
import { IErrorHandler } from "./middlewares/errorHandler";
import { IAppRouter } from "../presentation/routes/IAppRouter";

export interface IApp {
  getApp(): Application;
}

@injectable()
export class App implements IApp {
  private readonly app: Application;

  constructor(
    @inject("ProductRoutes") private readonly productRoutes: IAppRouter,
    @inject("OrderRoutes") private readonly orderRoutes: IAppRouter,
    @inject("AppConfig") private readonly config: IAppConfig,
    @inject("ErrorHandler") private readonly errorHandler: IErrorHandler,
  ) {
    this.app = express();
    this.configureMiddleware();
    this.configureRoutes();
    this.configureErrorHandling();
  }

  private configureMiddleware() {
    this.app.use(express.json());
  }

  private buildUrl(url: string): string {
    return `/${this.config.apiUrlPrefix}/${this.config.apiUrlVersion}/${url}`
  }

  private configureRoutes() {
    this.app.use(this.buildUrl("orders"), this.orderRoutes.getRouter());
    this.app.use(this.buildUrl("products"), this.productRoutes.getRouter());
  }

  private configureErrorHandling() {
    this.app.use(this.errorHandler.handle);
  }

  public getApp(): Application {
    return this.app;
  }
}