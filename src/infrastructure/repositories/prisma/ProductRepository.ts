import { PrismaClient } from "@prisma/client";
import { injectable } from "inversify";
import { BaseRepository } from "./BaseRepository";
import { Price } from "../../../domain/valueObjects/Price";
import { IProductEntity, Product } from "../../../domain/entities/Product";
import { IFindItemsDataSet } from "../../../domain/repositories/IBaseRepository";
import { IProductRepository } from "../../../domain/repositories/IProductRepository";

@injectable()
export class ProductRepository extends BaseRepository implements IProductRepository{
  private get db() {
    return this.DBClient.getClient();
  }

  async findById(id: string): Promise<IProductEntity | null> {
    const product = await this.db.product.findUnique({ where: { id } });
    return product ? ProductRepository.fromPersistence(product) : null;
  }

  async save(product: IProductEntity): Promise<void> {
    await this.db.product.upsert({
      where: { id: product.id },
      update: { name: product.name, price: product.price?.value, stock: product.stock, },
      create: { id: product.id, name: product.name, price: product.price?.value, stock: product.stock, },
    });
  }

  async findItemsByParams(): Promise<IFindItemsDataSet<IProductEntity>> {
    const [products, count] = await this.DBClient.runClientTransaction(
      (client: PrismaClient) => [
        client.product.findMany({ orderBy: { createdAt: "desc" } }),
        client.product.count(),
      ]
    );

    return {
      rows: products?.map((p: any) => ProductRepository.fromPersistence(p)) || [],
      count,
    };
  }

  static fromPersistence(product: any): IProductEntity {
    return Product.create(
      product.id,
      product.name,
      product.description || "",
      new Price(Number(product.price || 0)),
      Number(product.stock || 0),
    )
  }
}