import { defineStore } from "pinia";
import type { ProductsResponse, SelectedFilter } from "~/types/products";

export const useProductsStore = defineStore("products-store", () => {
  const runtimeConfig = useRuntimeConfig();

  const products = ref<ProductsResponse | undefined>();
  const loading = ref(false);
  const error = ref(false);

  const api = runtimeConfig.public.api_products_url;

  const fetchProducts = async (query?: SelectedFilter[], page: number = 1) => {
    loading.value = true;
    try {
      if (query && query.length > 0) {
        const queryObj = query.reduce(
          (acc, item) => {
            if (!acc[item.type]) {
              acc[item.type] = [];
            }
            acc[item.type].push(item.id);

            return acc;
          },
          {} as { [key: string]: (string | number)[] },
        );

        const queryString = Object.entries(queryObj)
          .map(([type, filters]) =>
            type === "options"
              ? `filter[options]=${filters.join(",")}`
              : type === "price"
                ? `filter[max_price]=${filters[1]}&filter[min_price]=${filters[0]}`
                : `filter[v2_categories]=${filters.join(",")}`,
          )
          .join("&");

        const { data: res } = await useAsyncData(
          `products-${page}-${queryString}`,
          () =>
            $fetch<ProductsResponse>(
              `${api}?${queryString}&page=${page}&per_600page=30`,
            ),
        );

        if (!res.value?.data) {
          console.error("No data returned");
        } else {
          products.value = res.value;
        }
        loading.value = false;
      } else {
        const { data: res } = await useAsyncData(`products-${page}`, () =>
          $fetch<ProductsResponse>(`${api}?page=${page}&per_page=30`),
        );

        if (!res.value?.data) {
          console.error("No data returned");
        } else {
          products.value = res.value;
        }
        loading.value = false;
      }
    } catch (err) {
      console.error(err);
      error.value = true;
    }
  };
  return {
    products,
    error,
    loading,
    fetchProducts,
  };
});
