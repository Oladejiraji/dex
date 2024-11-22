import { appKey } from "./constants";
import { toast } from "react-toastify";

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

export const formatNumber = (value: string) => {
  const cleanValue = value.replace(/[^0-9.]/g, "");

  const [integerPart, decimalPart] = cleanValue.split(".");

  // const formattedInteger = integerPart
  //   ? parseInt(integerPart, 10).toLocaleString()
  //   : "";
  const formattedInteger = integerPart || "";
  return decimalPart !== undefined
    ? `${formattedInteger}.${decimalPart}`
    : formattedInteger;
};

export const formatNumberWithComma = (value: string) => {
  const cleanValue = value.replace(/[^0-9.]/g, "");

  const [integerPart, decimalPart] = cleanValue.split(".");

  const formattedInteger = integerPart
    ? parseInt(integerPart, 10).toLocaleString()
    : "";
  return decimalPart !== undefined
    ? `${formattedInteger}.${decimalPart}`
    : formattedInteger;
};

export const reverseFormatNumber = (formattedValue: string) => {
  const cleanedValue = formattedValue.replace(/,/g, "").trim();

  return isNaN(Number(cleanedValue)) ? "" : cleanedValue;
};

export function float(equation: any, precision = 9) {
  return Math.floor(equation * 10 ** precision) / 10 ** precision;
}

export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  delay: number
) => {
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
  if (!decimal || !amount) return "0";
  const multiplier = Math.pow(10, decimal);
  const fixed = parseFloat(amount) * multiplier;
  return fixed.toLocaleString("fullwide", { useGrouping: false });
};

/**
 * Function to remove decimal places from an amount based on the decimal param
 * @param decimal the decimal places to be removed
 * @param amount amount to be operated on
 * @returns
 */
export const removeDecimal = (
  decimal: number,
  amount?: string | number
): string => {
  if (!amount) return "0.0";
  const strAmount = amount.toString();

  const position = strAmount.length - decimal;

  if (position <= 0) {
    return "0." + "0".repeat(Math.abs(position)) + strAmount;
  }

  return strAmount.slice(0, position) + "." + strAmount.slice(position);
};

export const cleanText = (text: string) => {
  return text.replace(/\n/g, "").trim();
};

export function minimizeAddress(address: string): string {
  if (!address) return "";
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
  return parseFloat(parseFloat(number).toFixed(decimal || 8)).toString();
};

export const successToast = (message: string) => {
  toast.success(message || "Successful!");
};

export const errorToast = (message: string) => {
  toast.error(message || "Something went wrong!");
};

export const defaultToast = (message: string) => {
  toast(message || "Successful!");
};
