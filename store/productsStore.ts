import { defineStore } from "pinia";
import type { ProductsResponse, SelectedFilter } from "~/types/products";
import { parseQueryString, filtersToQueryObj } from "~/utils/common";

export const useProductsStore = defineStore("products-store", () => {
  const runtimeConfig = useRuntimeConfig();

  const router = useRouter();
  const currentPage = ref(Number(router.currentRoute.value.query.page) || 1);

  const products = ref<ProductsResponse | undefined>();
  const loading = ref(false);
  const error = ref(false);

  const api = runtimeConfig.public.api_products_url;

  const fetchProducts = async (query?: SelectedFilter[], page: number = 1) => {
    loading.value = true;
    try {
      if (query) {
        const queryObj = filtersToQueryObj(query);

        const queryString = Object.entries(queryObj)
          .map(([type, filters]) =>
            type === "options"
              ? `filter[options]=${filters.join(",")}`
              : type === "max_price" || type == "min_price"
                ? `filter[max_price]=${filters[0].split(",")[1]}&filter[min_price]=${filters[0].split(",")[0]}`
                : `filter[v2_categories]=${filters.join(",")}`,
          )
          .join("&");

        const routeQuery = parseQueryString(queryString);
        if (router.currentRoute.value.path === "/") {
          router.replace({
            path: router.currentRoute.value.path,
            query: { page, ...routeQuery },
          });
        }

        const { data: res } = await useAsyncData(
          `products-${page}-${queryString}`,
          () =>
            $fetch<ProductsResponse>(
              `${api}?${queryString}&page=${page}&per_page=30`,
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
    currentPage,
    fetchProducts,
  };
});
