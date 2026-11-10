import { IOrderItemEntity } from "../entities/OrderItem";
import { OrderCreatedEvent } from "../events/OrderCreatedEvent";
import { EOrderStatus, IOrderEntity, Order } from "../entities/Order";

export class OrderFactory {
  static create(
    id: string | null,
    date: Date,
    status: EOrderStatus = EOrderStatus.PENDING,
    items: IOrderItemEntity[],
  ): IOrderEntity {
    if (!items?.length) throw new Error("Order must have at least one item");

    const order: IOrderEntity = new Order(
      id ?? Order.generateId(),
      date ? new Date(date) : new Date(),
      status
    );

    items?.forEach((item) => {
      order.add(item.id, item.product, item.quantity, item.price)
    });

    // add event
    order.addEvent(new OrderCreatedEvent(order.id));

    return order;
  }
}