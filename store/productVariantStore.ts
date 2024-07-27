import { defineStore } from "pinia";
import type { ProductVariantResponse, ProductVariantData } from "~/types/api";

export const useProductVariantStore = defineStore(
  "product-variant-store",
  () => {
    const runtimeConfig = useRuntimeConfig();

    const productVariantData = ref<ProductVariantData>();
    const selectedOptions = ref<{ [key: string]: number }>({});
    const isLoading = ref(false);

    const selectedProductVariant = computed(
      () => productVariantData.value?.variant,
    );
    const availableOptionValues = computed(
      () => productVariantData.value?.available_option_values,
    );

    const api = runtimeConfig.public.api_variant_url;

    const fetchProductVariant = async (optionValueIds?: number[]) => {
      isLoading.value = true;
      const filterQuery = optionValueIds
        ? `?filter[options]=${optionValueIds.join(",")}`
        : "";

      try {
        const { data: res } = await useAsyncData("product-variant", () =>
          $fetch<ProductVariantResponse>(`${api}${filterQuery}`),
        );

        isLoading.value = false;
        productVariantData.value = res.value?.data;
      } catch (err) {
        console.error(err);
        isLoading.value = false;
      }
    };

    const clearSelectedOptions = () => {
      productVariantData.value = undefined;
      isLoading.value = false;
      selectedOptions.value = {};
    };

    const isOptionValueDisabled = (optionValueId: number) => {
      return !availableOptionValues.value?.includes(optionValueId);
    };

    return {
      isLoading,
      productVariantData,
      selectedProductVariant,
      availableOptionValues,
      selectedOptions,
      fetchProductVariant,
      clearSelectedOptions,
      isOptionValueDisabled,
    };
  },
);
