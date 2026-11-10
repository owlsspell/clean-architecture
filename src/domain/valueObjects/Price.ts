export class Price {
  constructor(private readonly amount: number) {
    if (this.amount < 0) throw new Error("Price can not be negative");
  }

  get value(): number {
    return this.amount;
  }
}