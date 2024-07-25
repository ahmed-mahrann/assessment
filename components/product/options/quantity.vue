<template>
  <div class="flex flex-col gap-2">
    <h3 class="font-bold">Quantity</h3>
    <div class="flex w-full items-center justify-between">
      <div class="flex w-fit items-center border border-subtitle">
        <common-button
          :icon="minusIcon"
          :disabled="quantity === 1"
          type="link"
          class="flex h-10 w-10 items-center justify-center rounded-none bg-grayBg"
          @clicked="decrement"
        />
        <span
          class="flex h-10 w-10 items-center justify-center border-x border-x-subtitle font-bold"
        >
          {{ quantity }}
        </span>
        <common-button
          :icon="plusIcon"
          type="link"
          class="flex h-10 w-10 items-center justify-center rounded-none bg-grayBg"
          @clicked="quantity++"
        />
      </div>
      <div class="flex flex-col items-end">
        <span class="text-lg font-bold">{{ product?.price }}</span>
        <span>each</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useProductStore } from "~/store/productStore";
import minusIcon from "~/assets/icons/minus.svg";
import plusIcon from "~/assets/icons/plus.svg";

const { productData: product } = useProductStore();

const quantity = ref(1);

const decrement = () => {
  if (quantity.value > 1) {
    quantity.value--;
  }
};
</script>
