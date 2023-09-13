import { ethers } from "ethers";
import { keccak256, parseTokenURI } from "./shared/utils";
import { BrandDID, UserDID, SupportedChainIds, SupportedChains } from "./shared/types";
import { CHAINS_ID_TO_NETWORK, CONTRACT_MAP, MAIN_CHAIN_ID, ABIs, ONE_ADDRESS } from "./shared/constant";

export default class SDKBase {
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

  /**
   * Init the Communities ID resolver SDK
   *
   * @param options - The options for initializing the SDK
   *
   */
  constructor({ isTestnet, providers, alchemyKeys, signerGenerator }) {
    this.isTestnet = isTestnet
    this.providers = providers
    this.alchemyKeys = alchemyKeys
    this.signerGenerator = signerGenerator
  }

  getContract(address: string, abi: any, chainId: SupportedChainIds) {
    const chainsIdToNetwork = CHAINS_ID_TO_NETWORK(this.isTestnet)
    const provider = this.providers[chainsIdToNetwork[chainId]]
    const contract = new ethers.Contract(address, abi, provider)
    return contract
  }

  getWriteContract(address: string, abi: any, chainId: SupportedChainIds) {
    const chainsIdToNetwork = CHAINS_ID_TO_NETWORK(this.isTestnet)
    const contract = this.getContract(address, abi, chainId)
    const provider = this.providers[chainsIdToNetwork[chainId]]
    if (this.signerGenerator[chainsIdToNetwork[chainId]]) {
      const writeableContract = contract.connect(this.signerGenerator[chainsIdToNetwork[chainId]](provider))
      return writeableContract
    }
  }


  /**
   * Set signer for write operation
   *
   * @param signer - ethers.Signer object
   *
   */
  setSigner(signer: ethers.Signer) {
    for(let i in this.signerGenerator) {
      this.signerGenerator[i] = () => signer
    }
  }

  /**
   * Get the chain id of given brand DID
   *
   * @param name - The name of the brand DID
   * @param needHash - If you have already called `keccak256` to name, set this to false
   *
   */
  async getBrandDIDChainId(name: string, needHash: boolean = true) {
    const contractMap = CONTRACT_MAP(this.isTestnet)
    const mainChainId = MAIN_CHAIN_ID(this.isTestnet)
    const LZCommunityRegistryInterface = this.getContract(contractMap[mainChainId].LZCommunityRegistryInterface, ABIs.LZCommunityRegistryInterface, mainChainId);
    const CommunityRegistry = this.getContract(contractMap[mainChainId].CommunityRegistry, ABIs.CommunityRegistry, mainChainId);
    const labelHash = needHash ? keccak256(name) : name
    const chainId = await LZCommunityRegistryInterface.getOmniNodeChainId(labelHash)
    const node = await CommunityRegistry.getNode(labelHash)
    if (!Number(chainId) && node.node) {
      return mainChainId
    }
    return Number(chainId)
  }


  async _searchBrandDID(name: string): Promise<BrandDID | null> {
    const chainId = await this.getBrandDIDChainId(name)
    if (chainId === 0) {
      return null
    }
    const contractMap = CONTRACT_MAP(this.isTestnet)
    const contractAddress = contractMap[chainId]
    const _chainId = chainId as SupportedChainIds
    const CommunityRegistry = this.getContract(contractAddress.CommunityRegistry, ABIs.CommunityRegistry, _chainId)
    const MemberRegistryInterfaceFactory = this.getContract(contractAddress.MemberRegistryInterfaceFactory, ABIs.MemberRegistryInterfaceFactory, _chainId)
    const MemberTokenomics = this.getContract(contractAddress.MemberTokenomics, ABIs.MemberTokenomics, _chainId)
    const MemberTokenURI = this.getContract(contractAddress.MemberTokenURI, ABIs.MemberTokenURI, _chainId)
    const node = await CommunityRegistry.getNode(keccak256(name))

    if (!node.node) {
      return { chainId }
    }

    const registryInterface = await MemberRegistryInterfaceFactory.getMemberRegistryInterface(keccak256(name))

    const state = await CommunityRegistry.getNodeState(keccak256(name))
    const { registry, tokenId } = node
    const tokenUriString = await CommunityRegistry.tokenURI(tokenId)
    const tokenUri = parseTokenURI(tokenUriString)
    const priceModel = await MemberTokenomics.getCommunityConfig(registry)

    const MemberRegistry = this.getContract(registry, ABIs.MemberRegistry, _chainId)
    const MemberRegistryInterface = this.getContract(registryInterface, ABIs.MemberRegistryInterface, _chainId)

    const config = await MemberRegistryInterface.getConfig()
    const imageBaseURI = await MemberTokenURI.getImageBaseURI(registry)

    const owner = await CommunityRegistry.unsafeOwnerOf(tokenId)
    const pool = await MemberRegistryInterface.getCapitalPool()

    const totalSupply = await MemberRegistry.totalSupply()

    return {
      chainId,
      state,
      owner,
      pool: pool,
      totalSupply: Number(totalSupply),
      node: {
        node: node.node,
        tokenId: Number(node.tokenId),
        expireTime: Number(node.expireTime),
        registTime: Number(node.registTime),
        createTime: Number(node.createTime),
        registry: node.registry,
        registryInterface: registryInterface
      },
      tokenUri: {
        name: tokenUri.name,
        description: tokenUri.description,
        image: tokenUri.image,
        brand_image: tokenUri.brand_image,
        brand_color: tokenUri.brand_color,
        external_url: tokenUri.external_url,
        attributes: tokenUri.attributes,
      },
      priceModel: {
        commissionRate: priceModel.commissionRate,
        mode: priceModel.mode,
        a: priceModel.a,
        b: priceModel.b,
        c: priceModel.c,
        d: priceModel.d,
      },
      config: {
        imageBaseURI: imageBaseURI,
        nodeValidator: config.nodeValidator,
        signatureMint: config.signatureMint,
        publicMint: config.publicMint,
        holdingMint: config.holdingMint,
        proofOfHolding: config.proofOfHolding,
        signer: config.signer,
        coin: config.coin,
      }
    }
  }

