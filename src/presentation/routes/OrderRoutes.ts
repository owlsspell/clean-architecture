import express, { Router } from "express";
import { IAppRouter } from "./IAppRouter";
import { inject, injectable } from "inversify";
import { validateByDTO } from "../../app/middlewares/validator";
import { IOrderController } from "../controllers/OrderController";
import { CreateOrderWithItemsRequestDTO } from "../../app/dto/validation/CreateOrderWithItemsRequestDTO";

@injectable()
export class OrderRoutes implements IAppRouter {
  private readonly router: Router;

  constructor(@inject("OrderController") private readonly orderController: IOrderController) {
    this.router = express.Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post("/", validateByDTO(CreateOrderWithItemsRequestDTO), this.orderController.create.bind(this.orderController));
    this.router.get("/", this.orderController.search.bind(this.orderController));
    this.router.get("/:id", this.orderController.getById.bind(this.orderController));
  }

  public getRouter(): Router {
    return this.router;
  }
}
