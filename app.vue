<script setup lang="ts">
import { register as registerSwiper } from "swiper/element/bundle";

registerSwiper();
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtWelcome />
  </div>
</template>
