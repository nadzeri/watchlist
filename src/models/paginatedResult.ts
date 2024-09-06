export interface PaginatedResult<T> {
  Search: T[];
  totalResults: number;
  Response: 'True' | 'False';
}
