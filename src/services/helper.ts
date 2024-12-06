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
export const buildUrl = (
  base: string,
  queries: Array<{ key: string; value: string | number | undefined }>
) => {
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
  walletAddress = walletAddress.replace(/^0x/, "");

  // Ensure the address is long enough
  if (walletAddress.length < 6) {
    return "rgb(0, 0, 0)"; // default to black if too short
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
export const calculatePerceivedRotationX = (
  squares: Array<number>,
  d: number
) => {
  const angles = squares.map((square) => {
    const x = square; // Position along the X-axis
    return Math.atan(x / d) * (180 / Math.PI); // Convert radians to degrees
  });

  return angles;
};
