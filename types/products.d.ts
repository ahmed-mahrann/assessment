import { BaseResponse } from "~/types/base";

export type CategoryRecord = {
  id: string;
  title: string;
  order: number;
};

export type ProductsRecord = {
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

export type ProductsResponse = BaseResponse<ProductsRecord[]>;
export type CategoriesResponse = BaseResponse<CategoryRecord[]>;
export type OptionsResponse = BaseResponse<FilterOptionsRecord[]>;

export type FilterOptionsRecord = {
  price: Price;
  options: ProductOption[];
};

export type ProductOption = {
  id: string;
  title: string;
  type: string;
  option_values: Option[];
};

export type Option = {
  id: number;
  title: string;
  value: string;
  order: number;
  option_id: string;
  option_title: string;
  type: string;
};

export type Price = {
  min_price: number;
  max_price: number;
  currency: string;
};
