import { injectable } from "inversify";
import { BaseRepository } from "./BaseRepository";
import { Product } from "../../../domain/entities/Product";
import { Money } from "../../../domain/valueObjects/Money";
import { Price } from "../../../domain/valueObjects/Price";
import { IOrderItemEntity } from "../../../domain/entities/OrderItem";
import { OrderFactory } from "../../../domain/factories/OrderFactory";
import { OrderItemType, OrderStatus, PrismaClient } from "@prisma/client";
import { EOrderStatus, IOrderEntity } from "../../../domain/entities/Order";
import { IFindItemsDataSet } from "../../../domain/repositories/IBaseRepository";
import { IOrderRepository } from "../../../domain/repositories/IOrderRepository";

export const toDomainOrderStatus = (status: OrderStatus): EOrderStatus => {
  return EOrderStatus[status];
}

export const toPersistenceOrderStatus = (status: EOrderStatus): OrderStatus => {
  return OrderStatus[status];
}

export const fromPersistence = (order: any): IOrderEntity => {
  return OrderFactory.create(
    order.id,
    order.date,
    toDomainOrderStatus(order.status),
    order?.items?.map((item) => ({
      price: new Money(new Price(item.price || 0)),
      quantity: Number(item.quantity || 0),
      product: Product.create(
        item?.product?.id || null,
        item?.product?.name,
        item?.product?.description,
        new Price(Number(item?.product?.price || 0)),
        Number(item?.product?.stock || 0),
      )
    })) || []
  );
}

@injectable()
export class OrderRepository extends BaseRepository implements IOrderRepository {
  private get db() {
    return this.DBClient.getClient();
  }

  async findById(id: string): Promise<IOrderEntity | null> {
    const order = await this.db.order.findUnique({ where: { id } });
    return order ? fromPersistence(order) : null;
  }

  async save(order: IOrderEntity): Promise<void> {
    await this.db.order.upsert({
      where: { id: order.id },
      update: {
        date: order.date,
        status: toPersistenceOrderStatus(order.status),
      },
      create: {
        id: order.id,
        date: order.date,
        status: toPersistenceOrderStatus(order.status),
        items: {
          create: order?.items?.map((item: IOrderItemEntity) => ({
            id: item.id,
            positionId: item?.product?.id,
            positionType: OrderItemType.PRODUCT,
            price: item.price?.amount?.value,
            quantity: item.quantity,
          }))
        } || []
      },
    });
  }

  async findItemsByParams(): Promise<IFindItemsDataSet<IOrderEntity>> {
    const [orders, count] = await this.DBClient.runClientTransaction(
      (client: PrismaClient) => [
        client.order.findMany({ orderBy: { createdAt: "desc" } }),
        client.order.count(),
      ]
    );

    return {
      rows: orders?.map((order: any) => fromPersistence(order)) || [],
      count,
    };
  }
}