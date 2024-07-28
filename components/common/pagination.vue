<template>
  <div class="flex items-center justify-center gap-2 py-8">
    <common-button
      :icon="leftIcon"
      :disable="currentPage === 1"
      type="link"
      class="flex size-8 items-center justify-center border border-gray-500 text-title sm:size-12 sm:text-xl"
      @click="prevPage"
    />

    <common-button
      v-for="pageNumber in displayedPages"
      :key="pageNumber"
      :text="pageNumber.toString()"
      :class="currentPage === pageNumber ? 'bg-black text-white' : 'text-title'"
      type="link"
      class="flex size-8 items-center justify-center border border-gray-500 text-title sm:size-12 sm:text-xl"
      @click="navigateToPage(pageNumber)"
    />

    <common-button
      :icon="rightIcon"
      :disable="currentPage === listInfo.last_page"
      type="link"
      class="flex size-8 items-center justify-center border border-gray-500 text-title sm:size-12 sm:text-xl"
      @click="nextPage"
    />
  </div>
</template>

<script setup lang="ts">
import type { Pagination } from "~/types/api";
import leftIcon from "~/assets/icons/left-icon.svg";
import rightIcon from "~/assets/icons/right-icon.svg";

const currentPage = defineModel("page", {
  type: Number,
  default: 1,
});

const props = defineProps({
  listInfo: {
    type: Object as PropType<Pagination>,
    required: true,
  },
});

const router = useRouter();

const displayedPages = computed(() => {
  const pages = [];
  const maxPagesToShow = 5;
  let startPage = Math.max(
    currentPage.value - Math.floor(maxPagesToShow / 2),
    1,
  );
  let endPage = startPage + maxPagesToShow - 1;

  if (endPage > props.listInfo.last_page) {
    endPage = props.listInfo.last_page;
    startPage = Math.max(endPage - maxPagesToShow + 1, 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }
  return pages;
});

const navigateToPage = (pageNumber: number) => {
  currentPage.value = pageNumber;
  router.push(`/?page=${pageNumber}`);
};

const prevPage = () => {
  if (currentPage.value > 1) {
    navigateToPage(currentPage.value - 1);
  }
};

const nextPage = () => {
  if (currentPage.value < props.listInfo.last_page) {
    navigateToPage(currentPage.value + 1);
  }
};
</script>
