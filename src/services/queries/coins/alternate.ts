// Fetches status of the bridging transaction
export async function getBridgeStatus(
  transactionHash: string,
  fromChainId: number,
  toChainId: number
) {
  const response = await fetch(
    `https://api.socket.tech/v2/bridge-status?transactionHash=${transactionHash}&fromChainId=${fromChainId}&toChainId=${toChainId}`,
    {
      method: "GET",
      headers: {
        "API-KEY": process.env.NEXT_PUBLIC_SOCKET_KEY,
        Accept: "application/json",
        "Content-Type": "application/json",
      } as any,
    }
  );

  const json = await response.json();
  return json;
}
