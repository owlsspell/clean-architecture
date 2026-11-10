import { ProductDTO } from "../common/ProductDTO";
import { IOrderItemEntity } from "../../../domain/entities/OrderItem";

export class OrderItemDTO {
  constructor(
    public readonly id: string,
    public readonly product: ProductDTO,
    public readonly quantity: number,
    public readonly price: number,
  ) {}

  static fromEntity(item: IOrderItemEntity): OrderItemDTO {
    return new OrderItemDTO(
      item.id,
      ProductDTO.fromEntity(item.product),
      item.quantity,
      item.price?.amount?.value,
    )
  }
}