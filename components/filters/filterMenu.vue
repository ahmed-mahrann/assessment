<template>
  <div class="lg:hidden">
    <div
      class="fixed left-0 top-0 z-10 flex h-full w-full flex-col justify-between gap-4 overflow-auto bg-white transition-transform duration-500"
      :class="isMenuOpen ? 'translate-x-0' : '-translate-x-full'"
    >
      <div class="flex flex-col gap-4">
        <div
          class="flex items-center justify-between border-b px-5 py-4 sm:px-10"
        >
          <h1 class="font-bold">
            Filter By
            {{ selectedFilters.length ? `(${selectedFilters.length})` : "" }}
          </h1>
          <common-button
            :icon="closeIcon"
            type="link"
            @click="isMenuOpen = false"
          />
        </div>
        <div class="flex flex-col gap-3 px-5 sm:px-10">
          <filters-category-filter />
          <filters-options />
        </div>
      </div>

      <div
        class="flex items-center justify-between px-5 py-3 text-[16px] font-bold sm:px-10"
      >
        <common-button
          text="Clear All"
          type="outline"
          class="h-12 px-3"
          @click="clearAllFilters"
        />
        <common-button
          :text="`View ${productsStore.products?.data.length} items`"
          type="solid"
          class="h-12 px-3"
          @click="isMenuOpen = false"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFilterStore } from "~/store/filtersStore";
import { useProductsStore } from "~/store/productsStore";
import closeIcon from "~/assets/icons/close-icon.svg";

const isMenuOpen = defineModel("menu", {
  type: Boolean,
  default: false,
});

const productsStore = useProductsStore();
const filterStore = useFilterStore();
const { selectedFilters } = storeToRefs(filterStore);

const clearAllFilters = () => {
  selectedFilters.value = [];
};
</script>
