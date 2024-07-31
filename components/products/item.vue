<template>
  <nuxt-link to="/product" class="flex w-64 flex-col items-start">
    <div class="relative">
      <img
        :src="brand.featured_image"
        alt="brand.name"
        class="h-64 object-contain"
      />
      <common-button
        :icon="wishlistIcon"
        type="link"
        class="absolute right-4 top-4 !rounded-full bg-white p-2"
      />
    </div>
    <p class="w-full truncate text-lg">{{ brand.title }}</p>
    <p class="text-lg font-bold">{{ brand.price }}</p>
  </nuxt-link>
</template>

<script setup lang="ts">
import type { ProductsRecord } from "~/types/products";
import wishlistIcon from "~/assets/icons/wishlist.svg";

defineProps({
  brand: {
    type: Object as PropType<ProductsRecord>,
    required: true,
  },
});
</script>
