import { NumberSettings } from 'types/number-settings'
import { formatEther } from 'viem'

export const formatToEtherStringBN = (n?: bigint) =>
  formatEther(n ?? 0n).toString()

export const formatToEtherString = (n?: string) =>
  formatEther(BigInt(Number(n)) ?? 0n).toString()

export const formatBigNumberUp = (
  n?: bigint,
  decimals: number = NumberSettings.Decimals,
) => formatBigNumber(n, decimals, 'up')

export const formatBigNumberFloor = (
  n?: bigint,
  decimals: number = NumberSettings.Decimals,
) => formatBigNumber(n, decimals, 'down')

export const roundEtherUp = (
  n?: bigint,
  decimals: number = NumberSettings.Decimals,
) => formatBigNumber(n, decimals, 'up')

function formatBigNumber(
  n: bigint | undefined,
  decimals: number,
  mode: 'up' | 'down' = 'up',
): string {
  if (n === undefined) {
    return '0'
  }
  const str = n.toString()
  const integerPart = str.substring(0, str.length - decimals) || '0'
  const decimalPart = str.substring(str.length - decimals).padEnd(decimals, '0')

  const roundedDecimal =
    mode === 'up'
      ? Math.ceil(Number(`0.${decimalPart}`))
          .toString()
          .padStart(decimals, '0')
      : Math.floor(Number(`0.${decimalPart}`))
          .toString()
          .padStart(decimals, '0')

  return `${integerPart}.${roundedDecimal}`
}
