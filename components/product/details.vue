<template>
  <div class="flex flex-col gap-4">
    <div class="bg-graySurface flex w-full items-center justify-between p-5">
      <h2 class="lg:text-[16px] lg:font-bold">Product Details</h2>
      <button class="text-3xl" @click="expand = !expand">
        <img
          :src="expand ? minusIcon : plusIcon"
          :alt="expand ? 'minus' : 'plus'"
          class="hover:opacity-70"
        />
      </button>
    </div>
    <transition name="details">
      <div v-if="expand" class="px-5 py-8">
        {{ product?.description }}
      </div>
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
    padding 150ms ease-in-out,
    opacity 160ms ease-in-out;
}

.details-enter-from,
.details-leave-to {
  padding: 0 20px;
  opacity: 0;
}

.details-enter-to,
.details-leave-from {
  padding: 32px 20px;
  opacity: 1;
}
</style>
