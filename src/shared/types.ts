import { BigNumber, ethers } from "ethers"

export type SupportedChainIds = 101 | 10121 | 10109
export type SupportedChains = 'mainnet' | 'goerli' | 'mumbai'


export type mainnetCommunitiesIDInput = {
  isTestnet?: false,
  mainnet: {
    // The RPC url for eth main network
    RPCUrl: string,
    // The signer for eth main network, the write method will use this signer to sign the transaction
    generateSigner?: (provider: ethers.providers.Provider) => ethers.Signer
    // The Alchemy key for eth main network
    alchemyKey: string,
  },
  binance: {
    // The RPC url for binance network
    RPCUrl: string,
  },
  arbitrum: {
    // The RPC url for arbitrum network
    RPCUrl: string,
  }
}

export type testnetCommunitiesIDInput = {
  isTestnet: true,
  /**
   * The config for goerli network
   */
  goerli: {
    // The RPC url for goerli network
    RPCUrl: string,
    // The signer for goerli network, the write method will use this signer to sign the transaction
    generateSigner?: (provider: ethers.providers.Provider) => ethers.Signer
    // The Alchemy key for goerli network
    alchemyKey: string,
  },
  /**
   * The config for mumbai network
   */
  mumbai: {
     // The RPC url for polygon mumbai network
     RPCUrl: string,
     // The signer for polygon mumbai network, the write method will use this signer to sign the transaction
     generateSigner?: (provider: ethers.providers.Provider) => ethers.Signer
     // The Alchemy key for polygon mumbai network
     alchemyKey: string,
  }
}

export type CommunitiesIDInput = mainnetCommunitiesIDInput | testnetCommunitiesIDInput

export type BrandDID = {
  chainId: number
  state: number
  owner: string
  pool: number
  totalSupply: number
  node: {
    createTime: number
    expireTime: number
    node: string // community name
    registry: string // community contract address
    registryInterface: string // community interface contract address
    registTime: number // community regist time, mutable time
    tokenId: number // community token id
  },
  tokenUri: {
    name: string
    brand_color: string
    brand_image: string
    description: string
    external_url: string // website
    image: string // avatar
    attributes: []
  },
  priceModel: {
    commissionRate: BigNumber | number
    mode: number
    a: BigNumber | number
    b: BigNumber | number
    c: BigNumber | number
    d: BigNumber | number
  },
  config: {
    imageBaseURI: string
    nodeValidator: string,
    signatureMint: boolean,
    publicMint: boolean,
    holdingMint: boolean,
    proofOfHolding: string[],
    signer: string,
    coin: string,
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
   // The callback function when the transaction is created
   onTransactionCreated?: (transaction: object) => any
}


export type BurnUserDIDOptions = {
  // The brand did that this member belongs to, if you do not pass this, this function will get the brand did by itself
  brandDID?: BrandDID
  // The callback function when the transaction is created
  onTransactionCreated?: (transaction: object) => any
}