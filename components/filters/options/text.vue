<template>
  <div class="flex flex-col gap-4">
    <div class="flex items-center justify-between">
      <h2 class="capitalize lg:text-[16px] lg:font-bold">
        {{ title }}
      </h2>
      <button class="text-3xl" @click="isOptionExpanded = !isOptionExpanded">
        <img
          :src="isOptionExpanded ? minusIcon : plusIcon"
          :alt="isOptionExpanded ? 'minus' : 'plus'"
          class="hover:opacity-70"
        />
      </button>
    </div>
    <div class="flex flex-wrap gap-3">
      <common-button
        v-show="isOptionExpanded"
        v-for="option in options.option_values"
        :key="option.id"
        :text="option.title"
        type="link"
        class="flex items-center justify-center border border-black px-4 py-1 capitalize"
        :class="{
          'bg-black text-white': selectedFilters?.find(
            (item) => item.id === option.id,
          ),
        }"
        data-cy="filter-btn"
        @clicked="handleSelectOption(option)"
      />
    </div>
    <div
      v-show="isOptionExpanded && !options.option_values.length"
      class="flex flex-col items-center justify-center gap-2"
    >
      <img :src="emptyIcon" alt="No data" class="w-8" />
      <p>No {{ title }} found</p>
    </div>
  </div>
  <span class="border-t" />
</template>

<script setup lang="ts">
import type { ProductOption, Option } from "~/types/products";
import type { SelectedFilter } from "~/types/products";
import plusIcon from "~/assets/icons/plus.svg";
import minusIcon from "~/assets/icons/minus.svg";
import emptyIcon from "~/assets/icons/empty-indicator.svg";

const selectedFilters = defineModel("selectedFilters", {
  type: Array as PropType<SelectedFilter[]>,
});

const props = defineProps({
  options: {
    type: Object as PropType<ProductOption>,
    required: true,
  },
});

const isOptionExpanded = ref(true);

const title = ref(props.options.title.split("_").join(" "));

const handleSelectOption = (option: Option) => {
  const index = selectedFilters.value?.findIndex(
    (item) => item.id === option.id,
  );

  if (index !== -1) {
    selectedFilters.value?.splice(index as number, 1);
  } else {
    selectedFilters.value?.push({
      title: option.title,
      id: option.id,
      type: "options",
    });
  }
};
</script>
