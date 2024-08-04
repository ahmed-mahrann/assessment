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
      />
      <div class="flex w-full gap-3">
        <input
          v-model="priceValue[0]"
          class="w-44 rounded-md border border-subtitle bg-grayBg text-center text-lg"
        />
        <input
          v-model="priceValue[1]"
          class="w-44 rounded-md border border-subtitle bg-grayBg text-center text-lg"
        />
      </div>
    </client-only>
  </div>
  <span class="border-t" />
</template>

<script setup lang="ts">
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/antd.css";
import plusIcon from "~/assets/icons/plus.svg";
import minusIcon from "~/assets/icons/minus.svg";

const priceValue = ref([0, 600]);
const isPriceExpanded = ref(true);
</script>