  async _searchUserDID(name: string, brandDID?: BrandDID): Promise<UserDID | null> {
    const dotPosition = name.lastIndexOf(".");
    if (dotPosition === -1) {
      throw new Error("The format of DID invalid, the corrent format is `${member}.${community}`");
    }
    const memberName = name.substring(0, dotPosition);
    const communityName = name.substring(dotPosition + 1);
    let chainId, communityNode, registryInterface, contractAddress
    const contractMap = CONTRACT_MAP(this.isTestnet)
    if (!brandDID || !brandDID.node) {
      chainId = await this.getBrandDIDChainId(communityName)
      contractAddress = contractMap[chainId]
      const CommunityRegistry = this.getContract(contractAddress.CommunityRegistry, ABIs.CommunityRegistry, chainId as SupportedChainIds)
      const MemberRegistryInterfaceFactory = this.getContract(contractAddress.MemberRegistryInterfaceFactory, ABIs.MemberRegistryInterfaceFactory, chainId as SupportedChainIds)
      communityNode = await CommunityRegistry.getNode(keccak256(communityName))
      registryInterface = await MemberRegistryInterfaceFactory.getMemberRegistryInterface(keccak256(communityName))
    } else  {
      chainId = brandDID.chainId
      communityNode = brandDID.node
      contractAddress = contractMap[chainId]
      registryInterface = brandDID.node.registryInterface
    }
    
    if (!communityNode.node) {
      return null
    }
    const { registry } = communityNode
    const MemberRegistry = this.getContract(registry, ABIs.MemberRegistry, chainId as SupportedChainIds)
    const MemberRegistryInterface = this.getContract(registryInterface, ABIs.MemberRegistryInterface, chainId as SupportedChainIds)
    const memberNameHash = keccak256(memberName)
    const memberRegistryNode = await MemberRegistry.getNode(memberNameHash)
    const memberRegistryInterfaceNode = await MemberRegistryInterface.getNodeInfo(memberNameHash)

    if (!memberRegistryNode.node) {
      return null
    }
    const state = await MemberRegistry.getNodeState(memberNameHash)
    const { tokenId } = memberRegistryNode
    const tokenUriString = await MemberRegistry.tokenURI(tokenId)
    const tokenUri = parseTokenURI(tokenUriString)
    const owner = await MemberRegistry.ownerOf(tokenId)
    return {
      chainId,
      state,
      owner,
      node: {
        node: memberRegistryNode.node,
        tokenId: Number(memberRegistryNode.tokenId),
        expireTime: Number(memberRegistryNode.expireTime),
        registTime: Number(memberRegistryNode.registTime),
        createTime: Number(memberRegistryNode.createTime),
      },
      interfaceNode: {
        basePrice: memberRegistryInterfaceNode.basePrice,
        commission: memberRegistryInterfaceNode.commission,
        input: memberRegistryInterfaceNode.input,
      },
      tokenUri: {
        name: tokenUri.name,
        description: tokenUri.description,
        image: tokenUri.image,
        attributes: tokenUri.attributes,
      }
    }
  }

}
