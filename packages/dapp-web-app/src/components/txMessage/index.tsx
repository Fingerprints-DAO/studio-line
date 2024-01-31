import { Box, Link, Text } from '@chakra-ui/react'
import { TransactionError } from 'types/transaction'
import { getExternalEtherscanUrl } from 'utils/getLink'
import { Address, useWaitForTransaction } from 'wagmi'

type TxMessageProps = {
  hash?: Address
  error?: Error
}
export const TxMessage = ({ hash, error }: TxMessageProps) => {
  const waitTx = useWaitForTransaction({
    hash,
    enabled: hash !== undefined,
  })

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
      {waitTx.isSuccess && (
        <Box bgColor={'green.500'} p={2} mt={2}>
          <Text fontSize={'md'} fontWeight={'bold'} color={'white'}>
            Tokens successfully minted!
          </Text>
        </Box>
      )}
      {(waitTx.isLoading || waitTx.isSuccess) && (
        <Link href={getExternalEtherscanUrl(hash)} display={'block'} mt={2}>
          View your transaction on Etherscan
        </Link>
      )}
    </>
  )
}
