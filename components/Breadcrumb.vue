<template>
  <div class="flex gap-2 border-t px-6 py-5 text-[13px] sm:px-12">
    <common-button text="Home" type="link" />
    <span class="text-subtitle">/</span>
    <common-button
      :text="product?.categories?.[0].title || 'Sub Category'"
      type="link"
    />
    <span class="text-subtitle">/</span>
    <common-button
      :text="product?.title || 'Product'"
      type="link"
      class="text-subtitle"
    />
  </div>
</template>

<script setup lang="ts">
import { useProductStore } from "~/store/productStore";

const { productData: product } = useProductStore();
</script>
