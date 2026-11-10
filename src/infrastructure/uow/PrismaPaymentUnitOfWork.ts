import { PrismaClient } from "@prisma/client";
import { inject, injectable } from "inversify";
import { IDBClient } from "../persistence/client";
import { OrderRepository } from "../repositories/prisma/OrderRepository";
import { IPaymentUnitOfWork } from "../../domain/repositories/IPaymentUnitOfWork";
import { PaymentRepository } from "../repositories/prisma/PaymentRepository";
import { IOrderRepository } from "../../domain/repositories/IOrderRepository";
import { IPaymentRepository } from "../../domain/repositories/IPaymentRepository";

@injectable()
export class PrismaPaymentUnitOfWork implements IPaymentUnitOfWork {
  constructor(
    @inject("DBClient") private readonly db: IDBClient<PrismaClient>,
  ) {}

  get orderRepository(): IOrderRepository {
    return new OrderRepository(this.db);
  }

  get paymentRepository(): IPaymentRepository {
    return new PaymentRepository(this.db);
  }

  runTransaction<T>(operation: (uow: IPaymentUnitOfWork) => Promise<T>): Promise<T> {
    return this.db.runClientTransaction(
      (): any => operation(this)
    );
  }
}