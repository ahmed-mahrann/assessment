<template>
  <filters-options-colors
    v-if="colorOptions"
    v-model:selectedFilters="selectedFilters"
    :options="colorOptions"
  />
  <template v-if="textOptions">
    <filters-options-text
      v-for="options in textOptions"
      v-model:selectedFilters="selectedFilters"
      :options="options"
    />
  </template>
  <filters-options-price v-model:selectedFilters="selectedFilters" />
</template>

<script setup lang="ts">
import { useFilterStore } from "~/store/filtersStore";

const filterStore = useFilterStore();
const { filters, selectedFilters } = storeToRefs(filterStore);

const colorOptions = computed(() =>
  filters.value?.options.find((option) => option.type === "COLOR"),
);
const textOptions = computed(() =>
  filters.value?.options.filter((option) => option.type === "TEXT"),
);
</script>
