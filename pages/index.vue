<template>
  <div class="flex flex-col gap-6">
    <div
      v-if="product"
      class="flex w-full flex-col justify-between gap-2 md:flex-row"
    >
      <p class="w-full md:w-[50vw]">Main Content</p>
      <product-options class="w-full md:w-[40vw]" />
    </div>
    <product-details />
    <pre class="w-[80vw] overflow-auto">{{ product }}</pre>
    <div v-if="loading">Loading...</div>
    <div v-if="error">Error loading product.</div>
  </div>
</template>

<script setup lang="ts">
import { useProductStore } from "~/store/productStore";

const { productData: product, loading, error } = useProductStore();
</script>
