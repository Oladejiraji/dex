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
