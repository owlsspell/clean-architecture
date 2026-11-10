import { inject } from "inversify";
import { IUseCase } from "../IUseCase";
import { IProductEntity } from "../../entities/Product";
import { IProductRepository } from "../../repositories/IProductRepository";

export interface ISearchProductsByParamsRequest {

}

export interface ISearchProductsByParamsResponse {
  total: number;
  items: IProductEntity[];
}

export interface ISearchProductsByParamsUseCase extends IUseCase<ISearchProductsByParamsRequest, ISearchProductsByParamsResponse> {}

export class SearchProductsByParamsUseCase implements ISearchProductsByParamsUseCase {
  constructor(
    @inject("ProductRepository") private productRepository: IProductRepository,
  ) {}

  // @ts-ignore
  async execute(data: ISearchProductsByParamsRequest): Promise<ISearchProductsByParamsResponse> {
    const { rows: products, count } = await this.productRepository.findItemsByParams();

    return {
      total: count,
      items: products,
    };
  }
}