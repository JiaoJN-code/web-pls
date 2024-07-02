import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const DASHBOARD: AppRouteRecordRaw = {
  path: '/personalCenter',
  name: 'personalCenter',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: '个人中心',
    requiresAuth: true,
    icon: 'icon-dashboard',
    order: 0,
  },
  children: [
    {
      path: 'setting',
      name: 'setting',
      component: () => import('@/views/personalCenter/setting/index.vue'),
      meta: {
        locale: '用户设置',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

export default DASHBOARD;
