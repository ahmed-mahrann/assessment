<template>
  <nuxt-link to="/product" class="flex w-60 flex-col items-start">
    <div class="relative">
      <img
        :src="brand.featured_image"
        alt="brand.name"
        class="h-[296px] w-full object-cover"
      />
      <common-button
        :icon="wishlistIcon"
        type="link"
        class="absolute right-2 top-2 !rounded-full bg-white p-2"
      />
    </div>
    <p class="text-lg">{{ brand.title }}</p>
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
