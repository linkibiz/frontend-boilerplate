import { AUTH_TOKEN } from "./constant";

export const getToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(AUTH_TOKEN);
  }
};

export const setToken = (token) => {
  if (token && typeof window !== 'undefined') {
    localStorage.setItem(AUTH_TOKEN, token);
  }
};

export const removeToken = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(AUTH_TOKEN);
  }
};