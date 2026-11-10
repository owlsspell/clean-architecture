import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { OrderDTO } from "../../app/dto/common/OrderDTO";
import { OrderResponseDTO } from "../../app/dto/response/OrderResponseDTO";
import { IBaseController } from "./IBaseController";
import { ErrorDTO } from "../../app/dto/error/ErrorDTO";
import { HttpResponseStatusCode } from "../../core/enums/http";
import { ICreateOrderWithItemsUseCase } from "../../domain/useCases/order/CreateOrderWithItemsUseCase";

export interface IOrderController extends IBaseController {}

@injectable()
export class OrderController implements IOrderController {
  constructor(
    @inject("CreateOrderWithItemsUseCase") private readonly CreateOrderWithItemsUseCase: ICreateOrderWithItemsUseCase,
  ) {}

  async create(request: Request, response: Response): Promise<void> {
    try {
      const order = await this.CreateOrderWithItemsUseCase.execute({
        ...(request.body || {}),
        userId: "123" // @TODO Replace it with auth user data
      });

      response
        .status(HttpResponseStatusCode.CREATED)
        .json(new OrderResponseDTO(OrderDTO.fromEntity(order)));
    } catch(error: any) {
      response
        .status(HttpResponseStatusCode.BAD_REQUEST)
        .json(new ErrorDTO(error?.message || error, []));
    }
  }

  // @ts-ignore
  async getById(request: Request, response: Response): Promise<void> {
    try {
      // const product = await this.GetProductByIdUseCase.execute({
      //   id: request.params?.id,
      // });

      response
        .status(HttpResponseStatusCode.SUCCESS)
        .json([]);
        // .json(new ProductResponseDTO(ProductDTO.fromEntity(product)));
    } catch(error: any) {
      response
        .status(HttpResponseStatusCode.BAD_REQUEST)
        .json(new ErrorDTO(error?.message || error, []));
    }
  }

  // @ts-ignore
  async search(request: Request, response: Response): Promise<void> {
    try {
      // const { total, items } = await this.SearchProductsByParamsUseCase.execute(request.body);

      response
        .status(HttpResponseStatusCode.SUCCESS)
        .json(
          // new SearchProductDTO(
          //   total,
          //   items?.map((product) => ProductDTO.fromEntity(product)),
          // )
          []
        );
    } catch(error: any) {
      response
        .status(HttpResponseStatusCode.BAD_REQUEST)
        .json(new ErrorDTO(error?.message || error, []));
    }
  }
}
