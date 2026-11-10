import { IProductEntity } from "./Product";
import { Money } from "../valueObjects/Money";
import { BaseEntity, IBaseEntity } from "./BaseEntity";
import { IOrderItemEntity, OrderItem } from "./OrderItem";

export enum EOrderStatus {
  PENDING = "pending",
  PAID = "paid",
  SHIPPED = "shipped",
  DELIVERED = "delivered",
  CANCELED = "canceled",
}

export interface IOrderEntity extends IBaseEntity {
  date: Date;
  status: EOrderStatus;
  items: IOrderItemEntity[];
  getItems(): IOrderItemEntity[];
  add(id: string | null, product: IProductEntity, quantity: number, price: Money): void;
}

export class Order extends BaseEntity implements IBaseEntity {
  constructor(
    public readonly id: string,
    public date: Date = new Date(),
    public status: EOrderStatus = EOrderStatus.PENDING,
    public items: IOrderItemEntity[] = [],
  ) {
    super();
  }

  add(id: string | null, product: IProductEntity, quantity: number, price: Money): void {
    this.items.push(
      new OrderItem(id ?? OrderItem.generateId(), product, quantity, price)
    )
  }

  getItems(): IOrderItemEntity[] {
    return this.items;
  }
}