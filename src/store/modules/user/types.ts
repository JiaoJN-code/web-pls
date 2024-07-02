export type RoleType = '' | '*' | 'admin' | 'student' | 'teacher';
export interface UserState {
  id?: string;
  userAccount?: string;
  userAvatar?: string;
  realName?: string;
  className?: string;
  userId?: string;
  userMobile?: string;
  userEmail?: string;
  tag?: string;
  createTime?: string;
  role?: RoleType;
}
