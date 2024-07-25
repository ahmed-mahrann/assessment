<template>
  <div class="flex w-[40vw] flex-col gap-5">
    <div class="border-b pb-5">
      <h1>{{ product?.title }}</h1>
      <common-rating :rating="product?.featured" :subtext="true" />
      <p>{{ product?.price }}</p>
    </div>
    <div class="flex flex-col gap-4">
      <product-options-color-options
        v-if="colorOptions && initialColorSelected"
        :options="colorOptions"
        :initialSelected="initialColorSelected"
      />

      <product-options-text-options
        v-if="textOptions && initialTextSelected"
        :options="textOptions"
        :initialSelected="initialTextSelected"
      />

      <product-options-quantity />
    </div>

    <div class="grid h-14 grid-cols-3 gap-4">
      <common-button
        text="Add to Cart"
        class="col-span-2 place-content-center"
      />
      <common-button
        text="Wishlist"
        type="outline"
        class="col-span-1 place-content-center"
      >
        <img :src="wishlistIcon" alt="wishlist" />
      </common-button>
    </div>
    <p>{{ product?.description }}</p>

    <div
      class="flex h-20 items-center justify-around border border-subtitle/50 bg-surface"
    >
      <div class="flex flex-col items-center gap-1">
        <img :src="deliveryIcon" alt="delivery" />
        <span class="text-xs underline">Shipping terms & conditions</span>
      </div>
      <span class="h-10 border-r border-subtitle/50" />
      <div class="flex flex-col items-center gap-1">
        <img :src="returnBagIcon" alt="returnPolicy" />
        <span class="text-xs underline">Exchange and Return Policy</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useProductStore } from "~/store/productStore";
import wishlistIcon from "~/assets/icons/wishlistColored.svg";
import deliveryIcon from "~/assets/icons/delivery.svg";
import returnBagIcon from "~/assets/icons/bag.svg";

const { productData: product } = useProductStore();

const getOptions = (type: string) => {
  return {
    options: product?.options?.find((option) => option.type === type),
    initialValue: product?.default_variant?.option_values?.find(
      (option) => option.type === type,
    ),
  };
};

const { options: colorOptions, initialValue: initialColorSelected } =
  getOptions("COLOR");
const { options: textOptions, initialValue: initialTextSelected } =
  getOptions("TEXT");
</script>
