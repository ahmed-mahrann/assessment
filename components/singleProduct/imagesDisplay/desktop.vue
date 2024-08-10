<template>
  <div class="flex h-full items-start gap-6">
    <div class="flex flex-col gap-4">
      <template v-for="(image, index) in slides" :key="image">
        <common-image
          class="rounded-auto flex h-20 w-20 items-center justify-center overflow-hidden"
          img-class="!object-contain unset-size h-auto w-auto max-w-full max-h-full"
          alt="product-image-thumbnail"
          :src="image"
          :class="{
            'outline outline-2 outline-black': currentSlideIndex === index,
          }"
          @click="$emit('select', index)"
        />
      </template>
    </div>
    <common-image
      loaderClass="size-96"
      img-class="!object-contain"
      :src="slides[currentSlideIndex]"
      :alt="product?.title"
    />
  </div>
</template>

<script setup lang="ts">
import { useProductStore } from "~/store/productStore";

defineProps({
  slides: {
    type: Object as PropType<string[]>,
    required: true,
  },
  currentSlideIndex: {
    type: Number,
    default: 0,
  },
});

const productStore = useProductStore();
const { productData: product } = storeToRefs(productStore);
</script>
