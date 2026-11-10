import { inject } from "inversify";
import { PrismaClient } from "@prisma/client";
import { IDBClient } from "../../persistence/client";

export class BaseRepository {
  constructor(
    @inject("DBClient") protected readonly DBClient: IDBClient<PrismaClient>,
  ) {}
}