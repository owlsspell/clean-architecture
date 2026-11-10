import { BaseEntity, IBaseEntity } from "./BaseEntity";
import { Price } from "../valueObjects/Price";
import { ProductCreatedEvent } from "../events/ProductCreatedEvent";

export interface IProductEntity extends IBaseEntity {
  name: string;
  description: string;
  price: Price;
  stock: number;
}

export class Product extends BaseEntity implements IProductEntity {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public price: Price,
    public stock: number,
  ) {
    super();
  }

  static create(id: string | null, name: string, description: string, price: Price, stock: number = 0): IProductEntity {
    const product = new Product(
      id || Product.generateId(),
      name,
      description,
      price,
      stock
    );

    // add event
    product.addEvent(new ProductCreatedEvent(product.id, product.name));

    return product;
  }
}