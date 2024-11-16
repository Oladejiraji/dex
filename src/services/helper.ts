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
