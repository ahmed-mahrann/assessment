<template>
  <div class="flex flex-col gap-6 pb-32">
    <div
      v-if="product"
      class="flex w-full flex-col justify-between gap-2 md:flex-row"
    >
      <single-product-images-display class="w-full md:w-[45vw]" />
      <single-product-options class="w-full px-5 md:w-[47vw] md:px-0" />
    </div>
    <single-product-details class="px-5 md:px-0" />
    <div v-if="error">Error loading product.</div>
  </div>
</template>

<script setup lang="ts">
import { useProductStore } from "~/store/productStore";
import { useProductVariantStore } from "~/store/productVariantStore";

const { productData: product, error } = useProductStore();

const { clearSelectedOptions, fetchProductVariant } = useProductVariantStore();

clearSelectedOptions();

if (product?.default_variant) {
  await fetchProductVariant();
}
</script>
