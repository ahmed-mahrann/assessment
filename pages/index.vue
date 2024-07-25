<template>
  <div class="flex flex-col gap-6">
    <div v-if="product" class="flex w-full justify-between gap-2">
      <p class="w-[50vw]">Main Content</p>
      <product-options />
    </div>
    <product-details />
    <pre>{{ product }}</pre>
    <div v-if="loading">Loading...</div>
    <div v-if="error">Error loading product.</div>
  </div>
</template>

<script setup lang="ts">
import { useProductStore } from "~/store/productStore";

const { productData: product, loading, error } = useProductStore();
</script>
