import { IUseCase } from "../IUseCase";
import { inject, injectable } from "inversify";
import { Money } from "../../valueObjects/Money";
import { Price } from "../../valueObjects/Price";
import { IUserableRequest } from "../IUserableRequest";
import { IOrderItemEntity } from "../../entities/OrderItem";
import { OrderFactory } from "../../factories/OrderFactory";
import { EOrderStatus, IOrderEntity } from "../../entities/Order";
import { IOrderRepository } from "../../repositories/IOrderRepository";
import { IEventDispatcher } from "../../../app/events/EventDispatcher";
import { IProductRepository } from "../../repositories/IProductRepository";
import { ForbiddenException } from "../../../app/errors/ForbiddenException";
import { IOrderAccessControlService } from "../../services/acl/OrderAccessControlService";

export interface ICreateOrderWithItemsRequest extends IUserableRequest {
  date: Date;
  status: EOrderStatus;
  items: { productId: string; quantity: number; amount: number; }[];
}

export interface ICreateOrderWithItemsUseCase extends IUseCase<ICreateOrderWithItemsRequest, IOrderEntity> {}

@injectable()
export class CreateOrderWithItemsUseCase implements ICreateOrderWithItemsUseCase {
  constructor(
    @inject("ProductRepository") private productRepository: IProductRepository,
    @inject("EventDispatcher") private eventDispatcher: IEventDispatcher,
    @inject("OrderAccessControlService") private orderAccessControlService: IOrderAccessControlService,
    @inject("OrderRepository") private orderRepository: IOrderRepository,
  ) {}

  async execute(data: ICreateOrderWithItemsRequest): Promise<IOrderEntity> {
    const { items, status, date, userId } = data;
    const hasAccess = await this.orderAccessControlService.canCreate(userId);
    if (!hasAccess) throw new ForbiddenException("Access denied");

    // Enrich items with all required data
    const enrichedItems = await Promise.all(
      items.map(
        async ({ productId, amount, quantity }) => ({
          quantity,
          price: new Money(new Price(Number(amount || 0))),
          product: await this.productRepository.findById(productId),
        }) as IOrderItemEntity
      )
    );

    const order = OrderFactory.create(null, date, status, enrichedItems);

    await this.orderRepository.save(order);

    order.getEvents()?.forEach(event => {
      this.eventDispatcher.dispatch(event);
    });

    return order;
  }
}