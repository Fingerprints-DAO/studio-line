import {
  useContractRead,
  UseContractReadConfig,
  useContractWrite,
  UseContractWriteConfig,
  usePrepareContractWrite,
  UsePrepareContractWriteConfig,
  useContractEvent,
  UseContractEventConfig,
} from 'wagmi'
import { ReadContractResult, WriteContractMode, PrepareWriteContractResult } from 'wagmi/actions'

import {
  getContract,
  GetContractArgs,
  writeContract,
  WriteContractArgs,
  WriteContractPreparedArgs,
  WriteContractUnpreparedArgs,
  prepareWriteContract,
  PrepareWriteContractConfig,
  watchContractEvent,
  WatchContractEventConfig,
  WatchContractEventCallback,
} from 'wagmi/actions'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// line
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const lineABI = [
  { stateMutability: 'nonpayable', type: 'constructor', inputs: [{ name: '_descriptor', internalType: 'address', type: 'address' }] },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'MAX_LOCKED_TOKENS',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'MAX_MINT_PER_TX',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  { stateMutability: 'view', type: 'function', inputs: [], name: 'MAX_SUPPLY', outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }] },
  { stateMutability: 'view', type: 'function', inputs: [], name: 'NUM_COLUMNS', outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }] },
  { stateMutability: 'view', type: 'function', inputs: [], name: 'NUM_ROWS', outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }] },
  { stateMutability: 'nonpayable', type: 'function', inputs: [], name: 'acceptOwnership', outputs: [] },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'id', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'availableCoordinates',
    outputs: [
      { name: 'x', internalType: 'uint256', type: 'uint256' },
      { name: 'y', internalType: 'uint256', type: 'uint256' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'pure',
    type: 'function',
    inputs: [
      { name: 'merkleProof', internalType: 'bytes32[]', type: 'bytes32[]' },
      { name: '_address', internalType: 'address', type: 'address' },
      { name: '_root', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'checkMerkleProof',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  { stateMutability: 'nonpayable', type: 'function', inputs: [], name: 'closeMint', outputs: [] },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'config',
    outputs: [
      { name: 'startTime', internalType: 'uint64', type: 'uint64' },
      { name: 'endTime', internalType: 'uint64', type: 'uint64' },
      { name: 'startPriceInWei', internalType: 'uint256', type: 'uint256' },
      { name: 'endPriceInWei', internalType: 'uint256', type: 'uint256' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    name: 'coordinateHashToIndex',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'currentTokenId',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'descriptor',
    outputs: [{ name: '', internalType: 'contract ITokenDescriptor', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'getApproved',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'getCurrentPrice',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'getGrid',
    outputs: [{ name: '', internalType: 'uint256[25][25]', type: 'uint256[25][25]' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'getToken',
    outputs: [
      {
        name: '',
        internalType: 'struct ITokenDescriptor.Token',
        type: 'tuple',
        components: [
          {
            name: 'initial',
            internalType: 'struct ITokenDescriptor.Coordinate',
            type: 'tuple',
            components: [
              { name: 'x', internalType: 'uint256', type: 'uint256' },
              { name: 'y', internalType: 'uint256', type: 'uint256' },
            ],
          },
          {
            name: 'current',
            internalType: 'struct ITokenDescriptor.Coordinate',
            type: 'tuple',
            components: [
              { name: 'x', internalType: 'uint256', type: 'uint256' },
              { name: 'y', internalType: 'uint256', type: 'uint256' },
            ],
          },
          { name: 'timestamp', internalType: 'uint256', type: 'uint256' },
          { name: 'hasReachedEnd', internalType: 'bool', type: 'bool' },
          { name: 'isLocked', internalType: 'bool', type: 'bool' },
          { name: 'direction', internalType: 'enum ITokenDescriptor.Direction', type: 'uint8' },
          { name: 'numMovements', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'grid',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'x', internalType: 'uint256', type: 'uint256' },
      { name: 'y', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'lockOriginPoint',
    outputs: [],
  },
  { stateMutability: 'view', type: 'function', inputs: [], name: 'merkleRoot', outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }] },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      {
        name: 'coordinates',
        internalType: 'struct ITokenDescriptor.Coordinate[]',
        type: 'tuple[]',
        components: [
          { name: 'x', internalType: 'uint256', type: 'uint256' },
          { name: 'y', internalType: 'uint256', type: 'uint256' },
        ],
      },
      { name: 'merkleProof', internalType: 'bytes32[]', type: 'bytes32[]' },
    ],
    name: 'mintAtPosition',
    outputs: [],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'quantity', internalType: 'uint256', type: 'uint256' },
      { name: 'merkleProof', internalType: 'bytes32[]', type: 'bytes32[]' },
    ],
    name: 'mintRandom',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    name: 'mintableCoordinates',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'moveEast',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'moveNorth',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'moveNortheast',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'moveNorthwest',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'moveSouth',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'moveSoutheast',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'moveSouthwest',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'moveWest',
    outputs: [],
  },
  { stateMutability: 'view', type: 'function', inputs: [], name: 'name', outputs: [{ name: '', internalType: 'string', type: 'string' }] },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'numLockedOriginPoints',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  { stateMutability: 'view', type: 'function', inputs: [], name: 'owner', outputs: [{ name: '', internalType: 'address', type: 'address' }] },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'id', internalType: 'uint256', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
  },
  { stateMutability: 'view', type: 'function', inputs: [], name: 'pendingOwner', outputs: [{ name: '', internalType: 'address', type: 'address' }] },
  { stateMutability: 'nonpayable', type: 'function', inputs: [], name: 'renounceOwnership', outputs: [] },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'id', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'id', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'approved', internalType: 'bool', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_descriptor', internalType: 'address', type: 'address' }],
    name: 'setDescriptor',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {
        name: 'coordinates',
        internalType: 'struct ITokenDescriptor.Coordinate[]',
        type: 'tuple[]',
        components: [
          { name: 'x', internalType: 'uint256', type: 'uint256' },
          { name: 'y', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    name: 'setInitialAvailableCoordinates',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  { stateMutability: 'view', type: 'function', inputs: [], name: 'symbol', outputs: [{ name: '', internalType: 'string', type: 'string' }] },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenIdToTokenInfo',
    outputs: [
      {
        name: 'initial',
        internalType: 'struct ITokenDescriptor.Coordinate',
        type: 'tuple',
        components: [
          { name: 'x', internalType: 'uint256', type: 'uint256' },
          { name: 'y', internalType: 'uint256', type: 'uint256' },
        ],
      },
      {
        name: 'current',
        internalType: 'struct ITokenDescriptor.Coordinate',
        type: 'tuple',
        components: [
          { name: 'x', internalType: 'uint256', type: 'uint256' },
          { name: 'y', internalType: 'uint256', type: 'uint256' },
        ],
      },
      { name: 'timestamp', internalType: 'uint256', type: 'uint256' },
      { name: 'hasReachedEnd', internalType: 'bool', type: 'bool' },
      { name: 'isLocked', internalType: 'bool', type: 'bool' },
      { name: 'direction', internalType: 'enum ITokenDescriptor.Direction', type: 'uint8' },
      { name: 'numMovements', internalType: 'uint256', type: 'uint256' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'id', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'id', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'startTime', internalType: 'uint64', type: 'uint64' },
      { name: 'endTime', internalType: 'uint64', type: 'uint64' },
      { name: 'startPriceInWei', internalType: 'uint256', type: 'uint256' },
      { name: 'endPriceInWei', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'updateConfig',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_root', internalType: 'bytes32', type: 'bytes32' }],
    name: 'updateMerkleRoot',
    outputs: [],
  },
  { stateMutability: 'nonpayable', type: 'function', inputs: [], name: 'withdraw', outputs: [] },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address', indexed: true },
      { name: 'spender', internalType: 'address', type: 'address', indexed: true },
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: true },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address', indexed: true },
      { name: 'operator', internalType: 'address', type: 'address', indexed: true },
      { name: 'approved', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'ApprovalForAll',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'previousOwner', internalType: 'address', type: 'address', indexed: true },
      { name: 'newOwner', internalType: 'address', type: 'address', indexed: true },
    ],
    name: 'OwnershipTransferStarted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'previousOwner', internalType: 'address', type: 'address', indexed: true },
      { name: 'newOwner', internalType: 'address', type: 'address', indexed: true },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: true },
    ],
    name: 'Transfer',
  },
  { type: 'error', inputs: [], name: 'ExceedsMaxMintPerTransaction' },
  { type: 'error', inputs: [], name: 'HasNotReachedEnd' },
  { type: 'error', inputs: [], name: 'IncorrectPrice' },
  { type: 'error', inputs: [], name: 'InvalidDirection' },
  { type: 'error', inputs: [], name: 'MaxLockedOriginPointsAlreadyReached' },
  { type: 'error', inputs: [], name: 'MintingClosed' },
  { type: 'error', inputs: [], name: 'MovementLocked' },
  { type: 'error', inputs: [], name: 'NotMinted' },
  { type: 'error', inputs: [], name: 'NotTokenOwner' },
  { type: 'error', inputs: [], name: 'OriginPointLocked' },
  { type: 'error', inputs: [{ name: 'owner', internalType: 'address', type: 'address' }], name: 'OwnableInvalidOwner' },
  { type: 'error', inputs: [{ name: 'account', internalType: 'address', type: 'address' }], name: 'OwnableUnauthorizedAccount' },
  {
    type: 'error',
    inputs: [
      { name: 'x', internalType: 'uint256', type: 'uint256' },
      { name: 'y', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'PositionCurrentlyTaken',
  },
  {
    type: 'error',
    inputs: [
      { name: 'x', internalType: 'uint256', type: 'uint256' },
      { name: 'y', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'PositionNotMintable',
  },
  {
    type: 'error',
    inputs: [
      { name: 'x', internalType: 'uint256', type: 'uint256' },
      { name: 'y', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'PositionOutOfBounds',
  },
  { type: 'error', inputs: [], name: 'ReentrancyGuardReentrantCall' },
] as const

export const lineAddress = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512' as const

export const lineConfig = { address: lineAddress, abi: lineABI } as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lineABI}__.
 */
export function useLineRead<TFunctionName extends string, TSelectData = ReadContractResult<typeof lineABI, TFunctionName>>(
  config: Omit<UseContractReadConfig<typeof lineABI, TFunctionName, TSelectData>, 'abi' | 'address'> = {} as any
) {
  return useContractRead({ abi: lineABI, address: lineAddress, ...config } as UseContractReadConfig<typeof lineABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lineABI}__ and `functionName` set to `"MAX_LOCKED_TOKENS"`.
 */
export function useLineMaxLockedTokens<TFunctionName extends 'MAX_LOCKED_TOKENS', TSelectData = ReadContractResult<typeof lineABI, TFunctionName>>(
  config: Omit<UseContractReadConfig<typeof lineABI, TFunctionName, TSelectData>, 'abi' | 'address' | 'functionName'> = {} as any
) {
  return useContractRead({ abi: lineABI, address: lineAddress, functionName: 'MAX_LOCKED_TOKENS', ...config } as UseContractReadConfig<
    typeof lineABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lineABI}__ and `functionName` set to `"MAX_MINT_PER_TX"`.
 */
export function useLineMaxMintPerTx<TFunctionName extends 'MAX_MINT_PER_TX', TSelectData = ReadContractResult<typeof lineABI, TFunctionName>>(
  config: Omit<UseContractReadConfig<typeof lineABI, TFunctionName, TSelectData>, 'abi' | 'address' | 'functionName'> = {} as any
) {
  return useContractRead({ abi: lineABI, address: lineAddress, functionName: 'MAX_MINT_PER_TX', ...config } as UseContractReadConfig<
    typeof lineABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lineABI}__ and `functionName` set to `"MAX_SUPPLY"`.
 */
export function useLineMaxSupply<TFunctionName extends 'MAX_SUPPLY', TSelectData = ReadContractResult<typeof lineABI, TFunctionName>>(
  config: Omit<UseContractReadConfig<typeof lineABI, TFunctionName, TSelectData>, 'abi' | 'address' | 'functionName'> = {} as any
) {
  return useContractRead({ abi: lineABI, address: lineAddress, functionName: 'MAX_SUPPLY', ...config } as UseContractReadConfig<
    typeof lineABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lineABI}__ and `functionName` set to `"NUM_COLUMNS"`.
 */
export function useLineNumColumns<TFunctionName extends 'NUM_COLUMNS', TSelectData = ReadContractResult<typeof lineABI, TFunctionName>>(
  config: Omit<UseContractReadConfig<typeof lineABI, TFunctionName, TSelectData>, 'abi' | 'address' | 'functionName'> = {} as any
) {
  return useContractRead({ abi: lineABI, address: lineAddress, functionName: 'NUM_COLUMNS', ...config } as UseContractReadConfig<
    typeof lineABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lineABI}__ and `functionName` set to `"NUM_ROWS"`.
 */
export function useLineNumRows<TFunctionName extends 'NUM_ROWS', TSelectData = ReadContractResult<typeof lineABI, TFunctionName>>(
  config: Omit<UseContractReadConfig<typeof lineABI, TFunctionName, TSelectData>, 'abi' | 'address' | 'functionName'> = {} as any
) {
  return useContractRead({ abi: lineABI, address: lineAddress, functionName: 'NUM_ROWS', ...config } as UseContractReadConfig<
    typeof lineABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lineABI}__ and `functionName` set to `"availableCoordinates"`.
 */
export function useLineAvailableCoordinates<
  TFunctionName extends 'availableCoordinates',
  TSelectData = ReadContractResult<typeof lineABI, TFunctionName>
>(config: Omit<UseContractReadConfig<typeof lineABI, TFunctionName, TSelectData>, 'abi' | 'address' | 'functionName'> = {} as any) {
  return useContractRead({ abi: lineABI, address: lineAddress, functionName: 'availableCoordinates', ...config } as UseContractReadConfig<
    typeof lineABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lineABI}__ and `functionName` set to `"balanceOf"`.
 */
export function useLineBalanceOf<TFunctionName extends 'balanceOf', TSelectData = ReadContractResult<typeof lineABI, TFunctionName>>(
  config: Omit<UseContractReadConfig<typeof lineABI, TFunctionName, TSelectData>, 'abi' | 'address' | 'functionName'> = {} as any
) {
  return useContractRead({ abi: lineABI, address: lineAddress, functionName: 'balanceOf', ...config } as UseContractReadConfig<
    typeof lineABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lineABI}__ and `functionName` set to `"checkMerkleProof"`.
 */
export function useLineCheckMerkleProof<TFunctionName extends 'checkMerkleProof', TSelectData = ReadContractResult<typeof lineABI, TFunctionName>>(
  config: Omit<UseContractReadConfig<typeof lineABI, TFunctionName, TSelectData>, 'abi' | 'address' | 'functionName'> = {} as any
) {
  return useContractRead({ abi: lineABI, address: lineAddress, functionName: 'checkMerkleProof', ...config } as UseContractReadConfig<
    typeof lineABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lineABI}__ and `functionName` set to `"config"`.
 */
export function useLineConfig<TFunctionName extends 'config', TSelectData = ReadContractResult<typeof lineABI, TFunctionName>>(
  config: Omit<UseContractReadConfig<typeof lineABI, TFunctionName, TSelectData>, 'abi' | 'address' | 'functionName'> = {} as any
) {
  return useContractRead({ abi: lineABI, address: lineAddress, functionName: 'config', ...config } as UseContractReadConfig<
    typeof lineABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lineABI}__ and `functionName` set to `"coordinateHashToIndex"`.
 */
export function useLineCoordinateHashToIndex<
  TFunctionName extends 'coordinateHashToIndex',
  TSelectData = ReadContractResult<typeof lineABI, TFunctionName>
>(config: Omit<UseContractReadConfig<typeof lineABI, TFunctionName, TSelectData>, 'abi' | 'address' | 'functionName'> = {} as any) {
  return useContractRead({ abi: lineABI, address: lineAddress, functionName: 'coordinateHashToIndex', ...config } as UseContractReadConfig<
    typeof lineABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lineABI}__ and `functionName` set to `"currentTokenId"`.
 */
export function useLineCurrentTokenId<TFunctionName extends 'currentTokenId', TSelectData = ReadContractResult<typeof lineABI, TFunctionName>>(
  config: Omit<UseContractReadConfig<typeof lineABI, TFunctionName, TSelectData>, 'abi' | 'address' | 'functionName'> = {} as any
) {
  return useContractRead({ abi: lineABI, address: lineAddress, functionName: 'currentTokenId', ...config } as UseContractReadConfig<
    typeof lineABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lineABI}__ and `functionName` set to `"descriptor"`.
 */
export function useLineDescriptor<TFunctionName extends 'descriptor', TSelectData = ReadContractResult<typeof lineABI, TFunctionName>>(
  config: Omit<UseContractReadConfig<typeof lineABI, TFunctionName, TSelectData>, 'abi' | 'address' | 'functionName'> = {} as any
) {
  return useContractRead({ abi: lineABI, address: lineAddress, functionName: 'descriptor', ...config } as UseContractReadConfig<
    typeof lineABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lineABI}__ and `functionName` set to `"getApproved"`.
 */
export function useLineGetApproved<TFunctionName extends 'getApproved', TSelectData = ReadContractResult<typeof lineABI, TFunctionName>>(
  config: Omit<UseContractReadConfig<typeof lineABI, TFunctionName, TSelectData>, 'abi' | 'address' | 'functionName'> = {} as any
) {
  return useContractRead({ abi: lineABI, address: lineAddress, functionName: 'getApproved', ...config } as UseContractReadConfig<
    typeof lineABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lineABI}__ and `functionName` set to `"getCurrentPrice"`.
 */
export function useLineGetCurrentPrice<TFunctionName extends 'getCurrentPrice', TSelectData = ReadContractResult<typeof lineABI, TFunctionName>>(
  config: Omit<UseContractReadConfig<typeof lineABI, TFunctionName, TSelectData>, 'abi' | 'address' | 'functionName'> = {} as any
) {
  return useContractRead({ abi: lineABI, address: lineAddress, functionName: 'getCurrentPrice', ...config } as UseContractReadConfig<
    typeof lineABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lineABI}__ and `functionName` set to `"getGrid"`.
 */
export function useLineGetGrid<TFunctionName extends 'getGrid', TSelectData = ReadContractResult<typeof lineABI, TFunctionName>>(
  config: Omit<UseContractReadConfig<typeof lineABI, TFunctionName, TSelectData>, 'abi' | 'address' | 'functionName'> = {} as any
) {
  return useContractRead({ abi: lineABI, address: lineAddress, functionName: 'getGrid', ...config } as UseContractReadConfig<
    typeof lineABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lineABI}__ and `functionName` set to `"getToken"`.
 */
export function useLineGetToken<TFunctionName extends 'getToken', TSelectData = ReadContractResult<typeof lineABI, TFunctionName>>(
  config: Omit<UseContractReadConfig<typeof lineABI, TFunctionName, TSelectData>, 'abi' | 'address' | 'functionName'> = {} as any
) {
  return useContractRead({ abi: lineABI, address: lineAddress, functionName: 'getToken', ...config } as UseContractReadConfig<
    typeof lineABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lineABI}__ and `functionName` set to `"grid"`.
 */
export function useLineGrid<TFunctionName extends 'grid', TSelectData = ReadContractResult<typeof lineABI, TFunctionName>>(
  config: Omit<UseContractReadConfig<typeof lineABI, TFunctionName, TSelectData>, 'abi' | 'address' | 'functionName'> = {} as any
) {
  return useContractRead({ abi: lineABI, address: lineAddress, functionName: 'grid', ...config } as UseContractReadConfig<
    typeof lineABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lineABI}__ and `functionName` set to `"isApprovedForAll"`.
 */
export function useLineIsApprovedForAll<TFunctionName extends 'isApprovedForAll', TSelectData = ReadContractResult<typeof lineABI, TFunctionName>>(
  config: Omit<UseContractReadConfig<typeof lineABI, TFunctionName, TSelectData>, 'abi' | 'address' | 'functionName'> = {} as any
) {
  return useContractRead({ abi: lineABI, address: lineAddress, functionName: 'isApprovedForAll', ...config } as UseContractReadConfig<
    typeof lineABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lineABI}__ and `functionName` set to `"merkleRoot"`.
 */
export function useLineMerkleRoot<TFunctionName extends 'merkleRoot', TSelectData = ReadContractResult<typeof lineABI, TFunctionName>>(
  config: Omit<UseContractReadConfig<typeof lineABI, TFunctionName, TSelectData>, 'abi' | 'address' | 'functionName'> = {} as any
) {
  return useContractRead({ abi: lineABI, address: lineAddress, functionName: 'merkleRoot', ...config } as UseContractReadConfig<
    typeof lineABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lineABI}__ and `functionName` set to `"mintableCoordinates"`.
 */
export function useLineMintableCoordinates<
  TFunctionName extends 'mintableCoordinates',
  TSelectData = ReadContractResult<typeof lineABI, TFunctionName>
>(config: Omit<UseContractReadConfig<typeof lineABI, TFunctionName, TSelectData>, 'abi' | 'address' | 'functionName'> = {} as any) {
  return useContractRead({ abi: lineABI, address: lineAddress, functionName: 'mintableCoordinates', ...config } as UseContractReadConfig<
    typeof lineABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lineABI}__ and `functionName` set to `"name"`.
 */
export function useLineName<TFunctionName extends 'name', TSelectData = ReadContractResult<typeof lineABI, TFunctionName>>(
  config: Omit<UseContractReadConfig<typeof lineABI, TFunctionName, TSelectData>, 'abi' | 'address' | 'functionName'> = {} as any
) {
  return useContractRead({ abi: lineABI, address: lineAddress, functionName: 'name', ...config } as UseContractReadConfig<
    typeof lineABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lineABI}__ and `functionName` set to `"numLockedOriginPoints"`.
 */
export function useLineNumLockedOriginPoints<
  TFunctionName extends 'numLockedOriginPoints',
  TSelectData = ReadContractResult<typeof lineABI, TFunctionName>
>(config: Omit<UseContractReadConfig<typeof lineABI, TFunctionName, TSelectData>, 'abi' | 'address' | 'functionName'> = {} as any) {
  return useContractRead({ abi: lineABI, address: lineAddress, functionName: 'numLockedOriginPoints', ...config } as UseContractReadConfig<
    typeof lineABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lineABI}__ and `functionName` set to `"owner"`.
 */
export function useLineOwner<TFunctionName extends 'owner', TSelectData = ReadContractResult<typeof lineABI, TFunctionName>>(
  config: Omit<UseContractReadConfig<typeof lineABI, TFunctionName, TSelectData>, 'abi' | 'address' | 'functionName'> = {} as any
) {
  return useContractRead({ abi: lineABI, address: lineAddress, functionName: 'owner', ...config } as UseContractReadConfig<
    typeof lineABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lineABI}__ and `functionName` set to `"ownerOf"`.
 */
export function useLineOwnerOf<TFunctionName extends 'ownerOf', TSelectData = ReadContractResult<typeof lineABI, TFunctionName>>(
  config: Omit<UseContractReadConfig<typeof lineABI, TFunctionName, TSelectData>, 'abi' | 'address' | 'functionName'> = {} as any
) {
  return useContractRead({ abi: lineABI, address: lineAddress, functionName: 'ownerOf', ...config } as UseContractReadConfig<
    typeof lineABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lineABI}__ and `functionName` set to `"pendingOwner"`.
 */
export function useLinePendingOwner<TFunctionName extends 'pendingOwner', TSelectData = ReadContractResult<typeof lineABI, TFunctionName>>(
  config: Omit<UseContractReadConfig<typeof lineABI, TFunctionName, TSelectData>, 'abi' | 'address' | 'functionName'> = {} as any
) {
  return useContractRead({ abi: lineABI, address: lineAddress, functionName: 'pendingOwner', ...config } as UseContractReadConfig<
    typeof lineABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lineABI}__ and `functionName` set to `"supportsInterface"`.
 */
export function useLineSupportsInterface<TFunctionName extends 'supportsInterface', TSelectData = ReadContractResult<typeof lineABI, TFunctionName>>(
  config: Omit<UseContractReadConfig<typeof lineABI, TFunctionName, TSelectData>, 'abi' | 'address' | 'functionName'> = {} as any
) {
  return useContractRead({ abi: lineABI, address: lineAddress, functionName: 'supportsInterface', ...config } as UseContractReadConfig<
    typeof lineABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lineABI}__ and `functionName` set to `"symbol"`.
 */
export function useLineSymbol<TFunctionName extends 'symbol', TSelectData = ReadContractResult<typeof lineABI, TFunctionName>>(
  config: Omit<UseContractReadConfig<typeof lineABI, TFunctionName, TSelectData>, 'abi' | 'address' | 'functionName'> = {} as any
) {
  return useContractRead({ abi: lineABI, address: lineAddress, functionName: 'symbol', ...config } as UseContractReadConfig<
    typeof lineABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lineABI}__ and `functionName` set to `"tokenIdToTokenInfo"`.
 */
export function useLineTokenIdToTokenInfo<
  TFunctionName extends 'tokenIdToTokenInfo',
  TSelectData = ReadContractResult<typeof lineABI, TFunctionName>
>(config: Omit<UseContractReadConfig<typeof lineABI, TFunctionName, TSelectData>, 'abi' | 'address' | 'functionName'> = {} as any) {
  return useContractRead({ abi: lineABI, address: lineAddress, functionName: 'tokenIdToTokenInfo', ...config } as UseContractReadConfig<
    typeof lineABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lineABI}__ and `functionName` set to `"tokenURI"`.
 */
export function useLineTokenUri<TFunctionName extends 'tokenURI', TSelectData = ReadContractResult<typeof lineABI, TFunctionName>>(
  config: Omit<UseContractReadConfig<typeof lineABI, TFunctionName, TSelectData>, 'abi' | 'address' | 'functionName'> = {} as any
) {
  return useContractRead({ abi: lineABI, address: lineAddress, functionName: 'tokenURI', ...config } as UseContractReadConfig<
    typeof lineABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link lineABI}__.
 */
export function useLineWrite<TFunctionName extends string, TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<PrepareWriteContractResult<typeof lineABI, string>['request']['abi'], TFunctionName, TMode>
    : UseContractWriteConfig<typeof lineABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any
) {
  return useContractWrite<typeof lineABI, TFunctionName, TMode>({ abi: lineABI, address: lineAddress, ...config } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link lineABI}__ and `functionName` set to `"acceptOwnership"`.
 */
export function useLineAcceptOwnership<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<PrepareWriteContractResult<typeof lineABI, 'acceptOwnership'>['request']['abi'], 'acceptOwnership', TMode> & {
        functionName?: 'acceptOwnership'
      }
    : UseContractWriteConfig<typeof lineABI, 'acceptOwnership', TMode> & {
        abi?: never
        functionName?: 'acceptOwnership'
      } = {} as any
) {
  return useContractWrite<typeof lineABI, 'acceptOwnership', TMode>({
    abi: lineABI,
    address: lineAddress,
    functionName: 'acceptOwnership',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link lineABI}__ and `functionName` set to `"approve"`.
 */
export function useLineApprove<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<PrepareWriteContractResult<typeof lineABI, 'approve'>['request']['abi'], 'approve', TMode> & { functionName?: 'approve' }
    : UseContractWriteConfig<typeof lineABI, 'approve', TMode> & {
        abi?: never
        functionName?: 'approve'
      } = {} as any
) {
  return useContractWrite<typeof lineABI, 'approve', TMode>({ abi: lineABI, address: lineAddress, functionName: 'approve', ...config } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link lineABI}__ and `functionName` set to `"closeMint"`.
 */
export function useLineCloseMint<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<PrepareWriteContractResult<typeof lineABI, 'closeMint'>['request']['abi'], 'closeMint', TMode> & {
        functionName?: 'closeMint'
      }
    : UseContractWriteConfig<typeof lineABI, 'closeMint', TMode> & {
        abi?: never
        functionName?: 'closeMint'
      } = {} as any
) {
  return useContractWrite<typeof lineABI, 'closeMint', TMode>({ abi: lineABI, address: lineAddress, functionName: 'closeMint', ...config } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link lineABI}__ and `functionName` set to `"lockOriginPoint"`.
 */
export function useLineLockOriginPoint<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<PrepareWriteContractResult<typeof lineABI, 'lockOriginPoint'>['request']['abi'], 'lockOriginPoint', TMode> & {
        functionName?: 'lockOriginPoint'
      }
    : UseContractWriteConfig<typeof lineABI, 'lockOriginPoint', TMode> & {
        abi?: never
        functionName?: 'lockOriginPoint'
      } = {} as any
) {
  return useContractWrite<typeof lineABI, 'lockOriginPoint', TMode>({
    abi: lineABI,
    address: lineAddress,
    functionName: 'lockOriginPoint',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link lineABI}__ and `functionName` set to `"mintAtPosition"`.
 */
export function useLineMintAtPosition<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<PrepareWriteContractResult<typeof lineABI, 'mintAtPosition'>['request']['abi'], 'mintAtPosition', TMode> & {
        functionName?: 'mintAtPosition'
      }
    : UseContractWriteConfig<typeof lineABI, 'mintAtPosition', TMode> & {
        abi?: never
        functionName?: 'mintAtPosition'
      } = {} as any
) {
  return useContractWrite<typeof lineABI, 'mintAtPosition', TMode>({
    abi: lineABI,
    address: lineAddress,
    functionName: 'mintAtPosition',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link lineABI}__ and `functionName` set to `"mintRandom"`.
 */
export function useLineMintRandom<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<PrepareWriteContractResult<typeof lineABI, 'mintRandom'>['request']['abi'], 'mintRandom', TMode> & {
        functionName?: 'mintRandom'
      }
    : UseContractWriteConfig<typeof lineABI, 'mintRandom', TMode> & {
        abi?: never
        functionName?: 'mintRandom'
      } = {} as any
) {
  return useContractWrite<typeof lineABI, 'mintRandom', TMode>({ abi: lineABI, address: lineAddress, functionName: 'mintRandom', ...config } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link lineABI}__ and `functionName` set to `"moveEast"`.
 */
export function useLineMoveEast<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<PrepareWriteContractResult<typeof lineABI, 'moveEast'>['request']['abi'], 'moveEast', TMode> & {
        functionName?: 'moveEast'
      }
    : UseContractWriteConfig<typeof lineABI, 'moveEast', TMode> & {
        abi?: never
        functionName?: 'moveEast'
      } = {} as any
) {
  return useContractWrite<typeof lineABI, 'moveEast', TMode>({ abi: lineABI, address: lineAddress, functionName: 'moveEast', ...config } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link lineABI}__ and `functionName` set to `"moveNorth"`.
 */
export function useLineMoveNorth<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<PrepareWriteContractResult<typeof lineABI, 'moveNorth'>['request']['abi'], 'moveNorth', TMode> & {
        functionName?: 'moveNorth'
      }
    : UseContractWriteConfig<typeof lineABI, 'moveNorth', TMode> & {
        abi?: never
        functionName?: 'moveNorth'
      } = {} as any
) {
  return useContractWrite<typeof lineABI, 'moveNorth', TMode>({ abi: lineABI, address: lineAddress, functionName: 'moveNorth', ...config } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link lineABI}__ and `functionName` set to `"moveNortheast"`.
 */
export function useLineMoveNortheast<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<PrepareWriteContractResult<typeof lineABI, 'moveNortheast'>['request']['abi'], 'moveNortheast', TMode> & {
        functionName?: 'moveNortheast'
      }
    : UseContractWriteConfig<typeof lineABI, 'moveNortheast', TMode> & {
        abi?: never
        functionName?: 'moveNortheast'
      } = {} as any
) {
  return useContractWrite<typeof lineABI, 'moveNortheast', TMode>({
    abi: lineABI,
    address: lineAddress,
    functionName: 'moveNortheast',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link lineABI}__ and `functionName` set to `"moveNorthwest"`.
 */
export function useLineMoveNorthwest<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<PrepareWriteContractResult<typeof lineABI, 'moveNorthwest'>['request']['abi'], 'moveNorthwest', TMode> & {
        functionName?: 'moveNorthwest'
      }
    : UseContractWriteConfig<typeof lineABI, 'moveNorthwest', TMode> & {
        abi?: never
        functionName?: 'moveNorthwest'
      } = {} as any
) {
  return useContractWrite<typeof lineABI, 'moveNorthwest', TMode>({
    abi: lineABI,
    address: lineAddress,
    functionName: 'moveNorthwest',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link lineABI}__ and `functionName` set to `"moveSouth"`.
 */
export function useLineMoveSouth<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<PrepareWriteContractResult<typeof lineABI, 'moveSouth'>['request']['abi'], 'moveSouth', TMode> & {
        functionName?: 'moveSouth'
      }
    : UseContractWriteConfig<typeof lineABI, 'moveSouth', TMode> & {
        abi?: never
        functionName?: 'moveSouth'
      } = {} as any
) {
  return useContractWrite<typeof lineABI, 'moveSouth', TMode>({ abi: lineABI, address: lineAddress, functionName: 'moveSouth', ...config } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link lineABI}__ and `functionName` set to `"moveSoutheast"`.
 */
export function useLineMoveSoutheast<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<PrepareWriteContractResult<typeof lineABI, 'moveSoutheast'>['request']['abi'], 'moveSoutheast', TMode> & {
        functionName?: 'moveSoutheast'
      }
    : UseContractWriteConfig<typeof lineABI, 'moveSoutheast', TMode> & {
        abi?: never
        functionName?: 'moveSoutheast'
      } = {} as any
) {
  return useContractWrite<typeof lineABI, 'moveSoutheast', TMode>({
    abi: lineABI,
    address: lineAddress,
    functionName: 'moveSoutheast',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link lineABI}__ and `functionName` set to `"moveSouthwest"`.
 */
export function useLineMoveSouthwest<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<PrepareWriteContractResult<typeof lineABI, 'moveSouthwest'>['request']['abi'], 'moveSouthwest', TMode> & {
        functionName?: 'moveSouthwest'
      }
    : UseContractWriteConfig<typeof lineABI, 'moveSouthwest', TMode> & {
        abi?: never
        functionName?: 'moveSouthwest'
      } = {} as any
) {
  return useContractWrite<typeof lineABI, 'moveSouthwest', TMode>({
    abi: lineABI,
    address: lineAddress,
    functionName: 'moveSouthwest',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link lineABI}__ and `functionName` set to `"moveWest"`.
 */
export function useLineMoveWest<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<PrepareWriteContractResult<typeof lineABI, 'moveWest'>['request']['abi'], 'moveWest', TMode> & {
        functionName?: 'moveWest'
      }
    : UseContractWriteConfig<typeof lineABI, 'moveWest', TMode> & {
        abi?: never
        functionName?: 'moveWest'
      } = {} as any
) {
  return useContractWrite<typeof lineABI, 'moveWest', TMode>({ abi: lineABI, address: lineAddress, functionName: 'moveWest', ...config } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link lineABI}__ and `functionName` set to `"renounceOwnership"`.
 */
export function useLineRenounceOwnership<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<PrepareWriteContractResult<typeof lineABI, 'renounceOwnership'>['request']['abi'], 'renounceOwnership', TMode> & {
        functionName?: 'renounceOwnership'
      }
    : UseContractWriteConfig<typeof lineABI, 'renounceOwnership', TMode> & {
        abi?: never
        functionName?: 'renounceOwnership'
      } = {} as any
) {
  return useContractWrite<typeof lineABI, 'renounceOwnership', TMode>({
    abi: lineABI,
    address: lineAddress,
    functionName: 'renounceOwnership',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link lineABI}__ and `functionName` set to `"safeTransferFrom"`.
 */
export function useLineSafeTransferFrom<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<PrepareWriteContractResult<typeof lineABI, 'safeTransferFrom'>['request']['abi'], 'safeTransferFrom', TMode> & {
        functionName?: 'safeTransferFrom'
      }
    : UseContractWriteConfig<typeof lineABI, 'safeTransferFrom', TMode> & {
        abi?: never
        functionName?: 'safeTransferFrom'
      } = {} as any
) {
  return useContractWrite<typeof lineABI, 'safeTransferFrom', TMode>({
    abi: lineABI,
    address: lineAddress,
    functionName: 'safeTransferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link lineABI}__ and `functionName` set to `"setApprovalForAll"`.
 */
export function useLineSetApprovalForAll<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<PrepareWriteContractResult<typeof lineABI, 'setApprovalForAll'>['request']['abi'], 'setApprovalForAll', TMode> & {
        functionName?: 'setApprovalForAll'
      }
    : UseContractWriteConfig<typeof lineABI, 'setApprovalForAll', TMode> & {
        abi?: never
        functionName?: 'setApprovalForAll'
      } = {} as any
) {
  return useContractWrite<typeof lineABI, 'setApprovalForAll', TMode>({
    abi: lineABI,
    address: lineAddress,
    functionName: 'setApprovalForAll',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link lineABI}__ and `functionName` set to `"setDescriptor"`.
 */
export function useLineSetDescriptor<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<PrepareWriteContractResult<typeof lineABI, 'setDescriptor'>['request']['abi'], 'setDescriptor', TMode> & {
        functionName?: 'setDescriptor'
      }
    : UseContractWriteConfig<typeof lineABI, 'setDescriptor', TMode> & {
        abi?: never
        functionName?: 'setDescriptor'
      } = {} as any
) {
  return useContractWrite<typeof lineABI, 'setDescriptor', TMode>({
    abi: lineABI,
    address: lineAddress,
    functionName: 'setDescriptor',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link lineABI}__ and `functionName` set to `"setInitialAvailableCoordinates"`.
 */
export function useLineSetInitialAvailableCoordinates<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof lineABI, 'setInitialAvailableCoordinates'>['request']['abi'],
        'setInitialAvailableCoordinates',
        TMode
      > & { functionName?: 'setInitialAvailableCoordinates' }
    : UseContractWriteConfig<typeof lineABI, 'setInitialAvailableCoordinates', TMode> & {
        abi?: never
        functionName?: 'setInitialAvailableCoordinates'
      } = {} as any
) {
  return useContractWrite<typeof lineABI, 'setInitialAvailableCoordinates', TMode>({
    abi: lineABI,
    address: lineAddress,
    functionName: 'setInitialAvailableCoordinates',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link lineABI}__ and `functionName` set to `"transferFrom"`.
 */
export function useLineTransferFrom<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<PrepareWriteContractResult<typeof lineABI, 'transferFrom'>['request']['abi'], 'transferFrom', TMode> & {
        functionName?: 'transferFrom'
      }
    : UseContractWriteConfig<typeof lineABI, 'transferFrom', TMode> & {
        abi?: never
        functionName?: 'transferFrom'
      } = {} as any
) {
  return useContractWrite<typeof lineABI, 'transferFrom', TMode>({
    abi: lineABI,
    address: lineAddress,
    functionName: 'transferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link lineABI}__ and `functionName` set to `"transferOwnership"`.
 */
export function useLineTransferOwnership<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<PrepareWriteContractResult<typeof lineABI, 'transferOwnership'>['request']['abi'], 'transferOwnership', TMode> & {
        functionName?: 'transferOwnership'
      }
    : UseContractWriteConfig<typeof lineABI, 'transferOwnership', TMode> & {
        abi?: never
        functionName?: 'transferOwnership'
      } = {} as any
) {
  return useContractWrite<typeof lineABI, 'transferOwnership', TMode>({
    abi: lineABI,
    address: lineAddress,
    functionName: 'transferOwnership',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link lineABI}__ and `functionName` set to `"updateConfig"`.
 */
export function useLineUpdateConfig<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<PrepareWriteContractResult<typeof lineABI, 'updateConfig'>['request']['abi'], 'updateConfig', TMode> & {
        functionName?: 'updateConfig'
      }
    : UseContractWriteConfig<typeof lineABI, 'updateConfig', TMode> & {
        abi?: never
        functionName?: 'updateConfig'
      } = {} as any
) {
  return useContractWrite<typeof lineABI, 'updateConfig', TMode>({
    abi: lineABI,
    address: lineAddress,
    functionName: 'updateConfig',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link lineABI}__ and `functionName` set to `"updateMerkleRoot"`.
 */
export function useLineUpdateMerkleRoot<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<PrepareWriteContractResult<typeof lineABI, 'updateMerkleRoot'>['request']['abi'], 'updateMerkleRoot', TMode> & {
        functionName?: 'updateMerkleRoot'
      }
    : UseContractWriteConfig<typeof lineABI, 'updateMerkleRoot', TMode> & {
        abi?: never
        functionName?: 'updateMerkleRoot'
      } = {} as any
) {
  return useContractWrite<typeof lineABI, 'updateMerkleRoot', TMode>({
    abi: lineABI,
    address: lineAddress,
    functionName: 'updateMerkleRoot',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link lineABI}__ and `functionName` set to `"withdraw"`.
 */
export function useLineWithdraw<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<PrepareWriteContractResult<typeof lineABI, 'withdraw'>['request']['abi'], 'withdraw', TMode> & {
        functionName?: 'withdraw'
      }
    : UseContractWriteConfig<typeof lineABI, 'withdraw', TMode> & {
        abi?: never
        functionName?: 'withdraw'
      } = {} as any
) {
  return useContractWrite<typeof lineABI, 'withdraw', TMode>({ abi: lineABI, address: lineAddress, functionName: 'withdraw', ...config } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link lineABI}__.
 */
export function usePrepareLineWrite<TFunctionName extends string>(
  config: Omit<UsePrepareContractWriteConfig<typeof lineABI, TFunctionName>, 'abi' | 'address'> = {} as any
) {
  return usePrepareContractWrite({ abi: lineABI, address: lineAddress, ...config } as UsePrepareContractWriteConfig<typeof lineABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link lineABI}__ and `functionName` set to `"acceptOwnership"`.
 */
export function usePrepareLineAcceptOwnership(
  config: Omit<UsePrepareContractWriteConfig<typeof lineABI, 'acceptOwnership'>, 'abi' | 'address' | 'functionName'> = {} as any
) {
  return usePrepareContractWrite({ abi: lineABI, address: lineAddress, functionName: 'acceptOwnership', ...config } as UsePrepareContractWriteConfig<
    typeof lineABI,
    'acceptOwnership'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link lineABI}__ and `functionName` set to `"approve"`.
 */
export function usePrepareLineApprove(
  config: Omit<UsePrepareContractWriteConfig<typeof lineABI, 'approve'>, 'abi' | 'address' | 'functionName'> = {} as any
) {
  return usePrepareContractWrite({ abi: lineABI, address: lineAddress, functionName: 'approve', ...config } as UsePrepareContractWriteConfig<
    typeof lineABI,
    'approve'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link lineABI}__ and `functionName` set to `"closeMint"`.
 */
export function usePrepareLineCloseMint(
  config: Omit<UsePrepareContractWriteConfig<typeof lineABI, 'closeMint'>, 'abi' | 'address' | 'functionName'> = {} as any
) {
  return usePrepareContractWrite({ abi: lineABI, address: lineAddress, functionName: 'closeMint', ...config } as UsePrepareContractWriteConfig<
    typeof lineABI,
    'closeMint'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link lineABI}__ and `functionName` set to `"lockOriginPoint"`.
 */
export function usePrepareLineLockOriginPoint(
  config: Omit<UsePrepareContractWriteConfig<typeof lineABI, 'lockOriginPoint'>, 'abi' | 'address' | 'functionName'> = {} as any
) {
  return usePrepareContractWrite({ abi: lineABI, address: lineAddress, functionName: 'lockOriginPoint', ...config } as UsePrepareContractWriteConfig<
    typeof lineABI,
    'lockOriginPoint'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link lineABI}__ and `functionName` set to `"mintAtPosition"`.
 */
export function usePrepareLineMintAtPosition(
  config: Omit<UsePrepareContractWriteConfig<typeof lineABI, 'mintAtPosition'>, 'abi' | 'address' | 'functionName'> = {} as any
) {
  return usePrepareContractWrite({ abi: lineABI, address: lineAddress, functionName: 'mintAtPosition', ...config } as UsePrepareContractWriteConfig<
    typeof lineABI,
    'mintAtPosition'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link lineABI}__ and `functionName` set to `"mintRandom"`.
 */
export function usePrepareLineMintRandom(
  config: Omit<UsePrepareContractWriteConfig<typeof lineABI, 'mintRandom'>, 'abi' | 'address' | 'functionName'> = {} as any
) {
  return usePrepareContractWrite({ abi: lineABI, address: lineAddress, functionName: 'mintRandom', ...config } as UsePrepareContractWriteConfig<
    typeof lineABI,
    'mintRandom'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link lineABI}__ and `functionName` set to `"moveEast"`.
 */
export function usePrepareLineMoveEast(
  config: Omit<UsePrepareContractWriteConfig<typeof lineABI, 'moveEast'>, 'abi' | 'address' | 'functionName'> = {} as any
) {
  return usePrepareContractWrite({ abi: lineABI, address: lineAddress, functionName: 'moveEast', ...config } as UsePrepareContractWriteConfig<
    typeof lineABI,
    'moveEast'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link lineABI}__ and `functionName` set to `"moveNorth"`.
 */
export function usePrepareLineMoveNorth(
  config: Omit<UsePrepareContractWriteConfig<typeof lineABI, 'moveNorth'>, 'abi' | 'address' | 'functionName'> = {} as any
) {
  return usePrepareContractWrite({ abi: lineABI, address: lineAddress, functionName: 'moveNorth', ...config } as UsePrepareContractWriteConfig<
    typeof lineABI,
    'moveNorth'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link lineABI}__ and `functionName` set to `"moveNortheast"`.
 */
export function usePrepareLineMoveNortheast(
  config: Omit<UsePrepareContractWriteConfig<typeof lineABI, 'moveNortheast'>, 'abi' | 'address' | 'functionName'> = {} as any
) {
  return usePrepareContractWrite({ abi: lineABI, address: lineAddress, functionName: 'moveNortheast', ...config } as UsePrepareContractWriteConfig<
    typeof lineABI,
    'moveNortheast'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link lineABI}__ and `functionName` set to `"moveNorthwest"`.
 */
export function usePrepareLineMoveNorthwest(
  config: Omit<UsePrepareContractWriteConfig<typeof lineABI, 'moveNorthwest'>, 'abi' | 'address' | 'functionName'> = {} as any
) {
  return usePrepareContractWrite({ abi: lineABI, address: lineAddress, functionName: 'moveNorthwest', ...config } as UsePrepareContractWriteConfig<
    typeof lineABI,
    'moveNorthwest'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link lineABI}__ and `functionName` set to `"moveSouth"`.
 */
export function usePrepareLineMoveSouth(
  config: Omit<UsePrepareContractWriteConfig<typeof lineABI, 'moveSouth'>, 'abi' | 'address' | 'functionName'> = {} as any
) {
  return usePrepareContractWrite({ abi: lineABI, address: lineAddress, functionName: 'moveSouth', ...config } as UsePrepareContractWriteConfig<
    typeof lineABI,
    'moveSouth'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link lineABI}__ and `functionName` set to `"moveSoutheast"`.
 */
export function usePrepareLineMoveSoutheast(
  config: Omit<UsePrepareContractWriteConfig<typeof lineABI, 'moveSoutheast'>, 'abi' | 'address' | 'functionName'> = {} as any
) {
  return usePrepareContractWrite({ abi: lineABI, address: lineAddress, functionName: 'moveSoutheast', ...config } as UsePrepareContractWriteConfig<
    typeof lineABI,
    'moveSoutheast'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link lineABI}__ and `functionName` set to `"moveSouthwest"`.
 */
export function usePrepareLineMoveSouthwest(
  config: Omit<UsePrepareContractWriteConfig<typeof lineABI, 'moveSouthwest'>, 'abi' | 'address' | 'functionName'> = {} as any
) {
  return usePrepareContractWrite({ abi: lineABI, address: lineAddress, functionName: 'moveSouthwest', ...config } as UsePrepareContractWriteConfig<
    typeof lineABI,
    'moveSouthwest'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link lineABI}__ and `functionName` set to `"moveWest"`.
 */
export function usePrepareLineMoveWest(
  config: Omit<UsePrepareContractWriteConfig<typeof lineABI, 'moveWest'>, 'abi' | 'address' | 'functionName'> = {} as any
) {
  return usePrepareContractWrite({ abi: lineABI, address: lineAddress, functionName: 'moveWest', ...config } as UsePrepareContractWriteConfig<
    typeof lineABI,
    'moveWest'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link lineABI}__ and `functionName` set to `"renounceOwnership"`.
 */
export function usePrepareLineRenounceOwnership(
  config: Omit<UsePrepareContractWriteConfig<typeof lineABI, 'renounceOwnership'>, 'abi' | 'address' | 'functionName'> = {} as any
) {
  return usePrepareContractWrite({
    abi: lineABI,
    address: lineAddress,
    functionName: 'renounceOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<typeof lineABI, 'renounceOwnership'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link lineABI}__ and `functionName` set to `"safeTransferFrom"`.
 */
export function usePrepareLineSafeTransferFrom(
  config: Omit<UsePrepareContractWriteConfig<typeof lineABI, 'safeTransferFrom'>, 'abi' | 'address' | 'functionName'> = {} as any
) {
  return usePrepareContractWrite({ abi: lineABI, address: lineAddress, functionName: 'safeTransferFrom', ...config } as UsePrepareContractWriteConfig<
    typeof lineABI,
    'safeTransferFrom'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link lineABI}__ and `functionName` set to `"setApprovalForAll"`.
 */
export function usePrepareLineSetApprovalForAll(
  config: Omit<UsePrepareContractWriteConfig<typeof lineABI, 'setApprovalForAll'>, 'abi' | 'address' | 'functionName'> = {} as any
) {
  return usePrepareContractWrite({
    abi: lineABI,
    address: lineAddress,
    functionName: 'setApprovalForAll',
    ...config,
  } as UsePrepareContractWriteConfig<typeof lineABI, 'setApprovalForAll'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link lineABI}__ and `functionName` set to `"setDescriptor"`.
 */
export function usePrepareLineSetDescriptor(
  config: Omit<UsePrepareContractWriteConfig<typeof lineABI, 'setDescriptor'>, 'abi' | 'address' | 'functionName'> = {} as any
) {
  return usePrepareContractWrite({ abi: lineABI, address: lineAddress, functionName: 'setDescriptor', ...config } as UsePrepareContractWriteConfig<
    typeof lineABI,
    'setDescriptor'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link lineABI}__ and `functionName` set to `"setInitialAvailableCoordinates"`.
 */
export function usePrepareLineSetInitialAvailableCoordinates(
  config: Omit<UsePrepareContractWriteConfig<typeof lineABI, 'setInitialAvailableCoordinates'>, 'abi' | 'address' | 'functionName'> = {} as any
) {
  return usePrepareContractWrite({
    abi: lineABI,
    address: lineAddress,
    functionName: 'setInitialAvailableCoordinates',
    ...config,
  } as UsePrepareContractWriteConfig<typeof lineABI, 'setInitialAvailableCoordinates'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link lineABI}__ and `functionName` set to `"transferFrom"`.
 */
export function usePrepareLineTransferFrom(
  config: Omit<UsePrepareContractWriteConfig<typeof lineABI, 'transferFrom'>, 'abi' | 'address' | 'functionName'> = {} as any
) {
  return usePrepareContractWrite({ abi: lineABI, address: lineAddress, functionName: 'transferFrom', ...config } as UsePrepareContractWriteConfig<
    typeof lineABI,
    'transferFrom'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link lineABI}__ and `functionName` set to `"transferOwnership"`.
 */
export function usePrepareLineTransferOwnership(
  config: Omit<UsePrepareContractWriteConfig<typeof lineABI, 'transferOwnership'>, 'abi' | 'address' | 'functionName'> = {} as any
) {
  return usePrepareContractWrite({
    abi: lineABI,
    address: lineAddress,
    functionName: 'transferOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<typeof lineABI, 'transferOwnership'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link lineABI}__ and `functionName` set to `"updateConfig"`.
 */
export function usePrepareLineUpdateConfig(
  config: Omit<UsePrepareContractWriteConfig<typeof lineABI, 'updateConfig'>, 'abi' | 'address' | 'functionName'> = {} as any
) {
  return usePrepareContractWrite({ abi: lineABI, address: lineAddress, functionName: 'updateConfig', ...config } as UsePrepareContractWriteConfig<
    typeof lineABI,
    'updateConfig'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link lineABI}__ and `functionName` set to `"updateMerkleRoot"`.
 */
export function usePrepareLineUpdateMerkleRoot(
  config: Omit<UsePrepareContractWriteConfig<typeof lineABI, 'updateMerkleRoot'>, 'abi' | 'address' | 'functionName'> = {} as any
) {
  return usePrepareContractWrite({ abi: lineABI, address: lineAddress, functionName: 'updateMerkleRoot', ...config } as UsePrepareContractWriteConfig<
    typeof lineABI,
    'updateMerkleRoot'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link lineABI}__ and `functionName` set to `"withdraw"`.
 */
export function usePrepareLineWithdraw(
  config: Omit<UsePrepareContractWriteConfig<typeof lineABI, 'withdraw'>, 'abi' | 'address' | 'functionName'> = {} as any
) {
  return usePrepareContractWrite({ abi: lineABI, address: lineAddress, functionName: 'withdraw', ...config } as UsePrepareContractWriteConfig<
    typeof lineABI,
    'withdraw'
  >)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link lineABI}__.
 */
export function useLineEvent<TEventName extends string>(
  config: Omit<UseContractEventConfig<typeof lineABI, TEventName>, 'abi' | 'address'> = {} as any
) {
  return useContractEvent({ abi: lineABI, address: lineAddress, ...config } as UseContractEventConfig<typeof lineABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link lineABI}__ and `eventName` set to `"Approval"`.
 */
export function useLineApprovalEvent(config: Omit<UseContractEventConfig<typeof lineABI, 'Approval'>, 'abi' | 'address' | 'eventName'> = {} as any) {
  return useContractEvent({ abi: lineABI, address: lineAddress, eventName: 'Approval', ...config } as UseContractEventConfig<
    typeof lineABI,
    'Approval'
  >)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link lineABI}__ and `eventName` set to `"ApprovalForAll"`.
 */
export function useLineApprovalForAllEvent(
  config: Omit<UseContractEventConfig<typeof lineABI, 'ApprovalForAll'>, 'abi' | 'address' | 'eventName'> = {} as any
) {
  return useContractEvent({ abi: lineABI, address: lineAddress, eventName: 'ApprovalForAll', ...config } as UseContractEventConfig<
    typeof lineABI,
    'ApprovalForAll'
  >)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link lineABI}__ and `eventName` set to `"OwnershipTransferStarted"`.
 */
export function useLineOwnershipTransferStartedEvent(
  config: Omit<UseContractEventConfig<typeof lineABI, 'OwnershipTransferStarted'>, 'abi' | 'address' | 'eventName'> = {} as any
) {
  return useContractEvent({ abi: lineABI, address: lineAddress, eventName: 'OwnershipTransferStarted', ...config } as UseContractEventConfig<
    typeof lineABI,
    'OwnershipTransferStarted'
  >)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link lineABI}__ and `eventName` set to `"OwnershipTransferred"`.
 */
export function useLineOwnershipTransferredEvent(
  config: Omit<UseContractEventConfig<typeof lineABI, 'OwnershipTransferred'>, 'abi' | 'address' | 'eventName'> = {} as any
) {
  return useContractEvent({ abi: lineABI, address: lineAddress, eventName: 'OwnershipTransferred', ...config } as UseContractEventConfig<
    typeof lineABI,
    'OwnershipTransferred'
  >)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link lineABI}__ and `eventName` set to `"Transfer"`.
 */
export function useLineTransferEvent(config: Omit<UseContractEventConfig<typeof lineABI, 'Transfer'>, 'abi' | 'address' | 'eventName'> = {} as any) {
  return useContractEvent({ abi: lineABI, address: lineAddress, eventName: 'Transfer', ...config } as UseContractEventConfig<
    typeof lineABI,
    'Transfer'
  >)
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Core
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link getContract}__ with `abi` set to __{@link lineABI}__.
 */
export function getLine(config: Omit<GetContractArgs, 'abi' | 'address'>) {
  return getContract({ abi: lineABI, address: lineAddress, ...config })
}

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link lineABI}__.
 */
export function writeLine<TFunctionName extends string>(
  config:
    | Omit<WriteContractPreparedArgs<typeof lineABI, TFunctionName>, 'abi' | 'address'>
    | Omit<WriteContractUnpreparedArgs<typeof lineABI, TFunctionName>, 'abi' | 'address'>
) {
  return writeContract({ abi: lineABI, address: lineAddress, ...config } as unknown as WriteContractArgs<typeof lineABI, TFunctionName>)
}

/**
 * Wraps __{@link prepareWriteContract}__ with `abi` set to __{@link lineABI}__.
 */
export function prepareWriteLine<TAbi extends readonly unknown[] = typeof lineABI, TFunctionName extends string = string>(
  config: Omit<PrepareWriteContractConfig<TAbi, TFunctionName>, 'abi' | 'address'>
) {
  return prepareWriteContract({ abi: lineABI, address: lineAddress, ...config } as unknown as PrepareWriteContractConfig<TAbi, TFunctionName>)
}

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link lineABI}__.
 */
export function watchLineEvent<TAbi extends readonly unknown[] = typeof lineABI, TEventName extends string = string>(
  config: Omit<WatchContractEventConfig<TAbi, TEventName>, 'abi' | 'address'>,
  callback: WatchContractEventCallback<TAbi, TEventName>
) {
  return watchContractEvent({ abi: lineABI, address: lineAddress, ...config } as WatchContractEventConfig<TAbi, TEventName>, callback)
}
