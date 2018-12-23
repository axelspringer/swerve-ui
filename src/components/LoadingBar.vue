<template>
  <div class="fixed pin-t h-2 w-screen">
    <div class="bar h-full w-1/4 bg-apple"></div>
  </div>
</template>

<style>
  .bar {
    animation: bar 2s cubic-bezier(0,.51,.99,.5) 0s normal infinite;
  }

  @keyframes bar {
    0% {
      transform-origin: top right;
      transform: translateX(-100%) scaleX(1);
    }

    60% {
      transform-origin: top right;
      transform: translateX(50vw) scaleX(2);
    }

    100% {
      transform-origin: top right;
      transform: translateX(100vw) scaleX(0);
    }
  }
</style>
