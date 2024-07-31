<template>
  <div v-show="showFilters" class="hidden flex-col gap-14 pl-9 lg:flex">
    <h1 class="whitespace-nowrap p-3 text-xl font-bold">Dining Room Tables</h1>
    <div class="flex flex-col gap-5">
      <filters-category-filter />
      <filters-options />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFilterStore } from "~/store/filtersStore";

const filterStore = useFilterStore();
const { showFilters } = storeToRefs(filterStore);
</script>
