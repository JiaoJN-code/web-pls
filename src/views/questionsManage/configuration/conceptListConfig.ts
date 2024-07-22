export const conceptTableColumn = [
  {
    title: '序号',
    dataIndex: 'index',
    slotName: 'index',
    width: '40px',
  },
  {
    title: '概念描述',
    dataIndex: 'description',
  },
  {
    title: '概念关联课程',
    dataIndex: 'course',
  },
  {
    title: '所在章节',
    dataIndex: 'location',
  },
  {
    title: '概念难度',
    dataIndex: 'difficulty',
    slotName: 'difficulty',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
  },
  {
    title: '操作',
    slotName: 'optional',
  },
];

export interface Concept {
  conceptId: number;
  course: string;
  description: string;
  difficulty: string;
  location: string;
  createTime: string;
}

export interface AddQuestionRequest {
  questionType: string;
  questionTitle?: string;
  questionText?: string;
  difficultyLevel?: string;
  course?: string;
  optionA?: string;
  optionB?: string;
  optionC?: string;
  optionD?: string;
  correctOption?: string;
  correctAnswer?: string;
  suggestedAnswer?: string;
  concept?: Array<number>;
}
