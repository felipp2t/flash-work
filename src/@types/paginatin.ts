export interface Pagination<T> {
  totalPages: number;
  size: number;
  number: number;
  totalElements: number;
  numberOfElements: number;
  content: T[]
}
