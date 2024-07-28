<template>
  <div
    class="flex items-center gap-2 whitespace-nowrap rounded-md bg-grayBg px-2 py-1"
  >
    <span class="text-xs">{{ item.title }}</span>
    <common-button
      :icon="closeIcon"
      type="link"
      class="w-5"
      @click="$emit('remove')"
    />
  </div>
</template>

<script setup lang="ts">
import type { SelectedFilter } from "~/types/products";
import closeIcon from "~/assets/icons/close-icon.svg";

defineProps({
  item: {
    type: Object as PropType<SelectedFilter>,
    required: true,
  },
});
</script>
