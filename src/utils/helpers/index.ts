import { appKey } from '../constants';
import { toast, ToastOptions } from 'react-toastify';

export const saveLocalStorage = (key: string, data: any) => {
  try {
    const jsonData = JSON.stringify(data);
    localStorage.setItem(`${appKey}${key}`, jsonData);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getLocalStorage = (key: string) => {
  try {
    const jsonData = localStorage.getItem(`${appKey}${key}`);
    if (!jsonData) return null;
    return JSON.parse(jsonData);
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const clearLocalStorage = (key: string) => {
  try {
    localStorage.removeItem(`${appKey}${key}`);
  } catch (error) {
    console.log(error);
    return null;
  }
  return null;
};

/**
 * Function to format a string so that it only contains numbers, only has one decimal places and it removes other decimal places
 * @param value string
 * @returns string
 */
export const formatNumber = (value: string) => {
  const cleanValue = value.replace(/[^0-9.]/g, '');

  const [integerPart, decimalPart] = cleanValue.split('.');

  const formattedInteger = integerPart || '';
  return decimalPart !== undefined ? `${formattedInteger}.${decimalPart}` : formattedInteger;
};

/**
 * Function to format a string like in formatNumber function but also add appropriate commas
 * @param value string
 * @returns string
 */
export const formatNumberWithComma = (value: string) => {
  const cleanValue = value.replace(/[^0-9.]/g, '');

  const [integerPart, decimalPart] = cleanValue.split('.');

  const formattedInteger = integerPart ? parseInt(integerPart, 10).toLocaleString() : '';
  return decimalPart !== undefined ? `${formattedInteger}.${decimalPart}` : formattedInteger;
};

/**
 *
 * Function to debounce a function
 * @param func
 * @param delay
 * @returns
 */
export const debounce = <T extends (...args: any[]) => void>(func: T, delay: number) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

/**
 * Function to append decimal places to an amount
 * @param amount amount to be operated on
 * @param decimal decimal places to be added
 * @returns
 */
export const appendDecimal = (amount?: string, decimal?: number): string => {
  if (!amount) return '0';
  if (!decimal) return amount;
  const multiplier = Math.pow(10, decimal);
  const fixed = parseFloat(amount) * multiplier;
  return fixed.toLocaleString('fullwide', { useGrouping: false });
};

/**
 * Function to remove decimal places from an amount based on the decimal param
 * @param decimal the decimal places to be removed
 * @param amount amount to be operated on
 * @returns
 */
export const removeDecimal = (decimal: number, amount?: string | number): string => {
  if (!amount || amount === '0') return '0.0';
  if (isNaN(Number(amount))) return '0.0';
  const strAmount = amount.toString();
  let isNegative = false;
  if (amount.toString().split('')[0] === '-') {
    isNegative = true;
  }

  const absStrAmount = Math.abs(Number(strAmount)).toString();
  const position = absStrAmount.length - decimal;

  let retValue;
  if (position <= 0) {
    retValue = '0.' + '0'.repeat(Math.abs(position)) + absStrAmount;
  } else {
    retValue = absStrAmount.slice(0, position) + '.' + absStrAmount.slice(position);
  }
  return isNegative ? '-' + retValue : retValue;
};

/**
 * Function to remove new line characters \n and trim white spaces
 * @param text
 * @returns
 */
export const cleanText = (text: string) => {
  return text.replace(/\n/g, '').trim();
};

/**
 * Function to trim address eg 0x3c3e1f5d3c6f4d8b5c32fd8de12433d34b1bcf94 will return 0x3c3e...cf94
 * @param address
 * @returns
 */
export function minimizeAddress(address: string): string {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

/**
 *
 * Removes trailing zeros in a decimal according to the decimal param e.g 0.00044000000 returns 0.00044000
 * @param number
 * @param decimal optional and defaults to 8
 * @returns
 */
export const stringToFixed = (number: string, decimal?: number) => {
  const retValue = parseFloat(parseFloat(number).toFixed(decimal || 8)).toString();
  return isNaN(Number(retValue)) ? '0' : retValue;
};

export const successToast = (message: string, config: ToastOptions = {}) => {
  return toast.success(message || 'Successful!', config);
};

export const errorToast = (message: string, config: ToastOptions = {}) => {
  return toast.error(message || 'Something went wrong!', config);
};

export const loadingToast = (message: string, config: ToastOptions = {}) => {
  return toast.loading(message || 'Loading!', config);
};

export const defaultToast = (message: string, config: ToastOptions = {}) => {
  return toast(message || 'Successful!', config);
};
