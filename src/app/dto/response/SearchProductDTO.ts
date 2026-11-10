import { ProductDTO } from "../common/ProductDTO";

export class SearchProductDTO {
  constructor(public total: number, public items: ProductDTO[]) {}
}