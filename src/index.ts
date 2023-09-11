import { ethers } from "ethers";
import { CommunitiesIDInput, mainnetCommunitiesIDInput } from "./shared/types";
import Resolver from "./resolver";
import Collector from "./collector";
import Operator from "./operator";

export default class CommunitiesID {
  version: string;
  isTestnet: boolean;
  providers: {
    mainnet?: ethers.providers.JsonRpcProvider,
    binance?: ethers.providers.JsonRpcProvider,
    arbitrum?: ethers.providers.JsonRpcProvider,
    goerli?: ethers.providers.JsonRpcProvider,
    mumbai?: ethers.providers.JsonRpcProvider,
  };
  alchemyKeys: {
    mainnet?: string,
    goerli?: string,
    mumbai?: string,
  };
  signerGenerator: {
    mainnet?: (provider: ethers.providers.Provider) => ethers.Signer,
    goerli?: (provider: ethers.providers.Provider) => ethers.Signer,
    mumbai?: (provider: ethers.providers.Provider) => ethers.Signer,
  };
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
    this.version = "0.0.1";
    if (options.isTestnet) {
      this.isTestnet = true
      const { goerli, mumbai } = options
      this.providers = {
        goerli: goerli.RPCUrl && new ethers.providers.JsonRpcProvider(goerli.RPCUrl),
        mumbai: mumbai.RPCUrl && new ethers.providers.JsonRpcProvider(mumbai.RPCUrl),
      }
      this.alchemyKeys = {
        goerli: goerli.alchemyKey,
        mumbai: mumbai.alchemyKey
      }
      this.signerGenerator = {
        goerli: goerli.generateSigner,
        mumbai: mumbai.generateSigner
      }
    } else {
      this.isTestnet = false
      const { mainnet, binance, arbitrum } = options as mainnetCommunitiesIDInput
      this.providers = {
        mainnet: mainnet.RPCUrl && new ethers.providers.JsonRpcProvider(mainnet.RPCUrl),
        binance: binance.RPCUrl && new ethers.providers.JsonRpcProvider(binance.RPCUrl),
        arbitrum: arbitrum.RPCUrl && new ethers.providers.JsonRpcProvider(arbitrum.RPCUrl),
      }
      this.alchemyKeys = {
        mainnet: mainnet.alchemyKey,
      }
      this.signerGenerator = {
        mainnet: mainnet.generateSigner,
      }
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