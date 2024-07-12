import axios from 'axios';
import type { RouteRecordNormalized } from 'vue-router';
import { UserState } from '@/store/modules/user/types';

export interface LoginData {
  userAccount: string;
  userPassword: string;
}

/**
 * 用户修改基本信息
 */
export interface BasicInformation {
  userAccount?: string;
  userEmail?: string;
  userMobile?: string;
  realName?: string;
  tag?: string;
}

/**
 * 修改密码
 */
export interface UpdatePassword {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface LoginRes {
  token: string;
}
export function login(data: LoginData) {
  return axios.post<string>('/api/user/login', data);
}

export function logout() {
  return axios.post<LoginRes>('/api/user/logout');
}

export function getUserInfo() {
  return axios.post<UserState>('/api/user/info');
}

export function getMenuList() {
  return axios.post<RouteRecordNormalized[]>('/api/user/menu');
}

export function updateAvatar(data: FormData) {
  return axios.post<string>('/api/user/updateAvatar', data);
}

export function updateBasicInfo(data: BasicInformation) {
  return axios.post<boolean>('/api/user/updateBasicInfo', data);
}

export function updatePassword(data: UpdatePassword) {
  return axios.post<boolean>('/api/user/updatePassword', data);
}

export function uploadStudentInfo(data: FormData) {
  return axios.post<boolean>('/api/user/uploadStudentInfo', data);
}
