<template>
  <div class="container">
    <Breadcrumb :items="['个人中心', '用户设置']" />
    <a-row style="margin-bottom: 16px">
      <a-col :span="24">
        <UserPanel />
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
  import UserPanel from './components/user-panel.vue';
</script>

<style scoped>
  .container {
    padding: 0 20px 20px 20px;
  }
</style>
