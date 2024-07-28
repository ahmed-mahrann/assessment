<template>
  <div class="flex flex-col gap-7">
    <div class="flex flex-col gap-2 border-b pb-5">
      <h1 class="hidden text-xl font-bold md:block">{{ product?.title }}</h1>
      <common-rating :rating="product?.featured" :subtext="true" />
      <p class="text-xl font-bold">{{ product?.price }}</p>
    </div>
    <div class="flex flex-col gap-4">
      <single-product-options-color-options
        v-if="colorOptions && initialColorSelected"
        :options="colorOptions"
        :initialSelected="initialColorSelected"
        @select-color="
          async (option, id) => await handleSelectOption(id, option.id)
        "
      />

      <single-product-options-text-options
        v-if="textOptions && initialTextSelected"
        :options="textOptions"
        :initialSelected="initialTextSelected"
        @select-option="
          async (option, id) => await handleSelectOption(id, option.id)
        "
      />

      <single-product-options-quantity />
    </div>

    <div class="flex flex-col gap-4 sm:flex-row">
      <common-button
        text="Add to Cart"
        class="flex h-14 items-center justify-center text-lg font-bold sm:basis-2/3"
      />
      <common-button
        text="Wishlist"
        type="outline"
        class="flex h-14 items-center justify-center text-lg font-bold sm:basis-1/3"
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
        <span class="text-center text-xs underline">
          Shipping terms & conditions
        </span>
      </div>
      <span class="h-10 border-r border-subtitle/50" />
      <div class="flex flex-col items-center gap-1">
        <img :src="returnBagIcon" alt="returnPolicy" />
        <span class="text-center text-xs underline">
          Exchange and Return Policy
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useProductStore } from "~/store/productStore";
import { useProductVariantStore } from "~/store/productVariantStore";
import wishlistIcon from "~/assets/icons/wishlistColored.svg";
import deliveryIcon from "~/assets/icons/delivery.svg";
import returnBagIcon from "~/assets/icons/bag.svg";

const { productData: product } = useProductStore();
const productVariantStore = useProductVariantStore();

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

const appliedOptionsIds = computed<number[]>(
  () =>
    productVariantStore.selectedProductVariant?.option_values.map(
      (items) => items.id,
    ) || [],
);

const handleSelectOption = async (optionId: string, optionValueId: number) => {
  if (!appliedOptionsIds.value.includes(optionValueId)) {
    if (productVariantStore.selectedOptions[optionId]) {
      const temp = { ...productVariantStore.selectedOptions };

      delete temp[optionId];
      temp[optionId] = optionValueId;

      productVariantStore.selectedOptions = temp;
    } else {
      productVariantStore.selectedOptions[optionId] = optionValueId;
    }

    await productVariantStore.fetchProductVariant(
      Object.values(productVariantStore.selectedOptions),
    );
  }
};
</script>
