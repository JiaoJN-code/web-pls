import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const DASHBOARD: AppRouteRecordRaw = {
  path: '/classManage',
  name: 'classManage',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: '班级管理',
    requiresAuth: true,
    icon: 'icon-dashboard',
    order: 1,
  },
  children: [
    {
      path: 'classInfo',
      name: 'classInfo',
      component: () => import('@/views/classManage/index.vue'),
      meta: {
        locale: '班级信息',
        requiresAuth: true,
        roles: ['teacher'],
      },
    },
  ],
};

export default DASHBOARD;
