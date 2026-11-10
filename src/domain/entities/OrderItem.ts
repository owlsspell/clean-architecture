import { Money } from "../valueObjects/Money";
import { BaseEntity, IBaseEntity } from "./BaseEntity";
import { IProductEntity } from "./Product";

export interface IOrderItemEntity extends IBaseEntity {
  price: Money;
  quantity: number;
  product: IProductEntity;
}

export class OrderItem extends BaseEntity implements IOrderItemEntity {
  constructor(
    public readonly id: string,
    public product: IProductEntity,
    public quantity: number,
    public price: Money,
  ) {
    super();
  }
}