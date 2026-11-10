import { ProductDTO } from "../common/ProductDTO";

export class ProductResponseDTO {
  constructor(public readonly product: ProductDTO) {
  }
}