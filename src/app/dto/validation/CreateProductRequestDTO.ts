import { IsNumber, IsString, MaxLength, Min } from "class-validator";

export class CreateProductRequestDTO {
  @IsString()
  @MaxLength(255)
  name!: string;

  @IsNumber()
  @Min(0)
  price!: number;
}