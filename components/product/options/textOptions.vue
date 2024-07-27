<template>
  <div class="flex flex-col gap-2 capitalize">
    <h2>
      <span class="font-bold"> {{ `${options.title}: ` }}</span>
      <span class="font-medium">Please select</span>
    </h2>
    <div class="flex flex-wrap gap-2">
      <common-button
        v-for="option in options.option_values"
        :key="option.id"
        :text="option.title"
        type="link"
        :disable="isOptionValueDisabled(option.id)"
        class="flex h-6 w-16 items-center justify-center font-bold"
        :class="{
          'bg-black text-white': selectedOption.id === option.id,
        }"
        @clicked="handleSelectOption(option)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useProductVariantStore } from "~/store/productVariantStore";
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

const emit = defineEmits<{
  (e: "selectOption", option: OptionValue, id: string): void;
}>();

const { isOptionValueDisabled } = useProductVariantStore();

const selectedOption = ref<OptionValue>(props.initialSelected);

const handleSelectOption = (option: OptionValue) => {
  selectedOption.value = option;
  emit("selectOption", option, props.options.id);
};
</script>
