import express, { Router } from "express";
import { IAppRouter } from "./IAppRouter";
import { inject, injectable } from "inversify";
import { validateByDTO } from "../../app/middlewares/validator";
import { CreateProductRequestDTO } from "../../app/dto/validation/CreateProductRequestDTO";
import { ProductController } from "../controllers/ProductController";

@injectable()
export class ProductRoutes implements IAppRouter {
  private readonly router: Router;

  constructor(@inject("ProductController") private readonly productController: ProductController) {
    this.router = express.Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post("/", validateByDTO(CreateProductRequestDTO), this.productController.create.bind(this.productController));
    this.router.get("/", this.productController.search.bind(this.productController));
    this.router.get("/:id", this.productController.getById.bind(this.productController));
  }

  public getRouter(): Router {
    return this.router;
  }
}
