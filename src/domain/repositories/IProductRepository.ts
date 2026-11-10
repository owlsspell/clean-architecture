import { IProductEntity } from "../entities/Product";
import { IBaseRepository } from "./IBaseRepository";

export interface IProductRepository extends IBaseRepository<IProductEntity> {
}