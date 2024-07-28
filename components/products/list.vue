<template>
  <div v-if="products" class="flex grow flex-col gap-4 lg:pt-20">
    <filters-filter-bar />

    <div
      v-if="!loading"
      class="flex flex-wrap justify-center gap-5 lg:justify-normal"
    >
      <products-item
        v-for="brand in products.data"
        :key="brand.id"
        :brand="brand"
      />
    </div>
    <img v-else :src="loadingIcon" alt="Loading" class="w-56 self-center" />

    <div
      v-show="!products.data.length"
      class="flex flex-col items-center justify-center gap-2"
    >
      <img :src="emptyIcon" alt="No data" class="w-16" />
      <p class="text-xl">No Product found</p>
    </div>

    <common-pagination
      v-model:page="currentPage"
      :listInfo="products.pagination"
    />
  </div>
</template>

<script setup lang="ts">
import useProducts from "~/composables/useProducts";
import useCategory from "~/composables/useCategory";
import loadingIcon from "~/assets/icons/loading-icon.svg";
import emptyIcon from "~/assets/icons/empty-indicator.svg";

const { products, fetchProducts } = useProducts();
const { selectedCategoryFilters } = useCategory();
const route = useRoute();
const router = useRouter();

const currentPage = ref(Number(route.query.page) || 1);
const loading = ref(false);

const filterItems = computed(() => {
  return [...selectedCategoryFilters.value];
});

watchEffect(async () => {
  loading.value = true;
  if (filterItems.value.length > 0) {
    currentPage.value = 1;
    router.push(`/?page=${currentPage.value}`);
  }
  await fetchProducts(filterItems.value, currentPage.value);
  loading.value = false;
});
</script>
