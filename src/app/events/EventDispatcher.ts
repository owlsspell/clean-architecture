import { injectable } from "inversify";
import { IBaseDomainEvent } from "../../domain/events/IBaseDomainEvent";

export interface IEventDispatcher {
  register: (eventClass: any, handler: (event: any) => any) => any
  dispatch: (event: IBaseDomainEvent) => void
}

@injectable()
export class EventDispatcher implements IEventDispatcher {
  private handlers: Map<string, ((event: IBaseDomainEvent) => void)[]> = new Map();

  register<T extends IBaseDomainEvent>(eventClass: { new (...args: any[]): T }, handler: (event: T) => any): void {
    const eventName = eventClass.name;
    if (!this.handlers.has(eventName)) {
      this.handlers.set(eventName, []);
    }
    this.handlers.get(eventName)?.push(handler as any);
  }

  dispatch(event: IBaseDomainEvent): void {
    const handlers = this.handlers.get(event.constructor.name);
    if (handlers) {
      handlers.forEach(handler => handler(event));
    }
  }
}