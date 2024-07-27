<template>
  <div class="flex w-full flex-col">
    <app-header />
    <navbar />
    <breadcrumb />
    <main class="flex w-full gap-10 md:px-12">
      <slot />
    </main>
  </div>
</template>
