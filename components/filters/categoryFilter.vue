<template>
  <filters-filter-list
    v-if="categories"
    title="Categories"
    v-model:selectedFilters="selectedFilters"
    :list="categories"
    :expand="isCatExpanded"
    @expandClicked="isCatExpanded = !isCatExpanded"
    @filter-select="currentPage = 1"
  />
  <filters-filter-list
    v-if="subcategories"
    title="Sub-categories"
    v-model:selectedFilters="selectedFilters"
    :list="subcategories"
    :expand="isSubExpanded"
    @expandClicked="isSubExpanded = !isSubExpanded"
    @filter-select="currentPage = 1"
  />
</template>

<script setup lang="ts">
import { useFilterStore } from "~/store/filtersStore";
import { useProductsStore } from "~/store/productsStore";

const productsStore = useProductsStore();
const filterStore = useFilterStore();

const { currentPage } = storeToRefs(productsStore);
const { categories, selectedFilters, subcategories } = storeToRefs(filterStore);

const isCatExpanded = ref(true);
const isSubExpanded = ref(true);
</script>
