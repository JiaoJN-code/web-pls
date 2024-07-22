<template>
  <div class="container">
    <Breadcrumb :items="['题目管理', '添加知识概念']" />
    <a-row class="wrapper">
      <a-col :span="24">
        <a-form-item field="course" tooltip="关联课程" label="关联课程">
          <a-input
            v-model="course"
            :style="{ width: '320px' }"
            placeholder="请选择关联课程"
            size="large"
          />
        </a-form-item>
        <a-divider />
        <a-row style="margin-bottom: 20px">
          <a-col :span="24">
            <a-space>
              <a-button type="primary" @click="openAddConceptModal">
                <template #icon>
                  <icon-plus />
                </template>
                新增概念
              </a-button>
              <a-button @click="visible = !visible"> 批量导入 </a-button>
            </a-space>
          </a-col>
        </a-row>
        <a-table
          row-key="index"
          :loading="loading"
          :pagination="pagination"
          :columns="(conceptTableColumn as TableColumnData[])"
          :data="data"
          :bordered="false"
          size="medium"
          @page-change="pageChange"
        >
          <template #index="{ rowIndex }">
            {{ rowIndex + 1 + (pagination.current - 1) * pagination.pageSize }}
          </template>
          <template #difficulty="{ record }">
            <a-tag
              :color="
                record.difficulty === 'easy'
                  ? 'green'
                  : record.difficulty === 'medium'
                  ? 'orange'
                  : 'red'
              "
            >
              {{ record.difficulty }}
            </a-tag>
          </template>
        </a-table>
      </a-col>
    </a-row>

    <a-modal v-model:visible="visible" width="auto">
      <template #title> 添加知识概念 </template>
      <a-form ref="conceptRef" :model="conceptItem" :style="{ width: '600px' }">
        <a-form-item field="description" label="概念详情" required>
          <a-input
            v-model="conceptItem.description"
            placeholder="请输入概念详情"
          />
        </a-form-item>
        <a-form-item field="location" label="所在章节" required>
          <a-input
            v-model="conceptItem.location"
            placeholder="请输入概念所在章节"
          />
        </a-form-item>
        <a-form-item field="difficulty" label="概念难度">
          <a-radio-group v-model="conceptItem.difficulty">
            <a-radio value="easy">简单</a-radio>
            <a-radio value="medium">中等</a-radio>
            <a-radio value="hard">困难</a-radio>
          </a-radio-group>
        </a-form-item>
      </a-form>
      <template #footer>
        <a-button @click="visible = !visible">取消</a-button>
        <a-button type="primary" @click="addConceptItem"> 添加 </a-button>
      </template>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
  import { addConcept, getConceptByCourse } from '@/api/questionsManage';
  import { FormInstance, Message, TableColumnData } from '@arco-design/web-vue';
  import { onMounted, reactive, ref } from 'vue';
  import {
    conceptTableColumn,
    Concept,
  } from '../configuration/conceptListConfig';

  const course = ref<string>('');
  const visible = ref<boolean>(false);
  const conceptRef = ref<FormInstance>();
  const loading = ref<boolean>(true);
  const data = ref<Concept[]>([]);
  const pagination = reactive({
    current: 1,
    pageSize: 3,
    total: 0,
  });

  const conceptItem = reactive({
    location: '',
    description: '',
    difficulty: 'easy',
  });

  const openAddConceptModal = () => {
    if (!course.value) {
      Message.error('请先选择课程');
      return;
    }
    visible.value = !visible.value;
  };

  const pageChange = (current: number) => {
    loading.value = true;
    pagination.current = current;
    getConceptByCourse({
      course: course.value,
      current: pagination.current,
      pageSize: pagination.pageSize,
    })
      .then((res) => {
        data.value = res.data.records;
        pagination.total = res.data.total;
      })
      .finally(() => {
        loading.value = false;
      });
  };

  const addConceptItem = () => {
    conceptRef.value?.validate().then((res) => {
      if (!res) {
        addConcept({
          course: course.value,
          description: conceptItem.description,
          difficulty: conceptItem.difficulty,
          location: conceptItem.location,
        }).then((addRes) => {
          if (addRes.data === true) {
            Message.success('添加成功');
            visible.value = !visible.value;
            conceptRef.value?.resetFields();
            loading.value = true;
            getConceptByCourse({
              course: course.value,
              current: pagination.current,
              pageSize: pagination.pageSize,
            })
              .then((getConceptRes) => {
                data.value = getConceptRes.data.records;
                pagination.total = getConceptRes.data.total;
              })
              .finally(() => {
                loading.value = false;
              });
          }
        });
      }
    });
  };

  onMounted(() => {
    getConceptByCourse({
      course: course.value,
      current: pagination.current,
      pageSize: pagination.pageSize,
    })
      .then((res) => {
        data.value = res.data.records;
        pagination.total = res.data.total;
      })
      .finally(() => {
        loading.value = false;
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
