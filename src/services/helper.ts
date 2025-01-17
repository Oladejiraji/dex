import { SocketToken } from './queries/coins/types';

/**
 * Function to return the generic request types for react query
 * @param namespace
 * @returns
 */
export const getQueryKeys = (namespace: string) => ({
  create: `${namespace}/create`,
  createOne: `${namespace}/createOne`,
  read: `${namespace}/read`,
  readOne: `${namespace}/readOne`,
  update: `${namespace}/update`,
  patch: `${namespace}/patch`,
  put: `${namespace}/put`,
  delete: `${namespace}/delete`,
});

/**
 * This function takes in queries and appends them to a base url
 * @param base   url string
 * @param queries   an array of objects of queries
 */
export const buildUrl = (base: string, queries: Array<{ key: string; value: string | number | undefined }>) => {
  let init = base;
  let setup = false;
  queries.forEach((query) => {
    if (!query.value) return;
    if (!setup) {
      init = `${init}?${query.key}=${query.value}`;
      setup = true;
    } else {
      init = `${init}&${query.key}=${query.value}`;
    }
  });
  return init;
};

/**
 * Function to convert a wallet address to a color
 * @param walletAddress
 * @returns
 */
export function convertAddressToColor(walletAddress: string) {
  // Remove the '0x' prefix if present
  walletAddress = walletAddress.replace(/^0x/, '');

  // Ensure the address is long enough
  if (walletAddress.length < 6) {
    return 'rgb(0, 0, 0)'; // default to black if too short
  }

  // Take the first 6 characters
  const r = parseInt(walletAddress.substring(0, 2), 16);
  const g = parseInt(walletAddress.substring(2, 4), 16);
  const b = parseInt(walletAddress.substring(4, 6), 16);

  return `rgb(${r}, ${g}, ${b})`;
}

/**
 * Function that takes an array of positions on x axis and a perspective value and returns an array of perspective rotations on the x axis
 * @param squares
 * @param d
 * @returns
 */
export const calculatePerceivedRotationX = (squares: Array<number>, d: number) => {
  const angles = squares.map((square) => {
    const x = square; // Position along the X-axis
    return Math.atan(x / d) * (180 / Math.PI); // Convert radians to degrees
  });

  return angles;
};

export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const delayFunction = (dependent: number, level: number) => {
  return Math.sqrt(dependent) * level + level * dependent + level;
};

export const concatenateString = (char: string, length: number) => {
  if (!char) return '';
  if (!length) return char;
  return char.length > length ? `${char.slice(0, length - 1)}...` : char;
};

export const reverseTokenType = (type: 'from' | 'to'): 'from' | 'to' => {
  if (type === 'from') {
    return 'to';
  } else {
    return 'from';
  }
};

const priorityTokens = ['eth', 'usdc', 'usdt'];
const priorityTokensPolygon = ['pol(matic)', 'eth', 'usdc', 'usdt'];
export const returnPriorityToken = ({ tokens, chainId }: { tokens: SocketToken[]; chainId: string }) => {
  const priorityToUse = chainId === '137' ? priorityTokensPolygon : priorityTokens;
  const returnToken = tokens.sort((a, b) => {
    const aPriority = priorityToUse.indexOf(a.symbol.toLowerCase());
    const bPriority = priorityToUse.indexOf(b.symbol.toLowerCase());

    if (aPriority === -1 && bPriority === -1) return 0; // Both are not priority
    if (aPriority === -1) return 1; // `a` is not priority, so `b` comes first
    if (bPriority === -1) return -1; // `b` is not priority, so `a` comes first

    // Both have priority, sort by their position in `priorityStrings`
    return aPriority - bPriority;
  });

  return returnToken;
};
