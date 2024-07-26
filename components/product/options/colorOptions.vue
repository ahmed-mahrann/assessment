<template>
  <div class="flex flex-col gap-2 capitalize">
    <h2>
      <span class="font-semibold">{{ `${options.title}:` }}</span>
      {{ selectedColor.title }}
    </h2>
    <div class="flex flex-wrap gap-2">
      <common-button
        v-for="option in options.option_values"
        :key="option.id"
        class="!rounded-full border-2 border-grayBg p-4"
        :class="{ 'outline outline-2': selectedColor.id === option.id }"
        type="link"
        :style="{ backgroundColor: option.value }"
        @clicked="handleSelectColor(option)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ProductOption, OptionValue } from "~/types/api";

const props = defineProps({
  options: {
    type: Object as PropType<ProductOption>,
    required: true,
  },
  initialSelected: {
    type: Object as PropType<OptionValue>,
    required: true,
  },
});

const emit = defineEmits(["selectColor"]);

const selectedColor = ref<OptionValue>(props.initialSelected);

const handleSelectColor = (option: OptionValue) => {
  selectedColor.value = option;
  emit("selectColor", option);
};
</script>
