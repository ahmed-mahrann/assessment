import { defineStore } from "pinia";
import type {
  CategoriesResponse,
  SelectedFilter,
  CategoryRecord,
  OptionsResponse,
  FilterOptionsRecord,
} from "~/types/products";

export const useFilterStore = defineStore("filter-store", () => {
  const runtimeConfig = useRuntimeConfig();
  const categories = ref<CategoryRecord[] | undefined>();
  const subcategories = ref<CategoryRecord[] | undefined>();
  const options = ref<FilterOptionsRecord[] | undefined>();
  const showFilters = ref(false);

  const selectedFilters = ref<SelectedFilter[]>([]);
  const loading = ref(false);

  const cat_api = runtimeConfig.public.api_categories_url;
  const subcat_api = runtimeConfig.public.api_subcategories_url;
  const options_api = runtimeConfig.public.api_categories_url;

  const fetchCategories = async () => {
    loading.value = true;

    try {
      const { data: res } = await useAsyncData("categories", () =>
        $fetch<CategoriesResponse>(cat_api),
      );
      if (!res.value?.data) {
        console.error("No data returned");
      } else {
        categories.value = res.value.data;
      }
      loading.value = false;
    } catch (err) {
      console.error(err);
    }
  };

  const fetchSubCategories = async () => {
    loading.value = true;

    try {
      const { data: res } = await useAsyncData("sub-categories", () =>
        $fetch<CategoriesResponse>(subcat_api),
      );
      if (!res.value?.data) {
        console.error("No data returned");
      } else {
        subcategories.value = res.value.data;
      }
      loading.value = false;
    } catch (err) {
      console.error(err);
    }
  };

  const fetchOptions = async () => {
    loading.value = true;

    try {
      const { data: res } = await useAsyncData("options", () =>
        $fetch<OptionsResponse>(options_api),
      );
      if (!res.value?.data) {
        console.error("No data returned");
      } else {
        options.value = res.value.data;
      }
      loading.value = false;
    } catch (err) {
      console.error(err);
    }
  };

  return {
    categories,
    subcategories,
    options,
    loading,
    selectedFilters,
    showFilters,
    fetchCategories,
    fetchSubCategories,
    fetchOptions,
  };
});
