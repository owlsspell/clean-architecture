import { IOrderRepository } from "./IOrderRepository";
import { IPaymentRepository } from "./IPaymentRepository";

export interface IPaymentUnitOfWork {
  orderRepository: IOrderRepository;
  paymentRepository: IPaymentRepository;
  runTransaction<T>(operation: (uow: IPaymentUnitOfWork) => Promise<T>): Promise<T>;
}