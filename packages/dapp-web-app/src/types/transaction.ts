export enum TransactionStatus {
  Error,
  Success,
}
export interface TransactionError extends Error {
  shortMessage: string
}
