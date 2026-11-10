import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { IBaseController } from "./IBaseController";
import { ErrorDTO } from "../../app/dto/error/ErrorDTO";
import { ProductDTO } from "../../app/dto/common/ProductDTO";
import { HttpResponseStatusCode } from "../../core/enums/http";
import { SearchProductDTO } from "../../app/dto/response/SearchProductDTO";
import { ProductResponseDTO } from "../../app/dto/response/ProductResponseDTO";
import { ICreateProductUseCase } from "../../domain/useCases/product/CreateProductUseCase";
import { IGetProductByIdUseCase } from "../../domain/useCases/product/GetProductByIdUseCase";
import { ISearchProductsByParamsUseCase } from "../../domain/useCases/product/SearchProducstByParamsUseCase";

export interface IProductController extends IBaseController {
}

@injectable()
export class ProductController implements IProductController {
  constructor(
    @inject("CreateProductUseCase") private readonly CreateProductUseCase: ICreateProductUseCase,
    @inject("GetProductByIdUseCase") private readonly GetProductByIdUseCase: IGetProductByIdUseCase,
    @inject("SearchProductsByParamsUseCase") private readonly SearchProductsByParamsUseCase: ISearchProductsByParamsUseCase,
  ) {}

  async create(request: Request, response: Response): Promise<void> {
    try {
      const product = await this.CreateProductUseCase.execute({
        ...(request.body || {}),
        userId: "123" // @TODO Replace it with auth user data
      });
      response
        .status(HttpResponseStatusCode.CREATED)
        .json(new ProductResponseDTO(ProductDTO.fromEntity(product)));
    } catch(error: any) {
      response
        .status(HttpResponseStatusCode.BAD_REQUEST)
        .json(new ErrorDTO(error?.message || error, []));
    }
  }

  async getById(request: Request, response: Response): Promise<void> {
    try {
      const product = await this.GetProductByIdUseCase.execute({
        id: request.params?.id,
      });

      response
        .status(HttpResponseStatusCode.SUCCESS)
        .json(new ProductResponseDTO(ProductDTO.fromEntity(product)));
    } catch(error: any) {
      response
        .status(HttpResponseStatusCode.BAD_REQUEST)
        .json(new ErrorDTO(error?.message || error, []));
    }
  }

  async search(request: Request, response: Response): Promise<void> {
    try {
      const { total, items } = await this.SearchProductsByParamsUseCase.execute(request.body);

      response
        .status(HttpResponseStatusCode.SUCCESS)
        .json(
          new SearchProductDTO(
            total,
            items?.map((product) => ProductDTO.fromEntity(product)),
          )
        );
    } catch(error: any) {
      response
        .status(HttpResponseStatusCode.BAD_REQUEST)
        .json(new ErrorDTO(error?.message || error, []));
    }
  }
}
