<template>
  <a-form
    ref="formRef"
    :model="formData"
    :rules="rules"
    class="form"
    :label-col-props="{ span: 8 }"
    :wrapper-col-props="{ span: 16 }"
  >
    <a-form-item field="oldPassword" label="旧密码">
      <a-input-password
        v-model="formData.oldPassword"
        placeholder="旧密码"
      ></a-input-password>
    </a-form-item>
    <a-form-item field="newPassword" label="新密码">
      <a-input-password
        v-model="formData.newPassword"
        placeholder="新密码"
      ></a-input-password>
    </a-form-item>
    <a-form-item field="confirmPassword" label="确认密码">
      <a-input-password
        v-model="formData.confirmPassword"
        placeholder="确认密码"
      ></a-input-password>
    </a-form-item>
    <a-form-item>
      <a-space>
        <a-button type="primary" @click="updatePasswordFun">确认修改</a-button>
        <a-button type="secondary">重置</a-button>
      </a-space>
    </a-form-item>
  </a-form>
</template>

<script setup lang="ts">
  import { UpdatePassword, updatePassword } from '@/api/user';
  import { FormInstance, Message } from '@arco-design/web-vue';
  import { ref } from 'vue';

  const formRef = ref<FormInstance>();
  const formData = ref<UpdatePassword>({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const rules = {
    oldPassword: [
      {
        required: true,
        message: '新密码不能为空',
      },
      {
        minLength: 4,
        message: '密码长度不能小于4',
      },
    ],
    newPassword: [
      {
        required: true,
        message: '新密码不能为空',
      },
      {
        minLength: 4,
        message: '密码长度不能小于4',
      },
    ],
    checkPassword: [
      {
        required: true,
        message: '确认密码不能为空',
      },
      {
        validator(value: any, callback: any) {
          if (value !== formData.value.newPassword) {
            callback('两次密码不一致');
          } else {
            callback();
          }
        },
      },
    ],
  };

  const updatePasswordFun = async () => {
    formRef.value?.validate().then((res) => {
      if (!res) {
        updatePassword(formData.value).then((updatePasswordRes) => {
          if (updatePasswordRes.data === true) {
            Message.success('修改密码成功');
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
