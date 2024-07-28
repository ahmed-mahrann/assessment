<template>
  <div class="flex flex-col gap-4">
    <div
      class="flex w-full items-center justify-between bg-graySurface p-5 hover:cursor-pointer"
      @click="expand = !expand"
    >
      <h2 class="lg:text-[16px] lg:font-bold">Product Details</h2>
      <img
        :src="expand ? minusIcon : plusIcon"
        :alt="expand ? 'minus' : 'plus'"
        class="hover:opacity-70"
      />
    </div>
    <transition name="details">
      <div
        v-if="expand"
        class="ml-4 px-3 py-4"
        v-html="
          product?.details !== ''
            ? product?.details.split('<div>')[0]
            : `<p class='text-center'>No details available for this product at this time</p>`
        "
      />
    </transition>
  </div>
</template>

<script setup lang="ts">
import minusIcon from "~/assets/icons/minus.svg";
import plusIcon from "~/assets/icons/plus.svg";
import { useProductStore } from "~/store/productStore";

const { productData: product } = useProductStore();

const expand = ref(false);
</script>

<style scoped>
.details-enter-active,
.details-leave-active {
  opacity: 1;
  transition:
    padding 300ms ease-in-out,
    opacity 300ms ease-in-out;
}

.details-enter-from,
.details-leave-to {
  padding: 0 12px;
  opacity: 0;
}

.details-enter-to,
.details-leave-from {
  padding: 16px 12px;
  opacity: 1;
}
</style>
