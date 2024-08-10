<template>
  <div class="flex w-full flex-col items-center gap-4">
    <h1 class="px-5 text-xl font-bold">{{ product?.title }}</h1>

    <swiper-container
      :scrollbar="true"
      :slides-per-view="1"
      :scrollbar-hide="false"
      class="flex w-screen items-center justify-center px-2"
    >
      <swiper-slide v-for="(slideSrc, index) in slides" :key="index">
        <div class="flex h-[50vh] items-center justify-center py-5">
          <common-image
            class="flex h-full w-full items-center justify-center"
            img-class="!object-contain unset-size h-auto w-auto max-w-full max-h-full "
            :src="slideSrc"
            :alt="product?.title"
          />
        </div>
      </swiper-slide>
    </swiper-container>
  </div>
</template>

<script setup lang="ts">
import { useProductStore } from "~/store/productStore";

defineProps({
  slides: {
    type: Object as PropType<string[]>,
    required: true,
  },
});

const productStore = useProductStore();
const { productData: product } = storeToRefs(productStore);
</script>
