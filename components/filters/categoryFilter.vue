<template>
  <filters-filter-list
    v-if="categories"
    title="Categories"
    v-model:selectedFilters="selectedCategoryFilters"
    :list="categories.data"
    :expand="isExpanded"
    @expandClicked="isExpanded = !isExpanded"
  />
</template>

<script setup lang="ts">
import useCategory from "~/composables/useCategory";

const { categories, selectedCategoryFilters, fetchCategories } = useCategory();

const isExpanded = ref(true);

await fetchCategories();
</script>
