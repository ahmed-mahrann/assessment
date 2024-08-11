<template>
  <div v-show="showFilters" class="hidden flex-col gap-14 pl-9 lg:flex">
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
