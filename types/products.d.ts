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

export type CategoryResponse = {
  id: string;
  title: string;
  order: number;
};

export type ProductResponse = {
  id: string;
  title: string;
  description: string;
  type: string;
  price: string;
  has_variant: boolean;
  is_in_stock: boolean;
  featured_image: string;
  second_image: string;
  trendy: number;
  best_seller: number;
  featured: number;
  clearance: number;
};

export type SelectedFilter = {
  id: string;
  title: string;
  type: string;
};
