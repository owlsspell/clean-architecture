import { BaseDomainEvent, IBaseDomainEvent } from "./IBaseDomainEvent";

export class ProductCreatedEvent extends BaseDomainEvent implements IBaseDomainEvent{
  constructor(public readonly productId: string, public readonly productName: string) {
    super();
  }
}
