export const initialCoin = {
  id: "bitcoin",
  symbol: "btc",
  name: "Bitcoin",
  image:
    "https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400",
  current_price: 57669,
  market_cap: 1138609177093,
  market_cap_rank: 1,
  fully_diluted_valuation: 1210517735039,
  total_volume: 29364685901,
  high_24h: 58043,
  low_24h: 56448,
  price_change_24h: 702.65,
  price_change_percentage_24h: 1.23345,
  market_cap_change_24h: 12125574307,
  market_cap_change_percentage_24h: 1.07641,
  circulating_supply: 19752534.0,
  total_supply: 21000000.0,
  max_supply: 21000000.0,
  ath: 73738,
  ath_change_percentage: -21.81208,
  ath_date: "2024-03-14T07:10:36.635Z",
  atl: 67.81,
  atl_change_percentage: 84924.34447,
  atl_date: "2013-07-06T00:00:00.000Z",
  roi: null,
  last_updated: "2024-09-11T00:02:52.424Z",
};

export const initialCoin1 = {
  id: "tether",
  symbol: "usdt",
  name: "Tether",
  image:
    "https://coin-images.coingecko.com/coins/images/325/large/Tether.png?1696501661",
  current_price: 1.0,
  market_cap: 118424187431,
  market_cap_rank: 3,
  fully_diluted_valuation: 118424187431,
  total_volume: 29605636430,
  high_24h: 1.006,
  low_24h: 0.995237,
  price_change_24h: -0.000189938188372096,
  price_change_percentage_24h: -0.01899,
  market_cap_change_24h: 228218598,
  market_cap_change_percentage_24h: 0.19308,
  circulating_supply: 118376416505.886,
  total_supply: 118376416505.886,
  max_supply: null,
  ath: 1.32,
  ath_change_percentage: -24.43589,
  ath_date: "2018-07-24T00:00:00.000Z",
  atl: 0.572521,
  atl_change_percentage: 74.62856,
  atl_date: "2015-03-02T00:00:00.000Z",
  roi: null,
  last_updated: "2024-09-11T02:25:45.046Z",
};

export const chainBaseData = {
  chainId: 137,
  name: "Polygon",
  icon: "https://media.socket.tech/networks/polygon.svg",
  isL1: false,
  sendingEnabled: true,
  receivingEnabled: true,
  refuel: {
    sendingEnabled: true,
    receivingEnabled: true,
  },
  currency: {
    address: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
    icon: "https://maticnetwork.github.io/polygon-token-assets/assets/matic.svg",
    name: "Matic",
    symbol: "MATIC",
    decimals: 18,
    minNativeCurrencyForGas: "30000000000000000",
  },
  rpcs: [
    "https://rpc-mainnet.matic.network",
    "wss://ws-mainnet.matic.network",
    "https://rpc-mainnet.matic.quiknode.pro",
    "https://matic-mainnet.chainstacklabs.com",
  ],
  explorers: ["https://polygonscan.com"],
};

export const baseAddress = "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";

export const faqData = [
  {
    id: 1,
    question: "What is Superbase?",
    answer:
      "Superbase is a bridge aggregator powered by socket. Superbase enables users to find the best route for bridging tokens to chains, or swapping onchain. It finds multiple bridging routes via supported DEXes & Bridges, considering any swaps that may be needed before/after bridging.",
  },
  {
    id: 2,
    question: "How does Superbase work?",
    answer:
      "Superbase enables seamless cross-chain asset transfers. It unifies liquidity across chains by aggregating all asset bridges & DEXs.",
  },
  {
    id: 3,
    question: "Is Superbase Safe?",
    answer:
      "Yes, Superbase is safe. Only you have access to your credentials and, consequently, your wallet and its assets.",
  },
  {
    id: 4,
    question: "Does Superbase charge fees?",
    answer:
      "No we do not, any fees incurred are either gas fees or bridging fees.",
  },
  {
    id: 5,
    question: "What chains and bridges does Superbase support?",
    answer:
      "Superbase supports a variety of bridges and chains, with more coming soon, view supported chains here.",
  },
  {
    id: 6,
    question: "Can I bridge on Superbase?",
    answer:
      "This depends on our backend engineer @Oladeji is it safe to bridge on superbase.",
  },
];
