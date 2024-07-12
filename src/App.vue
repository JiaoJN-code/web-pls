<template>
  <a-config-provider>
    <router-view v-if="isRouterAlive" />
    <global-setting />
  </a-config-provider>
</template>

<script lang="ts" setup>
  import GlobalSetting from '@/components/global-setting/index.vue';
  import { nextTick, provide, ref } from 'vue';

  const isRouterAlive = ref(true);
  const reload = () => {
    isRouterAlive.value = false;
    nextTick(() => {
      isRouterAlive.value = true;
    });
  };
  provide('reload', reload);
</script>
