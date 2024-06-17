import { UserInfo } from '../store/users/types';

export const removeTextInsideAsterisks = (inputString: string) => {
  return inputString.replace(/\*.*?\*/g, '').replace(/\(.*?\)/g, '');
};

export const getUserInfo = (): UserInfo | null => {
  const data = localStorage.getItem('userInfo');
  console.log(data, 'data');

  if (!data) return null;
  return JSON.parse(data) as UserInfo;
};
