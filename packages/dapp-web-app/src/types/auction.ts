export enum AuctionState {
  NOT_STARTED,
  STARTED,
  ENDED,
}

export type AuctionConfig = {
  startTime: bigint
  endTime: bigint
  startPrice: bigint
  endPrice: bigint
}

export type AuctionData = {
  currentPrice: bigint
  minted: bigint
  maxSupply: bigint
}
