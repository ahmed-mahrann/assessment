<template>
  <div
    class="flex flex-col gap-2 px-6 sm:px-12 lg:flex-row lg:items-center lg:gap-0 lg:px-0"
  >
    <common-button
      :icon="filterIcon"
      type="link"
      @click="openMenu"
      class="flex px-2 py-1 text-title md:pl-2 md:pr-10 lg:mr-3 lg:!rounded-[4px] lg:border lg:border-gray-500"
      data-cy="show-filters-btn"
    >
      <span class="inline font-bold lg:hidden">
        Filter
        {{ filterItems.length > 0 ? `(${filterItems.length})` : "" }}
      </span>
      <span class="hidden whitespace-nowrap lg:inline">
        {{ showFilters ? "Hide Filters" : "Show Filters" }}
      </span>
      <span class="inline border-l pl-2 lg:hidden">
        {{ products?.data.length }} Items</span
      >
    </common-button>
    <div
      class="flex w-fit max-w-64 gap-2 overflow-x-auto scrollbar-hidden min-[430px]:max-w-96 min-[550px]:max-w-[500px]"
    >
      <filters-filter-bar-item
        v-for="item in filterItems"
        :item="item"
        @remove="removeFilter(item)"
      />
    </div>
    <div class="hidden gap-2 border-l pl-3 lg:flex">
      <common-button
        v-if="selectedFilters.length || selectedFilters[0]?.title === ''"
        text="Clear all"
        type="link"
        class="underline"
        @click="
          selectedFilters = [];
          currentPage = 1;
        "
      />
      <span> {{ products?.data.length }} Item(s) </span>
    </div>

    <filters-filter-menu v-model:menu="isMenuOpen" />
  </div>
</template>

<script setup lang="ts">
import type { SelectedFilter } from "~/types/products";
import { useProductsStore } from "~/store/productsStore";
import { useFilterStore } from "~/store/filtersStore";
import filterIcon from "~/assets/icons/filter-icon.svg";

const filterStore = useFilterStore();
const productsStore = useProductsStore();

const { products, currentPage } = storeToRefs(productsStore);
const { selectedFilters, showFilters } = storeToRefs(filterStore);

const isMenuOpen = ref(false);

const filterItems = computed(() => {
  return [...selectedFilters.value];
});

const removeFilter = (filter: SelectedFilter) => {
  selectedFilters.value = selectedFilters.value.filter(
    (item) => item.id !== filter.id,
  );
};

const openMenu = () => {
  if (window.innerWidth < 1024) {
    isMenuOpen.value = true;
  } else {
    showFilters.value = !showFilters.value;
  }
};
</script>
