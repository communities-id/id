import { ethers } from "ethers";
import { CommunitiesIDInput, SupportedChains, mainnetCommunitiesIDInput } from "./shared/types";
import Resolver from "./resolver";
import Collector from "./collector";
import Operator from "./operator";

export default class CommunitiesID {
  version: string;
  isTestnet: boolean;
  providers: Partial<Record<SupportedChains | 'arbitrum', ethers.providers.JsonRpcProvider>>
  alchemyKeys: Partial<Record<SupportedChains, string>>
  signerGenerator: Partial<Record<SupportedChains, (provider: ethers.providers.Provider) => ethers.Signer>>
  resolver: Resolver;
  collector: Collector;
  operator: Operator;

  /**
   * Init the Communities ID resolver SDK
   *
   * @param options - The options for initializing the SDK
   *
   */
  constructor(options: CommunitiesIDInput) {
    this.version = "0.2.1";
    this.isTestnet = !!options.isTestnet
    this.providers = {}
    this.alchemyKeys = {}
    this.signerGenerator = {}
    for(let i in options) {
      if (i === 'isTestnet') {
        continue
      }
      this.providers[i] = options[i].RPCUrl && new ethers.providers.JsonRpcProvider(options[i].RPCUrl)
      this.alchemyKeys[i] = options[i].alchemyKey
      this.signerGenerator[i] = options[i].signerGenerator
    }

    this.init()
  }

  init() {
    const initOptions = {
      isTestnet: this.isTestnet,
      providers: this.providers,
      alchemyKeys: this.alchemyKeys,
      signerGenerator: this.signerGenerator,
    }
    this.resolver = new Resolver(initOptions)
    this.collector = new Collector(initOptions)
    this.operator = new Operator(initOptions)
  }
}

export * from './shared/types'