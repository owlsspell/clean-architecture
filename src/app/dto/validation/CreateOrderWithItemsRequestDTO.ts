import { Type } from "class-transformer";
import { IsArray, IsDate, IsNumber, IsOptional, IsString, IsUUID, Min, ValidateNested } from "class-validator";

export class OrderItemDTO {
  @IsUUID()
  productId!: string;

  @IsNumber()
  @Min(1, { message: "Quantity must be at least 1" })
  quantity!: number;

  @IsNumber()
  @Min(1, { message: "Price must be at least 1" })
  amount!: number;
}

export class CreateOrderWithItemsRequestDTO {
  @IsOptional()
  @IsDate({ message: "Invalid date format" })
  @Type(() => Date)
  date?: Date;

  @IsString()
  status!: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDTO)
  items!: OrderItemDTO[];
}