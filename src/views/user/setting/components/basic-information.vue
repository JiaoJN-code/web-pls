<template>
  <a-form
    ref="formRef"
    :model="formData"
    class="form"
    :label-col-props="{ span: 8 }"
    :wrapper-col-props="{ span: 16 }"
  >
    <a-form-item
      field="userAccount"
      label="账号名称"
      :rules="[
        {
          required: true,
          message: '用户账号名称不能为空',
        },
      ]"
    >
      <a-input v-model="formData.userAccount" placeholder="用户名称"></a-input>
    </a-form-item>
    <a-form-item
      field="realName"
      label="姓名"
      :rules="[
        {
          required: true,
          message: '姓名不能为空',
        },
      ]"
    >
      <a-input v-model="formData.realName" placeholder="姓名"></a-input>
    </a-form-item>
    <a-form-item
      field="userEmail"
      label="邮箱"
      :rules="[
        {
          required: true,
          message: '邮箱不能为空',
        },
      ]"
    >
      <a-input v-model="formData.userEmail" placeholder="邮箱"></a-input>
    </a-form-item>
    <a-form-item
      field="userMobile"
      label="手机号"
      :rules="[
        {
          required: true,
          message: '手机号不能为空',
        },
      ]"
    >
      <a-input v-model="formData.userMobile" placeholder="手机号"></a-input>
    </a-form-item>
    <a-form-item field="tag" label="标签">
      <a-input
        v-model="formData.tag"
        placeholder="用户标签，用 , 分隔"
      ></a-input>
    </a-form-item>
    <a-form-item>
      <a-space>
        <a-button type="primary" @click="save">保存</a-button>
        <a-button type="secondary">重置</a-button>
      </a-space>
    </a-form-item>
  </a-form>
</template>

<script setup lang="ts">
  import { BasicInformation, updateBasicInfo } from '@/api/user';
  import router from '@/router';
  import useUserStore from '@/store/modules/user';
  import { FormInstance, Message } from '@arco-design/web-vue';
  import { ref } from 'vue';

  const userStore = useUserStore();
  const formRef = ref<FormInstance>();
  const formData = ref<BasicInformation>({
    userAccount: userStore.$state.userAccount,
    userEmail: userStore.$state.userEmail,
    userMobile: userStore.$state.userMobile,
    realName: userStore.$state.realName,
    tag: userStore.$state.tag,
  });

  const save = async () => {
    formRef.value?.validate().then((res) => {
      if (!res) {
        updateBasicInfo(formData.value).then((updateRes) => {
          if (updateRes.data === true) {
            Message.success('更新成功');
            userStore.$reset();
            router.go(0);
          }
        });
      }
    });
  };
</script>

<style scoped>
  .form {
    width: 540px;
    margin: 0 auto;
  }
</style>
