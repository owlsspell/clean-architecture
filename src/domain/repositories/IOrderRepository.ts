import { IOrderEntity } from "../entities/Order";
import { IBaseRepository } from "./IBaseRepository";

export interface IOrderRepository extends IBaseRepository<IOrderEntity> {
}
