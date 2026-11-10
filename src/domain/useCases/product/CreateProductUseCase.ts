import { IUseCase } from "../IUseCase";
import { inject, injectable } from "inversify";
import { Price } from "../../valueObjects/Price";
import { IUserableRequest } from "../IUserableRequest";
import { IProductEntity, Product } from "../../entities/Product";
import { IEventDispatcher } from "../../../app/events/EventDispatcher";
import { IProductRepository } from "../../repositories/IProductRepository";
import { ForbiddenException } from "../../../app/errors/ForbiddenException";
import { IProductAccessControlService } from "../../services/acl/ProductAccessControlService";

export interface ICreateProductRequest extends IUserableRequest {
  name: string;
  description: string;
  price: number;
}

export interface ICreateProductUseCase extends IUseCase<ICreateProductRequest, IProductEntity> {}

@injectable()
export class CreateProductUseCase implements ICreateProductUseCase {
  constructor(
    @inject("ProductRepository") private productRepository: IProductRepository,
    @inject("EventDispatcher") private eventDispatcher: IEventDispatcher,
    @inject("ProductAccessControlService") private productAccessControlService: IProductAccessControlService,
  ) {}

  async execute(data: ICreateProductRequest): Promise<IProductEntity> {
    const { name, description, price, userId } = data;
    const hasAccess = await this.productAccessControlService.canCreate(userId);
    if (!hasAccess) throw new ForbiddenException("Access denied");

    const product = Product.create(null, name, description, new Price(price));

    await this.productRepository.save(product);

    product.getEvents()?.forEach(event => {
      this.eventDispatcher.dispatch(event);
    });

    return product;
  }
}