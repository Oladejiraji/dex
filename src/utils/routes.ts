export const AppRoutes = {
  terms: {
    path: "/terms",
  },
  connect: {
    path: (chainId: number) => `/connect/${chainId}`,
  },
  home: {
    path: "/",
  },
  review: {
    path: "/review",
  },
  faq: {
    path: "/faq",
  },
  networks: {
    path: "/networks",
  },
};
