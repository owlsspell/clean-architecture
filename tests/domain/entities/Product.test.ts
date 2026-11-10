import { Price } from "../../../src/domain/valueObjects/Price";
import { IProductEntity, Product } from "../../../src/domain/entities/Product";

describe("Product Entity", () => {
  it("should create a product entity correctly", () => {
    const mockedId = "123";
    const mockedName = "Test Product";
    const mockedDescription = "Test product description";
    const mockedPrice = new Price(100);
    const mockedStock = 2;
    const product: IProductEntity = new Product(mockedId, mockedName, mockedDescription, mockedPrice, mockedStock);
    expect(product).toBeInstanceOf(Product);
    expect(product.id).toBe(mockedId);
    expect(product.name).toBe(mockedName);
    expect(product.description).toBe(mockedDescription);
    expect(product.price.value).toBe(mockedPrice.value);
    expect(product.stock).toBe(mockedStock);
  });
});