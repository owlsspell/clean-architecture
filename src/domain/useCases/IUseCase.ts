export interface IUseCase<T, R = any> {
  execute: (data: T) => Promise<R>
}