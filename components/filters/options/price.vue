<template>
  <div class="flex flex-col gap-3">
    <div class="flex items-center justify-between">
      <h2 class="lg:text-[16px] lg:font-bold">Price</h2>
      <button class="text-3xl" @click="isPriceExpanded = !isPriceExpanded">
        <img
          :src="isPriceExpanded ? minusIcon : plusIcon"
          :alt="isPriceExpanded ? 'minus' : 'plus'"
          class="hover:opacity-70"
        />
      </button>
    </div>
    <client-only v-if="isPriceExpanded">
      <vue-slider
        v-model="priceValue"
        :min="0"
        :max="1000"
        :interval="1"
        :dotStyle="{ backgroundColor: 'black', border: 'none' }"
        :processStyle="{ backgroundColor: 'black' }"
        :dotSize="16"
        @change="handleChangePrice"
        @error="error"
      />
      <div class="flex w-full justify-center gap-3">
        <div class="relative text-lg">
          <input
            :value="priceValue[0]"
            type="number"
            class="w-36 rounded-md border border-subtitle bg-grayBg py-1 text-center"
            @input="
              (e: any) => (priceValue = [e.target.value || 0, priceValue[1]])
            "
            @change="handleChangePrice"
          />
          <span class="absolute right-0 top-1/2 -translate-y-1/2 pr-2">
            EGP
          </span>
        </div>
        <div class="relative text-lg">
          <input
            :value="priceValue[1]"
            type="number"
            class="w-36 rounded-md border border-subtitle bg-grayBg py-1 text-center"
            @input="
              (e: any) => (priceValue = [priceValue[0], e.target.value || 0])
            "
            @change="handleChangePrice"
          />
          <span class="absolute right-0 top-1/2 -translate-y-1/2 pr-2">
            EGP
          </span>
        </div>
      </div>
      <span v-if="errorMsg !== ''" class="text-red-500">{{ errorMsg }}</span>
    </client-only>
  </div>
  <span class="border-t" />
</template>

<script setup lang="ts">
import type { SelectedFilter } from "~/types/products";
import { useDebounceFn } from "@vueuse/core";
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/antd.css";

import plusIcon from "~/assets/icons/plus.svg";
import minusIcon from "~/assets/icons/minus.svg";

enum ERROR_TYPE {
  VALUE = 1,
  INTERVAL = 2,
  MIN = 3,
  MAX = 4,
  ORDER = 5,
}

const selectedFilters = defineModel("selectedFilters", {
  type: Array as PropType<SelectedFilter[]>,
});

const emit = defineEmits(["filterSelect"]);

const router = useRouter();

const minRoutePrice = Number(router.currentRoute.value.query.min_price) || 0;
const maxRoutePrice = Number(router.currentRoute.value.query.max_price) || 600;

const priceValue = ref<number[]>([minRoutePrice, maxRoutePrice]);
const isPriceExpanded = ref(true);
const errorMsg = ref("");

const handleChangePrice = useDebounceFn(() => {
  if (
    selectedFilters.value?.filter((i) => i.type.includes("price")).length === 0
  ) {
    selectedFilters.value.push({
      id: `${priceValue.value[0]},${priceValue.value[1]}`,
      title: `${priceValue.value[0]} - ${priceValue.value[1]} EGP`,
      type: "max_price",
    });
  } else {
    let index = selectedFilters.value?.findIndex(
      (i) => i.type === "max_price",
    )!;

    if (index !== -1 && selectedFilters.value) {
      selectedFilters.value[index].id =
        `${priceValue.value[0]},${priceValue.value[1]}`;
      selectedFilters.value[index].title =
        `${priceValue.value[0]} - ${priceValue.value[1]} EGP`;
    }
  }
  errorMsg.value = "";
  emit("filterSelect");
}, 1000);

const error = (type: number, msg: string) => {
  switch (type) {
    case ERROR_TYPE.MIN:
      break;
    case ERROR_TYPE.MAX:
      break;
    case ERROR_TYPE.VALUE:
      break;
  }
  errorMsg.value = msg;
};
</script>
