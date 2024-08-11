<template>
  <div v-if="products" class="flex grow flex-col gap-4">
    <filters-filter-bar />

    <div v-if="!loading" class="flex flex-wrap justify-center gap-5">
      <products-item
        v-for="brand in products.data"
        :key="brand.id"
        :brand="brand"
      />
    </div>
    <img v-else :src="loadingIcon" alt="Loading" class="w-56 self-center" />

    <div
      v-show="!products.data.length && !loading"
      class="flex flex-col items-center justify-center gap-2"
    >
      <img :src="emptyIcon" alt="No data" class="w-16" />
      <p class="text-xl">No Products found</p>
    </div>

    <common-pagination
      v-model:page="currentPage"
      :listInfo="products.pagination"
    />
  </div>
</template>

<script setup lang="ts">
import { useProductsStore } from "~/store/productsStore";
import { useFilterStore } from "~/store/filtersStore";
import loadingIcon from "~/assets/icons/loading-icon.svg";
import emptyIcon from "~/assets/icons/empty-indicator.svg";

const productsStore = useProductsStore();
const filterStore = useFilterStore();
const router = useRouter();

const { products, currentPage } = storeToRefs(productsStore);
const { selectedFilters } = storeToRefs(filterStore);

const loading = ref(false);

watchEffect(async () => {
  if (router.currentRoute.value.path === "/") {
    loading.value = true;
    await productsStore.fetchProducts(selectedFilters.value, currentPage.value);
    loading.value = false;
  }
});
</script>
