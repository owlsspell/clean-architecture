import { inject } from "inversify";
import { IUseCase } from "../IUseCase";
import { IUserableRequest } from "../IUserableRequest";
import { IProductEntity } from "../../entities/Product";
import { IProductRepository } from "../../repositories/IProductRepository";
import { NotFoundException } from "../../../app/errors/NotFoundException";
import { ForbiddenException } from "../../../app/errors/ForbiddenException";
import { IProductAccessControlService } from "../../services/acl/ProductAccessControlService";

export interface IGetProductByIdRequest extends Partial<IUserableRequest> {
  id: string;
}

export interface IGetProductByIdUseCase extends IUseCase<IGetProductByIdRequest, IProductEntity> {}

export class GetProductByIdUseCase implements IGetProductByIdUseCase {
  constructor(
    @inject("ProductRepository") private productRepository: IProductRepository,
    @inject("ProductAccessControlService") private productAccessControlService: IProductAccessControlService,
  ) {}

  async execute(data: IGetProductByIdRequest): Promise<IProductEntity> {
    const { id, userId } = data;
    const product = await this.productRepository.findById(id);
    if (!product) throw new NotFoundException("Product not found.");

    const hasAccess = await this.productAccessControlService.canRead(userId || "", product);
    if (!hasAccess) throw new ForbiddenException("Access denied");

    return product;
  }
}