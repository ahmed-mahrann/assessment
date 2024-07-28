import type {
  BaseResponse,
  CategoryResponse,
  SelectedFilter,
} from "~/types/products";

export default function useCategory() {
  const runtimeConfig = useRuntimeConfig();
  const api = runtimeConfig.public.api_categories_url;

  const selectedCategoryFilters = useState<SelectedFilter[]>(
    "selected-category-filters",
    () => [],
  );

  const categories = useState<BaseResponse<CategoryResponse[]> | null>(
    "categories",
    () => null,
  );

  const fetchCategories = async () => {
    try {
      const res = await fetch(api);
      categories.value = await res.json();
    } catch (err) {
      console.error(err);
    }
  };

  return { categories, selectedCategoryFilters, fetchCategories };
}
