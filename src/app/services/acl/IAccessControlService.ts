export interface IAccessControlService<R> {
  canCreate: (userId: string) => Promise<boolean>;
  canRead: (userId: string, resource: R) => Promise<boolean>;
  canUpdate: (userId: string, resource: R) => Promise<boolean>;
  canDelete: (userId: string, resource: R) => Promise<boolean>;
}