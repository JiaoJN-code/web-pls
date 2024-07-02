<template>
  <a-card :bordered="false">
    <a-space :size="54">
      <a-upload
        list-type="picture-card"
        :auto-upload="false"
        :file-list="fileList"
        :show-upload-button="true"
        :show-file-list="false"
        @change="uploadChange"
      >
        <template #upload-button>
          <a-avatar :size="100" class="info-avatar">
            <template #trigger-icon>
              <icon-camera />
            </template>
            <img v-if="fileList.length" :src="avatarUrl" />
          </a-avatar>
        </template>
      </a-upload>
      <a-descriptions
        :data="infoData"
        :column="2"
        align="right"
        layout="inline-horizontal"
        :label-style="{
          width: '140px',
          fontWeight: 'normal',
          color: 'rgb(var(--gray-8))',
        }"
        :value-style="{
          width: '200px',
          paddingLeft: '8px',
          textAlign: 'left',
        }"
      >
        <template #label="{ label }">{{ label }} :</template>
        <template #value="{ data }">
          <a-space v-if="data.label === '标签'">
            <a-tag
              v-for="(value, index) in data.value.split(',')"
              :key="index"
              color="blue"
              size="small"
            >
              {{ value }}
            </a-tag>
          </a-space>
          <span v-else>{{ data.value }}</span>
        </template>
      </a-descriptions>
    </a-space>
  </a-card>
</template>

<script setup lang="ts">
  import { DescData, FileItem } from '@arco-design/web-vue';
  import { ref } from 'vue';
  import { useUserStore } from '@/store';
  import { updateAvatar } from '@/api/user';

  const userStore = useUserStore();
  const avatarUrl = ref<string>('');
  avatarUrl.value = userStore.$state.userAvatar
    ? userStore.$state.userAvatar
    : '';
  const file = {
    uid: '-2',
    name: 'avatar.png',
    url: userStore.$state.userAvatar,
  };
  const fileList = ref<FileItem[]>([file]);

  const uploadChange = (fileItemList: FileItem[], fileItem: FileItem) => {
    fileList.value = [fileItem];
    const avatar = new FormData();
    avatar.append('file', fileItem.file as File);
    updateAvatar(avatar).then((res) => {
      userStore.$reset();
      avatarUrl.value = res.data;
    });
  };

  const infoData = [
    {
      label: '姓名',
      value: userStore.$state.realName,
    },
    {
      label: '账号',
      value: userStore.$state.userAccount,
    },
    {
      label: '学号',
      value: userStore.$state.userId,
    },
    {
      label: '班级',
      value: userStore.$state.className,
    },
    {
      label: '手机号',
      value: userStore.$state.userMobile,
    },
    {
      label: '邮箱',
      value: userStore.$state.userEmail,
    },
    {
      label: '标签',
      value: userStore.$state.tag,
    },
  ] as DescData[];
</script>

<style lang="scss" scoped></style>
