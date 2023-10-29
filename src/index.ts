import { ethers } from "ethers";
import { CommunitiesIDInput, SupportedChains } from "./shared/types";
import Resolver from "./resolver";
import Collector from "./collector";
import Operator from "./operator";

export default class CommunitiesID {
  version: string
  isTestnet: boolean
  openseaKey: string
  chainbaseKey: string
  providers: Partial<Record<SupportedChains | 'arbitrum', ethers.providers.JsonRpcProvider>>
  signerGenerator: Partial<Record<SupportedChains, (provider: ethers.providers.Provider) => ethers.Signer>>
  resolver: Resolver
  collector: Collector
  operator: Operator

  /**
   * Init the Communities ID resolver SDK
   *
   * @param options - The options for initializing the SDK
   *
   */
  constructor(options: CommunitiesIDInput) {
    this.version = "0.2.1";
    this.isTestnet = !!options.isTestnet
    this.openseaKey = options.openseaKey
    this.chainbaseKey = options.chainbaseKey
    this.providers = {}
    this.signerGenerator = {}
    for (let i in options) {
      if (i === 'isTestnet') {
        continue
      }
      if (options[i].RPCUrl) {
        this.providers[i] = options[i].RPCUrl.indexOf('wss://') > -1 ? new ethers.providers.WebSocketProvider(options[i].RPCUrl) : new ethers.providers.JsonRpcProvider(options[i].RPCUrl)
      }
      this.signerGenerator[i] = options[i].generateSigner
    }

    this.init()
  }

  init() {
    const initOptions = {
      isTestnet: this.isTestnet,
      providers: this.providers,
      openseaKey: this.openseaKey,
      chainbaseKey: this.chainbaseKey,
      signerGenerator: this.signerGenerator,
    }
    this.resolver = new Resolver(initOptions)
    this.collector = new Collector(initOptions)
    this.operator = new Operator(initOptions)
  }
}

export * from './shared/types'
export * from './shared/constant'