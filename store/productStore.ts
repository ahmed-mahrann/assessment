import { defineStore } from "pinia";
import type { ProductResponse, ProductRecord } from "~/types/api";

export const useProductStore = defineStore("product-store", () => {
  const runtimeConfig = useRuntimeConfig();
  const productData = ref<ProductRecord | undefined>();
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
