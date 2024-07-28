import { BaseResponse } from "~/types/base";

export interface ProductCustomFields {
  front_back: number;
  combine_page: number;
  rounded_design: number;
  image_format: string;
  type: string;
  logo: number;
  logo_position: number;
}
export interface VariantCustomFields {
  printable_area_width: number;
  printable_area_height: number;
  output_file_width: number;
  output_file_height: number;
}

export type ProductOption = {
  id: string;
  title: string;
  type: string;
  option_values: OptionValue[];
};

export type OptionValue = {
  id: number;
  title: string;
  value: string;
  order: number;
};

export type VariantOption = {
  id: number;
  title: string;
  value: string;
  order: number;
  option_id: string;
  option_title: string;
  type: string;
};

export type Brand = {
  id: string;
  logo: string;
  products_count: number;
  title: string;
};

export type Category = {
  id: string;
  tags: any[];
  title: string;
};

export type Rating = {
  product_ratings: number;
  total_reviews_count: number;
  ratings: number[];
};

export type Bundle = {
  id: string;
  title: string;
  sku_id: string;
  weight: string;
  price: string;
  has_variant: boolean;
  is_in_stock: boolean;
};

export type Brand = {
  id: string;
  title: string;
  sku_id: string;
  weight: string;
  price: string;
  has_variant: boolean;
  is_in_stock: boolean;
};

export type Review = {
  author: string;
  body: string;
  created_at: string;
  is_verified_purchase: boolean;
  rating: number;
  title: string;
};

export type Guide = {
  title: string;
  image_url: string;
};

export type ProductVariant = {
  id: string;
  sku_id: string | null;
  title: string;
  featured_image: string;
  product_title: string;
  product_id: string;
  price: string;
  stock: number;
  sale_price: string;
  media: string[];
  is_in_stock: boolean;
  is_stock_below_threshold: boolean | null;
  specs: any | null;
  image: string;
  option_values: VariantOption[];
  quantity: number;
  custom_fields: VariantCustomFields | null;
  bundles: any | null;
  custom: number;
};

export type ProductRecord = {
  id: string;
  best_seller: number;
  brand?: Brand;
  bundle?: Bundle[];
  can_review: boolean;
  categories?: Category[];
  clearance: number;
  custom?: number;
  custom_fields?: ProductCustomFields;
  default_variant?: ProductVariant;
  delivery_instruction_url: string;
  description: string;
  details: string;
  featured: number;
  featured_image: string;
  has_bundle: boolean;
  has_variant: boolean;
  is_in_stock: boolean;
  media?: string[];
  options?: ProductOption[];
  price: string;
  quantity: number;
  rating?: Rating;
  refund_return_policy_url: string;
  reviews?: Review[];
  sale_percent?: string;
  sale_price?: string;
  second_image: string;
  shipping_instruction_url: string;
  similar_products: Product[];
  size_guides?: Guide[];
  sku_id: string;
  specs: any;
  stock: number;
  stock_threshold: number;
  tags: any[];
  title: string;
  trendy: number;
  value: OptionValue[];
  youtube_video?: string;
};

export type ProductVariantData = {
  variant: ProductVariant;
  available_option_values: number[];
};

export type ProductResponse = BaseResponse<ProductRecord>;
export type ProductVariantResponse = BaseResponse<ProductVariantData>;
