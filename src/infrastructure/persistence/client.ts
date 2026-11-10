export interface IDBClient<T> {
  client: T;
  getClient(): T;
  runClientTransaction(wrapper: (client: T) => any[]): any
}