import { UserInfo } from "../store/user/types";

export const getUserInfo = (): UserInfo | null => {
  const data = localStorage.getItem("userInfo");
  if (!data) return null;
  return JSON.parse(data) as UserInfo;
};

export const getToken = () => {
  const token = localStorage.getItem("token");
  return token;
};
