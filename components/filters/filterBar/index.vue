<template>
  <div
    class="flex flex-col gap-2 px-6 sm:px-12 lg:flex-row lg:items-center lg:gap-0 lg:px-0"
  >
    <common-button
      :icon="filterIcon"
      type="link"
      @click="openMenu"
      class="flex px-2 py-1 text-title md:pl-2 md:pr-10 lg:mr-3 lg:!rounded-[4px] lg:border lg:border-gray-500"
    >
      <span class="inline font-bold lg:hidden">
        Filter
        {{ filterItems.length > 0 ? `(${filterItems.length})` : "" }}
      </span>
      <span class="hidden whitespace-nowrap lg:inline">Hide Filters</span>
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
    <span class="hidden border-l pl-3 lg:inline">
      {{ products?.data.length }} Items</span
    >

    <filters-filter-menu v-model:menu="isMenuOpen" />
  </div>
</template>

<script setup lang="ts">
import type { SelectedFilter } from "~/types/products";
import useCategory from "~/composables/useCategory";
import { useProductsStore } from "~/store/productsStore";
import filterIcon from "~/assets/icons/filter-icon.svg";

const { selectedCategoryFilters } = useCategory();
const productsStore = useProductsStore();
const { products } = storeToRefs(productsStore);

const isMenuOpen = ref(false);

const filterItems = computed(() => {
  return [...selectedCategoryFilters.value];
});

const removeFilter = (filter: SelectedFilter) => {
  if (filter.type === "categories") {
    selectedCategoryFilters.value = selectedCategoryFilters.value.filter(
      (item) => item.id !== filter.id,
    );
  }
};

const openMenu = () => {
  if (window.innerWidth < 1024) {
    isMenuOpen.value = true;
  }
};
</script>
