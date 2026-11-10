import { PrismaClient } from "@prisma/client";
import { Container } from "inversify";
import { App, IApp } from "../app/App";
import { IOrderRepository } from "../domain/repositories/IOrderRepository";
import { IPaymentUnitOfWork } from "../domain/repositories/IPaymentUnitOfWork";
import {
  IOrderAccessControlService,
  OrderAccessControlService,
} from "../domain/services/acl/OrderAccessControlService";
import {
  CreateOrderWithItemsUseCase,
  ICreateOrderWithItemsUseCase,
} from "../domain/useCases/order/CreateOrderWithItemsUseCase";
import { OrderRepository } from "../infrastructure/repositories/prisma/OrderRepository";
import { PrismaPaymentUnitOfWork } from "../infrastructure/uow/PrismaPaymentUnitOfWork";
import { IOrderController, OrderController } from "../presentation/controllers/OrderController";
import { OrderRoutes } from "../presentation/routes/OrderRoutes";
import { IServer, Server } from "../server/Server";
import AppConfig, { IAppConfig } from "./app.config";
import { PrismaPersistenceClient } from "./prisma.config";
import { IAppRouter } from "../presentation/routes/IAppRouter";
import { IDBClient } from "../infrastructure/persistence/client";
import { ProductRoutes } from "../presentation/routes/ProductRoutes";
import { ErrorHandler, IErrorHandler } from "../app/middlewares/errorHandler";
import { IProductRepository } from "../domain/repositories/IProductRepository"
import { EventDispatcher, IEventDispatcher } from "../app/events/EventDispatcher";
import { ProductRepository } from "../infrastructure/repositories/prisma/ProductRepository"
import { IProductController, ProductController } from "../presentation/controllers/ProductController";
import { CreateProductUseCase, ICreateProductUseCase } from "../domain/useCases/product/CreateProductUseCase";
import { GetProductByIdUseCase, IGetProductByIdUseCase } from "../domain/useCases/product/GetProductByIdUseCase";

import {
  ISearchProductsByParamsUseCase,
  SearchProductsByParamsUseCase,
} from "../domain/useCases/product/SearchProducstByParamsUseCase";

import {
  IProductAccessControlService,
  ProductAccessControlService,
} from "../domain/services/acl/ProductAccessControlService";

const container = new Container();

container.bind<IProductRepository>("ProductRepository").to(ProductRepository);
container.bind<IOrderRepository>("OrderRepository").to(OrderRepository);


container.bind<IEventDispatcher>("EventDispatcher").to(EventDispatcher);
container.bind<ICreateOrderWithItemsUseCase>("CreateOrderWithItemsUseCase").to(CreateOrderWithItemsUseCase);
container.bind<ICreateProductUseCase>("CreateProductUseCase").to(CreateProductUseCase);
container.bind<IGetProductByIdUseCase>("GetProductByIdUseCase").to(GetProductByIdUseCase);
container.bind<ISearchProductsByParamsUseCase>("SearchProductsByParamsUseCase").to(SearchProductsByParamsUseCase);
container.bind<IProductAccessControlService>("ProductAccessControlService").to(ProductAccessControlService);
container.bind<IOrderAccessControlService>("OrderAccessControlService").to(OrderAccessControlService);

container.bind<IProductController>("ProductController").to(ProductController);
container.bind<IOrderController>("OrderController").to(OrderController);

container.bind<IAppRouter>("ProductRoutes").to(ProductRoutes);
container.bind<IAppRouter>("OrderRoutes").to(OrderRoutes);

container.bind<IErrorHandler>("ErrorHandler").to(ErrorHandler);
container.bind<IAppConfig>("AppConfig").to(AppConfig);
container.bind<IApp>("App").to(App);
container.bind<IDBClient<PrismaClient>>("DBClient").to(PrismaPersistenceClient);
container.bind<IPaymentUnitOfWork>("PaymentUnitOfWork").to(PrismaPaymentUnitOfWork);
container.bind<IServer>("Server").to(Server);

export { container };