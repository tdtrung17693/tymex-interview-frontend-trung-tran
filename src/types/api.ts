export type Pagination = {
  page: number;
  limit: number;
  total: number;
};

export type ApiResponse<T> = {
  data: T;
  pagination: Pagination;
};


