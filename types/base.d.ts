export type Meta = {
  code: number;
  errors: string[];
};

export type Pagination = {
  current_page: number;
  last_page: number;
  total: number;
  per_page: number;
};

export type BaseResponse<T = null> = {
  meta: Meta;
  data: T;
  pagination: Pagination;
};
