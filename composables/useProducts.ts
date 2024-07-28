import type {
  BaseResponse,
  ProductResponse,
  SelectedFilter,
} from "~/types/products";

export default function useProducts() {
  const runtimeConfig = useRuntimeConfig();
  const api = runtimeConfig.public.api_products_url;

  const products = useState<BaseResponse<ProductResponse[]> | null>(
    "products",
    () => null,
  );

  const fetchProducts = async (query?: SelectedFilter[], page: number = 1) => {
    try {
      if (query && query.length > 0) {
        const queryObj = query.reduce((acc, item) => {
          if (!acc[item.type]) {
            acc[item.type] = [];
          }
          acc[item.type].push(item.id);

          return acc;
        }, {} as QueryObject);

        const queryString = Object.entries(queryObj)
          .map(([type, filters]) => `filter[v2_${type}]=${filters.join(",")}`)
          .join("&");

        const res = await fetch(`${api}?${queryString}&page=${page}`);
        products.value = await res.json();
      } else {
        const res = await fetch(`${api}?page=${page}`);
        products.value = await res.json();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return { products, fetchProducts };
}

export type QueryObject = {
  [key: string]: string[];
};
