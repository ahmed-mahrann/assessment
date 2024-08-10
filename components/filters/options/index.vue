<template>
  <filters-options-colors
    v-if="colorOptions"
    v-model:selectedFilters="selectedFilters"
    :options="colorOptions"
    @filter-select="currentPage = 1"
  />
  <template v-if="textOptions">
    <filters-options-text
      v-for="options in textOptions"
      v-model:selectedFilters="selectedFilters"
      :options="options"
      @filter-select="currentPage = 1"
    />
  </template>
  <filters-options-price
    v-model:selectedFilters="selectedFilters"
    @filter-select="currentPage = 1"
  />
</template>

<script setup lang="ts">
import { useFilterStore } from "~/store/filtersStore";
import { useProductsStore } from "~/store/productsStore";

const filterStore = useFilterStore();
const productsStore = useProductsStore();

const { filters, selectedFilters } = storeToRefs(filterStore);
const { currentPage } = storeToRefs(productsStore);

const colorOptions = computed(() =>
  filters.value?.options.find((option) => option.type === "COLOR"),
);
const textOptions = computed(() =>
  filters.value?.options.filter((option) => option.type === "TEXT"),
);
</script>
