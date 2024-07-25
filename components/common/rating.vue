<template>
  <div>
    <div class="flex items-center gap-1">
      <img
        v-for="(_, index) in Math.floor(5 - rating)"
        :key="index"
        src="@/assets/icons/star-empty.svg"
        class="h-4"
        alt="Star Icon"
      />
      <div v-if="subtext" class="pl-1 text-sm font-light underline">0</div>
    </div>
  </div>
</template>

<script setup lang="ts">
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
