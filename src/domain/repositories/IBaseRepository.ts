export interface IFindItemsDataSet<T> {
  count: number;
  rows: T[]
}

export interface IBaseRepository<T> {
  findById(id: string): Promise<T | null>;
  save(entity: T): Promise<void>;
  findItemsByParams(): Promise<IFindItemsDataSet<T>>
}