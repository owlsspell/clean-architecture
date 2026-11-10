import { injectable } from "inversify";
import { BaseRepository } from "./BaseRepository";
import { IPaymentRepository } from "../../../domain/repositories/IPaymentRepository";

@injectable()
export class PaymentRepository extends BaseRepository implements IPaymentRepository {
}