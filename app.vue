<template>
  <nuxt-layout>
    <nuxt-page />
  </nuxt-layout>
</template>

<script setup lang="ts">
import { register as registerSwiper } from "swiper/element/bundle";

registerSwiper();
</script>
