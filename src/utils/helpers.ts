import { appKey } from "./constants";

export const saveLocalStorage = (key: string, data: any) => {
  try {
    const jsonData = JSON.stringify(data);
    localStorage.setItem(`${appKey}${key}`, jsonData);
    return true;
  } catch (error) {
    return false;
  }
};

export const getLocalStorage = (key: string) => {
  try {
    const jsonData = localStorage.getItem(`${appKey}${key}`);
    if (!jsonData) return null;
    return JSON.parse(jsonData);
  } catch (error) {
    return null;
  }
};

export const clearLocalStorage = (key: string) => {
  try {
    localStorage.removeItem(`${appKey}${key}`);
  } catch (error) {
    return null;
  }
  return null;
};
