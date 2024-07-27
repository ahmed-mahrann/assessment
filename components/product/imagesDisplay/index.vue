<template>
  <div>
    <product-images-display-desktop
      class="hidden md:flex"
      :slides="slides"
      :current-slide-index="currentSlideIndex"
      @select="handleSelect"
    />

    <product-images-display-mobile class="flex md:hidden" :slides="slides" />
  </div>
</template>

<script setup lang="ts">
import { useProductStore } from "~/store/productStore";
import { useProductVariantStore } from "~/store/productVariantStore";

const { productData: product } = useProductStore();

const currentSlideIndex = ref(0);

const productVariantStore = useProductVariantStore();

const slides = computed(() => {
  const mainImg = product?.featured_image;
  const productMedia = product?.media;

  const variantMedia = productVariantStore.selectedProductVariant?.media;

  let allImgs: (string | undefined)[] = [];

  if (productVariantStore.selectedProductVariant) {
    if (variantMedia) {
      allImgs = [...variantMedia, ...allImgs];
    } else {
      allImgs = [mainImg, ...allImgs];
    }
  } else {
    if (productMedia) {
      allImgs = [...productMedia, ...allImgs];
    } else {
      allImgs = [mainImg, ...allImgs];
    }
  }

  allImgs = allImgs.filter((img) => img);

  return allImgs.length === 0 ? new Array(4) : allImgs;
});

const handleSelect = (index: number) => {
  currentSlideIndex.value = index;
};
</script>
