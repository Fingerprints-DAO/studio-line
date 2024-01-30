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
  price: bigint
  minted: bigint
  maxSupply: bigint
}
