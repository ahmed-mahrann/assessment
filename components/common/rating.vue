<template>
  <div>
    <div class="flex items-center gap-1">
      <img
        v-for="(_, index) in Math.floor(5 - rating)"
        :key="index"
        :src="starEmptyIcon"
        class="h-4"
        alt="Star Icon"
      />
      <div v-if="subtext" class="pl-1 text-sm font-light underline">0</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import starEmptyIcon from "~/assets/icons/star-empty.svg";

defineProps({
  rating: {
    type: Number,
    default: 0,
  },
  subtext: {
    type: Boolean,
    default: false,
  },
});
</script>
