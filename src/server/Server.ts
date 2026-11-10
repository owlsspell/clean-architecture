import "reflect-metadata";
import { IApp } from "../app/App";
import { inject, injectable } from "inversify";
import { IAppConfig } from "../config/app.config";

export interface IServer {
  start(): void;
}

@injectable()
export class Server implements IServer {
  constructor(
    @inject("App") private readonly app: IApp,
    @inject("AppConfig") private readonly config: IAppConfig,
  ) {}

  public start(): void {
    this.app.getApp().listen(this.config.port, () => {
      console.log(`Server started on port ${this.config.port}`);
    });
  }
}