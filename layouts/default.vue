<template>
  <div class="flex w-full flex-col">
    <Header />
    <Navbar />
    <Breadcrumb />
    <main class="flex w-full gap-10 px-12">
      <slot />
    </main>
  </div>
</template>
