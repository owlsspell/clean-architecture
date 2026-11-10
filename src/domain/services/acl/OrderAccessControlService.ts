import { injectable } from "inversify";
import { IOrderEntity } from "../../entities/Order";
import { IAccessControlService } from "../../../app/services/acl/IAccessControlService";

export interface IOrderAccessControlService extends IAccessControlService<IOrderEntity> {}

@injectable()
export class OrderAccessControlService implements IOrderAccessControlService {
  async canRead(userId: string, resource: IOrderEntity): Promise<boolean> {
    console.log(`canRead -> user ${userId} by product with ID: ${resource?.id}`);
    return !(!userId || !resource);
  }

  async canCreate(userId: string): Promise<boolean> {
    console.log('canCreate -> ', userId);
    return !!userId;
  }

  async canUpdate(userId: string): Promise<boolean> {
    console.log('canUpdate -> ', userId);
    return true;
  }

  async canDelete(userId: string): Promise<boolean> {
    console.log('canDelete -> ', userId);
    return true;
  }
}
