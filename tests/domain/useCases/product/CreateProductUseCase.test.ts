import { Product } from "../../../../src/domain/entities/Product";
import { Price } from "../../../../src/domain/valueObjects/Price";
import { IEventDispatcher } from "../../../../src/app/events/EventDispatcher";
import { ForbiddenException } from "../../../../src/app/errors/ForbiddenException";
import { IProductRepository } from "../../../../src/domain/repositories/IProductRepository";
import { IProductAccessControlService } from "../../../../src/domain/services/acl/ProductAccessControlService";

import {
  CreateProductUseCase,
  ICreateProductRequest,
  ICreateProductUseCase,
} from "../../../../src/domain/useCases/product/CreateProductUseCase";

describe("CreateProductUseCase", () => {
  let mockedCreateProductDTO: ICreateProductRequest;
  let createProductUseCase: ICreateProductUseCase;
  let productRepositoryMock: IProductRepository;
  let eventDispatcherMock: Partial<IEventDispatcher>;
  let productAccessControlServiceMock: Partial<IProductAccessControlService>;

  beforeEach(() => {
    mockedCreateProductDTO = {
      name: "Product name",
      description: "Product description",
      price: 456.78,
      userId: "123",
    };

    productRepositoryMock = {
      save: jest.fn().mockResolvedValue(Product.create("123", "Product name", "Product description", new Price(100), 1)),
      findById: jest.fn().mockResolvedValue(Product.create("123", "Product name", "Product description", new Price(100), 1)),
      findItemsByParams: jest.fn().mockResolvedValue({
        rows: Product.create("123", "Product name", "Product description", new Price(100), 1),
        count: 1
      }),
    };
    productAccessControlServiceMock = {
      canCreate: jest.fn().mockResolvedValue(false),
    };
    eventDispatcherMock = {
      dispatch: jest.fn(),
    };
    createProductUseCase = new CreateProductUseCase(
      productRepositoryMock as IProductRepository,
      eventDispatcherMock as IEventDispatcher,
      productAccessControlServiceMock as IProductAccessControlService
    );
  });

  it("should create a product if permission is allowed to do so", async () => {
    productRepositoryMock.save = jest.fn().mockResolvedValue(
      Product.create(
        "123",
        mockedCreateProductDTO.name,
        mockedCreateProductDTO.description,
        new Price(mockedCreateProductDTO.price),
        1
      )
    )
    productAccessControlServiceMock.canCreate = jest.fn().mockResolvedValue(true);

    const product = await createProductUseCase.execute(mockedCreateProductDTO);

    expect(productRepositoryMock.save).toHaveBeenCalledWith(product);
    expect(product.getEvents()?.length).toBe(1);
    expect(eventDispatcherMock.dispatch).toHaveBeenCalled();
  });

  it("should throw forbidden exception if user is not allowed to create product", async () => {
    productAccessControlServiceMock.canCreate = jest.fn().mockResolvedValue(false);
    await expect(createProductUseCase.execute(mockedCreateProductDTO)).rejects.toThrow(ForbiddenException);
    expect(productRepositoryMock.save).not.toHaveBeenCalled();
  });
});