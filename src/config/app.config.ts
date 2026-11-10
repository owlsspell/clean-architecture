import "reflect-metadata";
import dotenv from "dotenv";
import { injectable } from "inversify";
import * as process from "node:process";

export interface IAppConfig {
  port: number;
  databaseUrl: string;
  apiUrlPrefix: string;
  apiUrlVersion: string;
}

@injectable()
export default class AppConfig implements IAppConfig {
  constructor() {
    dotenv.config();
  }

  get port(): number {
    return parseInt(process.env.PORT || "3000", 10);
  }

  get databaseUrl(): string {
    return process.env.DATABASE_URL || "";
  }

  get apiUrlPrefix(): string {
    return process.env.API_PREFIX || "api";
  }

  get apiUrlVersion(): string {
    return process.env.API_VERSION || "v1";
  }
}