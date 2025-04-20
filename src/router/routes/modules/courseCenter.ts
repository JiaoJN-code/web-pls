import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const DASHBOARD: AppRouteRecordRaw = {
  path: '/resourceList',
  name: 'resourceList',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: '资源列表',
    requiresAuth: false,
    icon: 'icon-dashboard',
    order: 1,
  },
  children: [
    {
      path: 'questionList',
      name: 'questionList',
      component: () => import('@/views/resource/questionList/index.vue'),
      meta: {
        locale: '题目列表',
        requiresAuth: false,
      },
    },
    {
      path: 'examCenter',
      name: 'examCenter',
      component: () => import('@/views/resource/examCenter/index.vue'),
      meta: {
        locale: '考试中心',
        requiresAuth: false,
      },
    },
  ],
};

export default DASHBOARD;
