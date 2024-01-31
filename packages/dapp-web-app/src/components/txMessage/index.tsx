import { Box, Link, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { TransactionError } from 'types/transaction'
import { getExternalEtherscanUrl } from 'utils/getLink'
import { Address, useWaitForTransaction } from 'wagmi'

type TxMessageProps = {
  hash?: Address
  error?: Error
}

const defaultTxData = {
  isLoading: false,
  isSuccess: false,
  isError: false,
}

export const TxMessage = ({ hash, error }: TxMessageProps) => {
  const [txData, setTxData] = useState<{
    isLoading: Boolean
    isSuccess: Boolean
    isError: Boolean
  }>(defaultTxData)
  const waitTx = useWaitForTransaction({
    hash,
    enabled: hash !== undefined,
  })

  useEffect(() => {
    if (waitTx.isLoading || waitTx.isSuccess || waitTx.isSuccess) {
      setTxData({
        isLoading: waitTx.isLoading,
        isSuccess: waitTx.isSuccess,
        isError: waitTx.isError,
      })
    }
  }, [waitTx.isError, waitTx.isLoading, waitTx.isSuccess])

  useEffect(() => {
    let timeout: any
    if (error || txData.isSuccess || txData.isError) {
      timeout = setTimeout(() => {
        setTxData(defaultTxData)
      }, 15_000)
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout)
      }
    }
  }, [error, txData.isError, txData.isSuccess])

  if (!hash && !error) {
    return null
  }

  return (
    <>
      {error && (
        <Text fontSize={'xs'} color={'red.500'} mt={2}>
          {(error as TransactionError).shortMessage}
        </Text>
      )}
      {txData.isSuccess && (
        <Box bgColor={'green.500'} p={2} mt={2}>
          <Text fontSize={'md'} fontWeight={'bold'} color={'white'}>
            Tokens successfully minted!
          </Text>
        </Box>
      )}
      {(txData.isLoading || txData.isSuccess) && (
        <Link href={getExternalEtherscanUrl(hash)} display={'block'} mt={2}>
          View your transaction on Etherscan
        </Link>
      )}
    </>
  )
}
