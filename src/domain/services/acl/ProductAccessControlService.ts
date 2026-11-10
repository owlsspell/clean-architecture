import { injectable } from "inversify";
import { IProductEntity } from "../../entities/Product";
import { IAccessControlService } from "../../../app/services/acl/IAccessControlService";

export interface IProductAccessControlService extends IAccessControlService<IProductEntity> {}

@injectable()
export class ProductAccessControlService implements IProductAccessControlService {
  async canRead(userId: string, resource: IProductEntity): Promise<boolean> {
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
