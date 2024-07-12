import { UserState } from '@/store/modules/user/types';
import axios from 'axios';

export interface ClassInfo {
  id: number;
  grade: string;
  className: string;
  studentNum: number;
  collegeName: string;
  collegeId: number;
}

export interface GetUserByClassId {
  classId: number;
  current: number;
  pageSize: number;
}

export interface userInfoByPage {
  total: number;
  records: Array<UserState>;
}

export function getClass() {
  return axios.get<Array<ClassInfo>>('/api/class/getClass');
}

export function getUserByClassId(data: GetUserByClassId) {
  return axios.get<userInfoByPage>(
    `/api/class/getUserInfoByClassId?classId=${data.classId}&current=${data.current}&pageSize=${data.pageSize}`
  );
}

export function downTemplateByGet() {
  return axios.get('/api/class/downloadTemplate', { responseType: 'blob' });
}
