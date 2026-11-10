import { Price } from "./Price";

export class Money {
  constructor(
    public readonly amount: Price,
    public readonly currency: string = "USD",
  ) {}

  add(other: Money): Money {
    if (this.currency !== other.currency) {
      throw new Error("Different currencies");
    }
    return new Money(
      new Price(this.amount.value + other.amount.value),
      this.currency,
    )
  }
}