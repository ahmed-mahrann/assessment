<template>
  <div class="flex w-1/2 items-center gap-0.5 rounded-md bg-inputBg px-3 py-2">
    <img class="mr-2 opacity-30" :src="searchIcon" />
    <input
      v-model="searchValue"
      type="text"
      :placeholder="
        placeholderTitle ? `Search by ${placeholderTitle}` : 'Search...'
      "
      class="border-none bg-transparent outline-none"
    />
  </div>
</template>

<script setup lang="ts">
import searchIcon from "~/assets/icons/search-icon.svg";

const searchValue = defineModel("value", {
  type: String,
});

defineProps({
  placeholderTitle: {
    type: String,
  },
});
</script>
