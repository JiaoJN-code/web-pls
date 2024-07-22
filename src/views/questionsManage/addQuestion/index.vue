<template>
  <div class="container">
    <Breadcrumb :items="['题目管理', '添加知识概念']" />
    <a-row class="wrapper" justify="center">
      <a-col :span="12">
        <a-steps class="steps" :current="current" label-placement="vertical">
          <a-step description="选择题目的基本信息">基本信息</a-step>
          <a-step description="选择题目关联的知识概念">知识概念</a-step>
          <a-step description="创建成功">完成创建</a-step>
        </a-steps>
        <a-form
          v-if="current === 1"
          ref="questionFormRef"
          :model="addQuestion"
          :style="{ width: '600px' }"
        >
          <a-form-item field="course" label="关联课程" required>
            <a-input
              v-model="addQuestion.course"
              placeholder="请输入关联课程"
            />
          </a-form-item>
          <a-form-item field="questionTitle" label="题目标题" required>
            <a-input
              v-model="addQuestion.questionTitle"
              placeholder="请输入题目标题"
            />
          </a-form-item>
          <a-form-item field="questionType" label="题目类型" required>
            <a-radio-group v-model="addQuestion.questionType">
              <a-radio value="0">选择题</a-radio>
              <a-radio value="1">判断题</a-radio>
              <a-radio value="2">简答题</a-radio>
            </a-radio-group>
          </a-form-item>
          <a-form-item field="questionText" label="题目内容" required>
            <a-textarea
              v-model="addQuestion.questionText"
              placeholder="请输入题目内容（最大不超过500字）"
              :max-length="500"
              allow-clear
              show-word-limit
            />
          </a-form-item>
          <a-form-item field="difficultyLevel" label="题目难度" required>
            <a-radio-group v-model="addQuestion.difficultyLevel">
              <a-radio value="easy">简单</a-radio>
              <a-radio value="medium">中等</a-radio>
              <a-radio value="hard">困难</a-radio>
            </a-radio-group>
          </a-form-item>
          <a-form-item
            v-if="addQuestion.questionType === '0'"
            field="optionA"
            label="选择A"
            required
          >
            <a-input v-model="addQuestion.optionA" placeholder="请输入选择A" />
          </a-form-item>
          <a-form-item
            v-if="addQuestion.questionType === '0'"
            field="optionB"
            label="选择B"
            required
          >
            <a-input v-model="addQuestion.optionB" placeholder="请输入选择B" />
          </a-form-item>
          <a-form-item
            v-if="addQuestion.questionType === '0'"
            field="optionC"
            label="选择C"
            required
          >
            <a-input v-model="addQuestion.optionC" placeholder="请输入选择C" />
          </a-form-item>
          <a-form-item
            v-if="addQuestion.questionType === '0'"
            field="optionD"
            label="选择D"
            required
          >
            <a-input v-model="addQuestion.optionD" placeholder="请输入选择D" />
          </a-form-item>
          <a-form-item
            v-if="addQuestion.questionType === '0'"
            field="correctOption"
            label="正确选项"
            required
          >
            <a-radio-group v-model="addQuestion.correctOption">
              <a-radio value="A">选项A</a-radio>
              <a-radio value="B">选项B</a-radio>
              <a-radio value="C">选项C</a-radio>
              <a-radio value="D">选项D</a-radio>
            </a-radio-group>
          </a-form-item>
          <a-form-item
            v-if="addQuestion.questionType === '1'"
            field="correctAnswer"
            label="正确选项"
            required
          >
            <a-radio-group v-model="addQuestion.correctAnswer">
              <a-radio value="0">正确</a-radio>
              <a-radio value="1">错误</a-radio>
            </a-radio-group>
          </a-form-item>
          <a-form-item
            v-if="addQuestion.questionType === '2'"
            field="suggestedAnswer"
            label="标准答案"
            required
          >
            <a-textarea
              v-model="addQuestion.suggestedAnswer"
              placeholder="请输入标准答案"
              allow-clear
            />
          </a-form-item>
        </a-form>
        <a-transfer
          v-if="current === 2"
          :data="sourceData"
          :default-value="targetData"
          style="margin-bottom: 30px; width: 100%"
          @change="selectConcept"
        />
        <a-result v-if="current === 3" status="success" title="提交成功">
          <template #subtitle> 添加题目信息提交成功 </template>
          <template #extra>
            <a-space>
              <a-button type="primary">查看详情</a-button>
              <a-button href="/questionsManage/addQuestion">再次创建</a-button>
            </a-space>
          </template>
        </a-result>
        <a-space v-if="current !== 3" style="justify-content: center">
          <a-button :disabled="preDisable" @click="previousStep"
            >上一步</a-button
          >
          <a-button type="primary" :disabled="lastDisable" @click="nextStep"
            >下一步</a-button
          >
        </a-space>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { FormInstance, Message } from '@arco-design/web-vue';
  import { addQuestionFun, getConcept } from '@/api/questionsManage';
  import { TransferItem } from '@arco-design/web-vue/es/transfer/interface';
  import { AddQuestionRequest } from '../configuration/conceptListConfig';

  const current = ref<number>(1);
  const questionFormRef = ref<FormInstance>();
  const preDisable = ref<boolean>(true);
  const lastDisable = ref<boolean>(false);
  const addQuestion = ref<AddQuestionRequest>({
    questionType: '0',
  });
  const sourceData: Array<TransferItem> = [];
  const targetData = ref<Array<string>>([]);

  /**
   * 穿梭框数据传输
   * @param selectConceptParam 传输的值
   */
  const selectConcept = (selectConceptParam: string[]) => {
    targetData.value = selectConceptParam;
  };

  /**
   * 上一步
   */
  const previousStep = () => {
    current.value -= 1;
    if (current.value === 1) {
      preDisable.value = true;
    }
  };

  /**
   * 下一步
   */
  const nextStep = async () => {
    if (current.value === 1) {
      const validate = await questionFormRef.value?.validate();
      if (validate) {
        return;
      }
      // 获取该课程的知识概念
      const res = await getConcept(addQuestion.value.course);
      if (res.data) {
        sourceData.length = 0;
        res.data.forEach((item) => {
          sourceData.push({
            label: item.description,
            value: item.conceptId as unknown as string,
            disabled: false,
          });
        });
      }
    } else if (current.value === 2) {
      if (targetData.value?.length === 0) {
        Message.error(`请为${addQuestion.value.questionTitle}添加知识点`);
        return;
      }
      const addQuestionRes = await addQuestionFun({
        questionType: addQuestion.value.questionType as unknown as number,
        questionTitle: addQuestion.value.questionTitle,
        questionText: addQuestion.value.questionText,
        difficultyLevel: addQuestion.value.difficultyLevel,
        course: addQuestion.value.course,
        conceptList: targetData.value,
        optionA: addQuestion.value.optionA,
        optionB: addQuestion.value.optionB,
        optionC: addQuestion.value.optionC,
        optionD: addQuestion.value.optionD,
        correctOption: addQuestion.value.correctOption,
        correctAnswer: addQuestion.value.correctAnswer as unknown as number,
        suggestedAnswer: addQuestion.value.suggestedAnswer,
      });
      if (addQuestionRes.data === true) {
        Message.success('添加成功');
      }
    }
    current.value += 1;
    if (current.value !== 1) {
      preDisable.value = false;
    }
  };
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

  .steps {
    margin-top: 50px;
    margin-bottom: 76px;
  }
</style>
