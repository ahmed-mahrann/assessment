<template>
  <nuxt-layout>
    <nuxt-page />
  </nuxt-layout>
</template>

<script setup lang="ts">
import { useProductStore } from "~/store/productStore";
import { register as registerSwiper } from "swiper/element/bundle";

const productStore = useProductStore();

registerSwiper();
await productStore.fetchProduct();
</script>
