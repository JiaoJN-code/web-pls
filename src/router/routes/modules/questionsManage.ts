import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const DASHBOARD: AppRouteRecordRaw = {
  path: '/questionsManage',
  name: 'questionsManage',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: '题目管理',
    requiresAuth: true,
    icon: 'icon-dashboard',
    order: 1,
  },
  children: [
    {
      path: 'addConcept',
      name: 'addConcept',
      component: () => import('@/views/questionsManage/addConcept/index.vue'),
      meta: {
        locale: '添加知识概念',
        requiresAuth: true,
        roles: ['teacher'],
      },
    },
    {
      path: 'addQuestion',
      name: 'addQuestion',
      component: () => import('@/views/questionsManage/addQuestion/index.vue'),
      meta: {
        locale: '添加题目',
        requiresAuth: true,
        roles: ['teacher'],
      },
    },
  ],
};

export default DASHBOARD;
