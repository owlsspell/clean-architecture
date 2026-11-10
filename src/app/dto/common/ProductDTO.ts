import { IProductEntity } from "../../../domain/entities/Product";

export class ProductDTO {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly description: string,
    public readonly price: number,
    public readonly stock: number,
  ) {}

  static fromEntity(product: IProductEntity): ProductDTO {
    return new ProductDTO(
      product.id,
      product.name,
      product.description,
      product.price.value,
      product.stock,
    )
  }
}