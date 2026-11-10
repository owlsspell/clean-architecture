import { IOrderEntity } from "../../../domain/entities/Order";
import { IOrderItemEntity } from "../../../domain/entities/OrderItem";
import { OrderItemDTO } from "../response/OrderItemDTO";

export class OrderDTO {
  constructor(
    public readonly id: string,
    public readonly date: Date,
    public readonly items: OrderItemDTO[],
  ) {}

  static fromEntity(order: IOrderEntity): OrderDTO {
    return new OrderDTO(
      order.id,
      order.date,
      order.items?.map((item: IOrderItemEntity) => OrderItemDTO.fromEntity(item))
    )
  }
}