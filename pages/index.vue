<template>
  <sidebar class="basis-1/5" />
  <products-list class="basis-4/5" />
</template>

<script setup lang="ts">
import { useFilterStore } from "~/store/filtersStore";
import type { SelectedFilter } from "~/types/products";

const filterStore = useFilterStore();
const { selectedFilters, categories, subcategories, filters } =
  storeToRefs(filterStore);

const router = useRouter();

const initialQuery = router.currentRoute.value.query;

const getSelectedFilters = () => {
  const result: SelectedFilter[] = [];
  const categoryFilters = [...categories.value!, ...subcategories.value!];

  for (const [type, value] of Object.entries(initialQuery)) {
    const ids = value as string;
    const idArray = ids.split(",");
    if (type === "options") {
      idArray.forEach((id) => {
        filters.value?.options.forEach((element) => {
          const item = element.option_values.find(
            (i) => i.id.toString() === id,
          );
          if (item) {
            result.push({
              type,
              title: item.title,
              id: item.id,
              value: item.value,
            });
          }
        });
      });
    } else if (type === "categories") {
      idArray.forEach((id) => {
        const item = categoryFilters.find((element) => element.id === id);
        if (item) {
          result.push({
            type,
            title: item.title,
            id: item.id,
          });
        }
      });
    } else if (type === "max_price" || type === "min_price") {
      result.push({
        type,
        title: `${idArray.join(" - ")} EGP`,
        id: ids,
      });
    }
  }
  selectedFilters.value = [...result];
};

await filterStore.fetchCategories();
await filterStore.fetchSubCategories();
await filterStore.fetchOptions();
getSelectedFilters();
</script>
