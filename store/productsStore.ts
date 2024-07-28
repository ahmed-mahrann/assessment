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
          {} as { [key: string]: string[] },
        );

        const queryString = Object.entries(queryObj)
          .map(([type, filters]) => `filter[v2_${type}]=${filters.join(",")}`)
          .join("&");

        const { data: res } = await useAsyncData(
          `products-${page}-${queryString}`,
          () => $fetch<ProductsResponse>(`${api}?${queryString}&page=${page}`),
        );

        if (!res.value?.data) {
          console.error("No data returned");
        } else {
          products.value = res.value;
        }
        loading.value = false;
      } else {
        const { data: res } = await useAsyncData(`products-${page}`, () =>
          $fetch<ProductsResponse>(`${api}?page=${page}`),
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
