import { defineStore } from "pinia";
import type { ProductResponse, ProductRecord } from "~/types/api";

export const useProductStore = defineStore("product-store", () => {
  const runtimeConfig = useRuntimeConfig();
  const productData = ref<ProductRecord | undefined>({
    id: "a27095e3-8e0d-4efe-9a82-d5b842e32257",
    best_seller: 0,
    title: "Fekra Notebook",
    description: "Fekra Notebook Description",
    sku_id: "",
    price: "EGP 100.00",
    sale_price: "",
    is_in_stock: false,
    can_review: false,
    media: [],
    specs: [],
    reviews: [],
    custom_fields: {
      combine_page: 1,
      front_back: 1,
      image_format: "",
      logo: 1,
      logo_position: 1,
      rounded_design: 1,
      type: "",
    },
    brand: {
      id: "",
      title: "",
      logo: "",
      products_count: 0,
    },
    bundle: [],
    clearance: 0,
    categories: [
      {
        id: "1",
        title: "Extreme",
        tags: [],
      },
    ],
    tags: [],
    similar_products: [],
    options: [
      {
        id: "1",
        title: "Color",
        type: "COLOR",
        option_values: [
          {
            id: 1,
            title: "Black",
            order: 1,
            value: "#000000",
          },
          {
            id: 2,
            title: "Green",
            order: 2,
            value: "#658321",
          },
          {
            id: 3,
            title: "Blue",
            order: 3,
            value: "#123456",
          },
        ],
      },
      {
        id: "2",
        title: "Size",
        type: "TEXT",
        option_values: [
          {
            id: 4,
            title: "S",
            order: 1,
            value: "S",
          },
          {
            id: 5,
            title: "L",
            order: 2,
            value: "L",
          },
          {
            id: 6,
            title: "XL",
            order: 3,
            value: "XL",
          },
        ],
      },
    ],
    custom: 0,
    featured_image: "",
    second_image: "",
    delivery_instruction_url: "",
    refund_return_policy_url: "",
    shipping_instruction_url: "",
    stock: 0,
    stock_threshold: 0,
    quantity: 0,
    sale_percent: "",
    rating: {
      product_ratings: 0,
      ratings: [],
      total_reviews_count: 0,
    },
    details: "",
    featured: 0,
    has_bundle: false,
    has_variant: false,
    size_guides: [],
    trendy: 0,
    value: [],
    default_variant: {
      id: "a27095e3-8e0d-4efe-9a82-d5b842e32257",
      sku_id: "12",
      title: "Fekra Notebook",
      featured_image: "",
      product_title: "Fekra Notebook",
      product_id: "",
      price: "EGP 100.00",
      stock: 0,
      sale_price: "",
      media: [],
      is_in_stock: false,
      is_stock_below_threshold: false,
      specs: [],
      image: "",
      option_values: [
        {
          id: 1,
          title: "Black",
          order: 1,
          value: "#000000",
          option_id: "1",
          option_title: "Color",
          type: "COLOR",
        },
        {
          id: 4,
          title: "S",
          order: 1,
          value: "S",
          option_id: "2",
          option_title: "Size",
          type: "TEXT",
        },
      ],
      quantity: 0,
      bundles: [],
      custom: 0,
      custom_fields: {
        output_file_height: 1,
        output_file_width: 1,
        printable_area_height: 1,
        printable_area_width: 1,
      },
    },
    youtube_video: "",
  });
  const loading = ref(false);
  const error = ref(false);

  const api = runtimeConfig.public.api_url;

  const fetchProduct = async () => {
    loading.value = true;

    try {
      const { data: res } = await useAsyncData("product", () =>
        $fetch<ProductResponse>(api),
      );
      if (!res.value?.data) {
        console.error("No data returned");
      } else {
        productData.value = res.value.data;
      }
      loading.value = false;
    } catch (err) {
      error.value = true;
      console.error(err);
    }
  };

  return {
    productData,
    error,
    loading,
    fetchProduct,
  };
});
