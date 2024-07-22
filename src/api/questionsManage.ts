import { Concept } from '@/views/questionsManage/configuration/conceptListConfig';
import axios from 'axios';

export interface addConceptRequest {
  description: string;
  course: string;
  difficulty: string;
  location: string;
}

interface getConceptByCourseParam {
  course: string;
  current: number;
  pageSize: number;
}

export interface ConceptByPage {
  total: number;
  records: Array<Concept>;
}

export interface AddQuestionRequest {
  questionType?: number;
  questionTitle?: string;
  questionText?: string;
  difficultyLevel?: string;
  course?: string;
  conceptList?: Array<string>;
  optionA?: string;
  optionB?: string;
  optionC?: string;
  optionD?: string;
  correctOption?: string;
  correctAnswer?: number;
  suggestedAnswer?: string;
}

export function addConcept(data: addConceptRequest) {
  return axios.post<boolean>('/api/resource/knowledgeConcept/add', data);
}

export function getConceptByCourse(data: getConceptByCourseParam) {
  return axios.get<ConceptByPage>(
    `/api/resource/knowledgeConcept/query?course=${data.course}&current=${data.current}&pageSize=${data.pageSize}`
  );
}

export function getConcept(course?: string) {
  return axios.get<Array<Concept>>(
    `/api/resource/knowledgeConcept/getByCourse?course=${course}`
  );
}

export function addQuestionFun(data: AddQuestionRequest) {
  return axios.post('/api/resource/question/addQuestion', data);
}
