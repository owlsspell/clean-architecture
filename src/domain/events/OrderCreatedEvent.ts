import { BaseDomainEvent, IBaseDomainEvent } from "./IBaseDomainEvent";

export class OrderCreatedEvent extends BaseDomainEvent implements IBaseDomainEvent{
  constructor(public readonly orderId: string) {
    super();
  }
}
