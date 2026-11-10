export interface IBaseDomainEvent {
  occurredOn: Date
}

export class BaseDomainEvent implements IBaseDomainEvent {
  public occurredOn: Date;

  constructor() {
    this.occurredOn = new Date();
  }
}