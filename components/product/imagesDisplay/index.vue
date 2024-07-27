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

const { productData: product } = useProductStore();

const currentSlideIndex = ref(0);

// const productVariantStore = useProductVariantStore();
let productVariantStore: any = { selectedProductVariant: true };

const slides = computed(() => {
  const mainImg = product?.featured_image;
  const productMedia = product?.media;

  // const variantMedia = productVariantStore.selectedProductVariant?.media;
  const variantMedia = [
    "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHByb2R1Y3R8ZW58MHx8MHx8fDA%3D",
  ];

  let allImgs: (string | undefined)[] = [];

  if (productVariantStore.selectedProductVariant) {
    if (variantMedia) {
      allImgs = [mainImg, ...variantMedia, ...allImgs];
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
