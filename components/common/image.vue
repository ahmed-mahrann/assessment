<template>
  <div>
    <client-only>
      <div
        v-if="isLoading"
        class="animate-pulse bg-subtitle/50"
        :class="loaderClass"
      />
      <img
        v-show="!isLoading && imageExists && src"
        class="h-full w-full object-fill"
        :class="imgClass"
        :src="src"
        :alt="alt"
        @error="handleImageError"
        @load="handleLoad"
      />

      <img
        v-if="(!isLoading && !imageExists) || !src"
        class="h-full w-full object-fill"
        :src="fallbackSrc"
        :class="imgClass"
        :alt="alt"
      />
      <template #fallback>
        <div class="animate-pulse bg-subtitle/50" :class="loaderClass" />
      </template>
    </client-only>
  </div>
</template>

<script setup lang="ts">
import noPhoto from "~/assets/icons/no-image.png";

defineProps({
  src: {
    type: String,
  },
  fallbackSrc: {
    type: String,
    default: noPhoto,
  },
  imgClass: {
    type: String,
  },
  alt: {
    type: String,
  },
  loaderClass: {
    type: String,
    default: "h-full w-full",
  },
});

const isLoading = ref(true);
const imageExists = ref(true);

const handleImageError = () => {
  isLoading.value = false;
  imageExists.value = false;
};

const handleLoad = () => {
  isLoading.value = false;
};
</script>
