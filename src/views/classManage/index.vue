<template>
  <div class="container">
    <Breadcrumb :items="['班级管理', '班级信息']" />
    <a-row class="wrapper">
      <a-col :span="24">
        <a-tabs :default-active-key="defaultSelect">
          <a-tab-pane
            v-for="item in manageClass"
            :key="item.id"
            :title="item.className"
          >
            <StudentList :class-id="item.id" />
          </a-tab-pane>
        </a-tabs>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
  import { ClassInfo, getClass } from '@/api/classManage';
  import { onBeforeMount, ref } from 'vue';
  import StudentList from './components/studentList.vue';

  const manageClass = ref<Array<ClassInfo>>([]);
  const defaultSelect = ref<number>();
  onBeforeMount(async () => {
    // 获取登录教师管理的班级
    getClass().then((res) => {
      manageClass.value = res.data;
      defaultSelect.value = res.data[0].id;
    });
  });
</script>

<style scoped>
  .container {
    padding: 0 20px 20px 20px;
  }

  .wrapper {
    padding: 20px 20px 20px 20px;
    min-height: 580px;
    background-color: var(--color-bg-2);
    border-radius: 4px;
  }
</style>
