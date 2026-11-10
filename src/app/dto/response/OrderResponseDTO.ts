import { OrderDTO } from "../common/OrderDTO";

export class OrderResponseDTO {
  constructor(public readonly order: OrderDTO) {
  }
}