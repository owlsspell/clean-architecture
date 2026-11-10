import { IAppConfig } from "./app.config";
import { PrismaClient } from "@prisma/client";
import { inject, injectable } from "inversify";
import { IDBClient } from "../infrastructure/persistence/client";

@injectable()
export class PrismaPersistenceClient implements IDBClient<PrismaClient> {
  public client: PrismaClient;

  constructor(
    @inject("AppConfig") private readonly appConfig: IAppConfig,
  ) {
    this.client = new PrismaClient({
      datasourceUrl: this.appConfig.databaseUrl
    })
  }

  public getClient(): PrismaClient {
    return this.client;
  }

  public async runClientTransaction(wrapper: (client: PrismaClient) => any[]): Promise<any> {
    return this.getClient().$transaction(
      wrapper(this.getClient())
    )
  }
}
