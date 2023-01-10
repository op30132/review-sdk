import { reviewUserStatus } from '@src/enum/reviewUserStatus';

export const reviewUserStatusMap = {
  [reviewUserStatus.yet]: '未審核',
  [reviewUserStatus.pass]: '審核通過',
  [reviewUserStatus.fail]: '審核不通過',
};
