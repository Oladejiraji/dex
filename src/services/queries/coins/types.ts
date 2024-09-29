export interface CoinData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: any;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  roi: any;
  last_updated: string;
}

export interface SocketToken {
  chainId: number;
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  logoURI: string;
}

export interface QuoteResponse {
  success: boolean;
  result: QuoteResponseResult;
}

export interface AssetType {
  chainId: number;
  address: string;
  symbol: string;
  name: string;
  decimals: number;
  icon: string;
  logoURI: string;
  chainAgnosticId: string;
}

export interface RouteType {
  routeId: string;
  isOnlySwapRoute: boolean;
  fromAmount: string;
  toAmount: string;
  sender: string;
  recipient: string;
  totalUserTx: number;
  totalGasFeesInUsd: number;
  userTxs: Array<{
    userTxType: string;
    txType: string;
    swapSlippage: number;
    chainId: number;
    protocol: {
      name: string;
      displayName: string;
      icon: string;
    };
    fromAsset: AssetType;
    approvalData: {
      minimumApprovalAmount: string;
      approvalTokenAddress: string;
      allowanceTarget: string;
      owner: string;
    };
    fromAmount: string;
    toAsset: AssetType;
    toAmount: string;
    minAmountOut: string;
    gasFees: {
      gasAmount: string;
      gasLimit: number;
      asset: {
        chainId: number;
        address: string;
        symbol: string;
        name: string;
        decimals: number;
        icon: string;
        logoURI: string;
        chainAgnosticId: any;
      };
      feesInUsd: number;
    };
    sender: string;
    recipient: string;
    userTxIndex: number;
  }>;
  usedDexName: string;
  integratorFee: {
    amount: string;
    asset: {
      chainId: number;
      address: string;
      symbol: string;
      name: string;
      decimals: number;
      icon: string;
      logoURI: string;
      chainAgnosticId: string;
    };
  };
  outputValueInUsd: number;
  receivedValueInUsd: number;
  inputValueInUsd: number;
}

export interface QuoteResponseResult {
  routes: RouteType[];
  fromChainId: number;
  fromAsset: {
    chainId: number;
    address: string;
    symbol: string;
    name: string;
    decimals: number;
    icon: string;
    logoURI: string;
    chainAgnosticId: string;
  };
  toChainId: number;
  toAsset: {
    chainId: number;
    address: string;
    symbol: string;
    name: string;
    decimals: number;
    icon: string;
    logoURI: string;
    chainAgnosticId: any;
  };
}

export interface TokenBalance {
  chainId: number;
  tokenAddress: string;
  userAddress: string;
  balance: string;
  icon: string;
  logoURI: string;
  decimals: number;
  symbol: string;
  name: string;
}

export interface TokenBalanceResponse {
  success: boolean;
  result: TokenBalance;
  statusCode: number;
}

export interface TransactionType {
  userTxType: string;
  txType: string;
  txData: string;
  txTarget: string;
  chainId: number;
  userTxIndex: number;
  value: string;
  approvalData: any;
}

export interface BuildResponse {
  success: boolean;
  result: TransactionType;
  statusCode: number;
}

export interface ChainType {
  chainId: number;
  name: string;
  isL1: boolean;
  sendingEnabled: boolean;
  icon: string;
  receivingEnabled: boolean;
  refuel: {
    sendingEnabled: boolean;
    receivingEnabled: boolean;
  };
  currency: {
    address: string;
    icon: string;
    name: string;
    symbol: string;
    decimals: number;
    minNativeCurrencyForGas: string;
  };
  rpcs: Array<string>;
  explorers: Array<string>;
}
