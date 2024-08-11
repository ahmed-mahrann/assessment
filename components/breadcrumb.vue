<template>
  <div class="flex gap-2 border-t px-6 py-5 text-[13px] sm:px-12">
    <nuxt-link to="/"> <common-button text="Home" type="link" /></nuxt-link>
    <span class="text-subtitle">/</span>
    <common-button
      :text="product?.categories?.[0].title || 'Products'"
      type="link"
    />
    <span
      v-if="router.currentRoute.value.path.includes('/product')"
      class="text-subtitle"
      >/</span
    >
    <common-button
      v-if="router.currentRoute.value.path.includes('/product')"
      :text="product?.title || 'Product'"
      type="link"
      class="text-subtitle"
    />
  </div>
</template>

<script setup lang="ts">
import { useProductStore } from "~/store/productStore";

const productStore = useProductStore();
const { productData: product } = storeToRefs(productStore);

const router = useRouter();
</script>
