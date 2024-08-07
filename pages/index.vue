<template>
  <sidebar class="basis-1/5" />
  <products-list class="basis-4/5" />
</template>

<script setup lang="ts">
import { useFilterStore } from "~/store/filtersStore";
import { getSelectedFilters } from "~/utils/common";

const filterStore = useFilterStore();
const { selectedFilters, categories, subcategories, filters } =
  storeToRefs(filterStore);

const router = useRouter();

const initialQuery = router.currentRoute.value.query;

await filterStore.fetchCategories();
await filterStore.fetchSubCategories();
await filterStore.fetchOptions();

if (categories.value && subcategories.value && filters.value?.options)
  selectedFilters.value = getSelectedFilters(
    [...categories.value, ...subcategories.value],
    filters.value.options,
    initialQuery,
  );
</script>
