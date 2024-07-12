<template>
  <a-row style="margin-bottom: 16px">
    <a-col :span="12">
      <a-space>
        <a-button type="primary">
          <template #icon>
            <icon-plus />
          </template>
          新增
        </a-button>
        <a-button @click="visible = !visible"> 批量导入 </a-button>
      </a-space>
    </a-col>
    <a-col
      :span="12"
      style="display: flex; align-items: center; justify-content: end"
    >
      <a-tooltip content="刷新">
        <div class="action-icon" @click="refresh"
          ><icon-refresh size="18"
        /></div>
      </a-tooltip>
    </a-col>
  </a-row>
  <a-table
    row-key="index"
    :loading="loading"
    :pagination="pagination"
    :columns="(studentListColumn as TableColumnData[])"
    :data="data"
    :bordered="false"
    size="medium"
    @page-change="pageChange"
  >
    <template #index="{ rowIndex }">
      {{ rowIndex + 1 + (pagination.current - 1) * pagination.pageSize }}
    </template>
    <template #pagination-right>
      <a-select
        v-model:model-value="pagination.pageSize"
        :style="{ width: '100px' }"
        :options="pageSizeSelect"
        @change="refresh"
      />
    </template>
  </a-table>
  <a-modal v-model:visible="visible">
    <template #title> 批量导入学生信息 </template>
    <a-upload
      draggable
      :auto-upload="false"
      :file-list="fileList"
      @change="uploadChange"
    />
    <template #footer>
      <a-button type="primary" @click="downTemplate">
        <template #icon>
          <icon-download />
        </template>
        下载模板
      </a-button>
      <a-button @click="visible = !visible">取消</a-button>
      <a-button type="primary" :disabled="disabledFlag" @click="submit">
        确定
      </a-button>
    </template>
  </a-modal>
</template>

<script setup lang="ts">
  import { downTemplateByGet, getUserByClassId } from '@/api/classManage';
  import useLoading from '@/hooks/loading';
  import { FileItem, Message, TableColumnData } from '@arco-design/web-vue';
  import { onMounted, reactive, ref } from 'vue';
  import { UserState } from '@/store/modules/user/types';
  import { uploadStudentInfo } from '@/api/user';
  import { studentListColumn } from '../configuration/studentListConfig';

  const prop = defineProps<{
    classId: number;
  }>();

  const fileList = ref<FileItem[]>();

  const disabledFlag = ref(true);

  const pagination = reactive({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const pageSizeSelect: number[] = [10, 20, 50, 100];
  const { loading, setLoading } = useLoading(true);
  const data = ref<UserState[]>([]);
  const visible = ref(false);
  const refresh = () => {
    setLoading(true);
    getUserByClassId({
      classId: prop.classId,
      current: pagination.current,
      pageSize: pagination.pageSize,
    })
      .then((res) => {
        data.value = res.data.records;
      })
      .finally(() => {
        setLoading(false);
      });
  };

  /**
   * @description 下载模板
   */
  const downTemplate = () => {
    // 下载模板
    downTemplateByGet().then((res) => {
      const blob = new Blob([res.data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      // 使用decodeURI对名字进行解码
      const url = window.URL.createObjectURL(blob);
      const downloadElement = document.createElement('a');
      downloadElement.style.display = 'none';
      downloadElement.href = url;
      downloadElement.download = 'file.xlsx';
      document.body.appendChild(downloadElement);
      // 点击下载
      downloadElement.click();
      // 下载完成移除元素
      document.body.removeChild(downloadElement);
      // 释放掉blob对象
      window.URL.revokeObjectURL(url);
    });
  };

  /**
   * 上传学生信息文件
   * @param file xsls文件
   */
  const uploadChange = (fileItemList: FileItem[], fileItem: FileItem) => {
    fileList.value = [fileItem];
    if (fileItem.name?.split('.').at(-1) === 'xlsx') {
      disabledFlag.value = false;
    } else {
      disabledFlag.value = true;
      Message.error('请上传xlsx文件');
    }
  };

  const submit = () => {
    // 提交学生信息文件
    if (fileList.value && fileList.value.length > 0) {
      disabledFlag.value = true;
      const formData = new FormData();
      formData.append('file', fileList.value[0].file as File);
      uploadStudentInfo(formData).then((res) => {
        if (res.data) {
          Message.success('上传成功');
          disabledFlag.value = true;
          visible.value = false;
        }
      });
    } else {
      Message.error('请选择文件');
    }
  };

  const pageChange = (current: number) => {
    setLoading(true);
    pagination.current = current;
    getUserByClassId({
      classId: prop.classId,
      current: pagination.current,
      pageSize: pagination.pageSize,
    })
      .then((res) => {
        data.value = res.data.records;
      })
      .finally(() => {
        setLoading(false);
      });
  };

  onMounted(() => {
    // 根据班级获取学生信息
    getUserByClassId({
      classId: prop.classId,
      current: pagination.current,
      pageSize: pagination.pageSize,
    })
      .then((res) => {
        data.value = res.data.records;
        pagination.total = res.data.total;
      })
      .finally(() => {
        setLoading(false);
      });
  });
</script>

<style scoped>
  .form {
    width: 540px;
    margin: 0 auto;
  }
</style>
