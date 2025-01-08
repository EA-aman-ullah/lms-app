export interface Pagination {
  hasNextPage: boolean;
  totalPages: number;
  totalRecord: number;
  currentPage: number;
}

export interface FetchResponse<T> {
  status: number;
  message: string;
  pagination: Pagination;
  result: T;
}
