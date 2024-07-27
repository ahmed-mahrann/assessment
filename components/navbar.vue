<template>
  <nav
    class="flex gap-8 bg-surface py-3 pl-6 sm:pl-12 lg:justify-center lg:pl-0"
  >
    <commonButton
      v-for="button in navigationButtons"
      :text="button"
      type="link"
      class="hidden font-semibold lg:flex"
    />

    <common-button :icon="menuIcon" type="link" class="lg:hidden" />
  </nav>
</template>

<script setup lang="ts">
import menuIcon from "../assets/icons/menu-icon.svg";

const navigationButtons = [
  "Grocery",
  "Electronics",
  "Clothing",
  "Furniture",
  "Toys & Video games",
  "Baby",
  "Beauty",
  "Personal Care",
  "Pets",
  "Sports",
  "Stationery",
  "Brands",
];
</script>
