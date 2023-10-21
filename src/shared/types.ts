import { BigNumber, ethers } from "ethers"

export enum ChainIDs {
  Ethereum = 1,
  Polygon = 137,
  BSC = 56,
  Base = 8453,
  OP = 10
}

export enum TestnetChainIDs {
  Goerli = 5,
  'Polygon Mumbai' = 80001,
  'BNB Smart Chain Testnet' = 97,
  'Base Goerli Testnet' = 84531,
  'Optimism Goerli Testnet' = 420
}

type ToNumber<S> = S extends `${infer N extends number}` ? N : never
export type SupportedChainIds = ToNumber<`${ChainIDs}` | `${TestnetChainIDs}`>
export type SupportedChains = keyof typeof ChainIDs | keyof typeof TestnetChainIDs

export type mainnetCommunitiesIDInput = Record<keyof typeof ChainIDs, {
  RPCUrl: string
  generateSigner?: (provider: ethers.providers.Provider) => ethers.Signer
}> & { 
  isTestnet?: false,
  openseaKey: string,
  arbitrum: { RPCUrl: string }
}

export type testnetCommunitiesIDInput = Record<keyof typeof TestnetChainIDs, {
  RPCUrl: string
  generateSigner?: (provider: ethers.providers.Provider) => ethers.Signer
}> & {
  openseaKey: string,
  isTestnet: true
}

export type CommunitiesIDInput = mainnetCommunitiesIDInput | testnetCommunitiesIDInput

export type BrandDID = {
  chainId: number
  state?: number
  owner?: string
  pool?: BigNumber
  totalSupply?: number
  node?: {
    createTime: number
    expireTime: number
    node: string // community name
    registry: string // community contract address
    registryInterface: string // community interface contract address
    registTime: number // community regist time, mutable time
    tokenId: number // community token id
  },
  tokenUri?: {
    name: string
    brand_color: string
    brand_image: string
    description: string
    external_url: string // website
    image: string // avatar
    attributes: []
  },
  priceModel?: {
    commissionRate: BigNumber
    mode: number
    a: BigNumber
    b: BigNumber
    c: BigNumber
    d: BigNumber
  },
  config?: {
    imageBaseURI: string
    nodeValidator: string,
    signatureMint: boolean,
    publicMint: boolean,
    holdingMint: boolean,
    proofOfHolding: string[],
    signer: string,
    coin: string,
    sequenceMode: number,
    durationUnit: number,
    reserveDuration: number,
    burnAnytime: boolean
  }
}

export type UserDID = {
  chainId: number
  state: number
  owner: string
  node: {
    node: string
    tokenId: number
    expireTime: number
    registTime: number
    createTime: number
  },
  interfaceNode: {
    basePrice: BigNumber // member mint base price
    commission: BigNumber // member commission
    input: BigNumber  // all mint/renew price of this member, use for burne
  }
  tokenUri: {
    name: string
    description: string
    image: string
    attributes: []
  },
}

export type MintUserDIDOptions = {
  // The signature to mint user did
  signature?: string,
  // The owner in signature
  owner?: string,
  // The price to mint this brand did, if you do not pass this, this function will get the price by itself
  mintPrice?: BigNumber | number | string
  // The brand did that this user did belongs to, if you do not pass this, this function will get the brand did by itself
  brandDID?: BrandDID
  // The wallet address to pay excees part money to
  refundRecipient?: string
  // The callback function when the transaction is created
  onTransactionCreated?: (transaction: object) => any
}

export type RenewUserDIDOptions = {
   // The price to mint this brand did, if you do not pass this, this function will get the price by itself
   mintPrice?: BigNumber | number | string
   // The brand did that this user did belongs to, if you do not pass this, this function will get the brand did by itself
   brandDID?: BrandDID
   // The user did object that you want to renew, if you do not pass this, this function will get the brand did by itself
   userDID?: UserDID
   // The wallet address to pay excees part money to
   refundRecipient?: string
   // The callback function when the transaction is created
   onTransactionCreated?: (transaction: object) => any
}


export type BurnUserDIDOptions = {
  // The brand did that this member belongs to, if you do not pass this, this function will get the brand did by itself
  brandDID?: BrandDID
  // The callback function when the transaction is created
  onTransactionCreated?: (transaction: object) => any
}