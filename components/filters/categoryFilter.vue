<template>
  <filters-filter-list
    v-if="categories"
    title="Categories"
    v-model:selectedFilters="selectedFilters"
    :list="categories"
    :expand="isCatExpanded"
    @expandClicked="isCatExpanded = !isCatExpanded"
  />
  <filters-filter-list
    v-if="subcategories"
    title="Sub-categories"
    v-model:selectedFilters="selectedFilters"
    :list="subcategories"
    :expand="isSubExpanded"
    @expandClicked="isSubExpanded = !isSubExpanded"
  />
</template>

<script setup lang="ts">
import { useFilterStore } from "~/store/filtersStore";

const filterStore = useFilterStore();
const { categories, selectedFilters, subcategories } = storeToRefs(filterStore);

const isCatExpanded = ref(true);
const isSubExpanded = ref(true);

await filterStore.fetchCategories();
await filterStore.fetchSubCategories();
</script>
