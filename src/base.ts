import { ethers } from "ethers";
import { keccak256, parseTokenURI } from "./shared/utils";
import { BrandDID, UserDID, SupportedChainIds, SupportedChains, TestnetChainIDs } from "./shared/types";
import { CHAINS_ID_TO_NETWORK, CONTRACT_MAP, MAIN_CHAIN_ID, ABIs, ONE_ADDRESS } from "./shared/constant";
import OpenseaSDK from "./shared/opensea";

export default class SDKBase {
  version: string
  isTestnet: boolean
  openseaSDK: OpenseaSDK;
  providers: Record<SupportedChains | 'arbitrum', ethers.providers.JsonRpcProvider>
  signerGenerator: Record<SupportedChains, (provider: ethers.providers.Provider) => ethers.Signer>
  signer?: ethers.Signer;

  /**
   * Init the Communities ID resolver SDK
   *
   * @param options - The options for initializing the SDK
   *
   */
  constructor({ isTestnet, providers, openseaKey, signerGenerator }) {
    this.isTestnet = isTestnet
    this.providers = providers
    this.signerGenerator = signerGenerator
    this.openseaSDK = new OpenseaSDK(openseaKey, this.isTestnet)
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
    } else {
      throw new Error('No signer found')
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
    const RelayerCommunityRegistryInterface = this.getContract(contractMap[mainChainId].RelayerCommunityRegistryInterface, ABIs.RelayerCommunityRegistryInterface, mainChainId);
    const CommunityRegistry = this.getContract(contractMap[mainChainId].CommunityRegistry, ABIs.CommunityRegistry, mainChainId);
    const labelHash = needHash ? keccak256(name) : name
    const chainId = await RelayerCommunityRegistryInterface.getOmniNodeChainId(labelHash)
    if (!Number(chainId)) {
      const node = await CommunityRegistry.getNode(labelHash)
      return node.node ? mainChainId : 0
    }
    return Number(chainId)
  }

  async _searchBrandDIDByNode(node: BrandDID['node'], chainId: SupportedChainIds): Promise<BrandDID | null> {
    const contractMap = CONTRACT_MAP(this.isTestnet)
    const contractAddress = contractMap[chainId]
    const CommunityRegistry = this.getContract(contractAddress.CommunityRegistry, ABIs.CommunityRegistry, chainId)
    const MemberRegistryInterfaceFactory = this.getContract(contractAddress.MemberRegistryInterfaceFactory, ABIs.MemberRegistryInterfaceFactory, chainId)
    const MemberTokenomics = this.getContract(contractAddress.MemberTokenomics, ABIs.MemberTokenomics, chainId)
    const MemberTokenURI = this.getContract(contractAddress.MemberTokenURI, ABIs.MemberTokenURI, chainId)

    const registryInterface = await MemberRegistryInterfaceFactory.getMemberRegistryInterface(keccak256(node.node))

    const state = await CommunityRegistry.getNodeState(keccak256(node.node))
    if (state === 0) {
      return null
    }
    const { registry, tokenId } = node
    const tokenUriString = await CommunityRegistry.tokenURI(tokenId)
    const tokenUri = parseTokenURI(tokenUriString)
    const priceModel = await MemberTokenomics.getCommunityConfig(registry)

    const MemberRegistry = this.getContract(registry, ABIs.MemberRegistry, chainId)
    const MemberRegistryInterface = this.getContract(registryInterface, ABIs.MemberRegistryInterface, chainId)

    const config = await MemberRegistryInterface.getConfig()
    let registryConfig = {
      reserveDuration: 0,
      burnAnytime: null,
    }

    try {
      registryConfig = await MemberRegistry.getConfig()
    } catch (e) {
      const MemberRegistry = this.getContract(registry, ABIs.MemberRegistryLegacy, chainId)
      registryConfig = await MemberRegistry.getConfig()
    }
    
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
        sequenceMode: config.sequenceMode,
        durationUnit: Number(config.durationUnit),
        reserveDuration: Number(registryConfig.reserveDuration),
        burnAnytime: registryConfig.burnAnytime
      }
    }
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

    const node = await CommunityRegistry.getNode(keccak256(name))
    if (!node.node) {
      return { chainId }
    }

    const communityInfo = await this._searchBrandDIDByNode(node, _chainId)
    return communityInfo
  }

  async _searchBrandDIDByTokenId(tokenId: number, chainId: SupportedChainIds): Promise<BrandDID | null> {
    const contractMap = CONTRACT_MAP(this.isTestnet)
    const contractAddress = contractMap[chainId]
    const _chainId = chainId as SupportedChainIds
    const CommunityRegistry = this.getContract(contractAddress.CommunityRegistry, ABIs.CommunityRegistry, _chainId)

    const node = await CommunityRegistry.getNodeByTokenId(tokenId)

    if (!node.node) {
      return { chainId }
    }

    const communityInfo = await this._searchBrandDIDByNode(node, _chainId)
    return communityInfo
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
    if (state === 0) {
      return null
    }
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

  async _searchUserDIDByTokenId(registry: string, tokenId: number, chainId: SupportedChainIds): Promise<UserDID | null> {
    const MemberRegistry = this.getContract(registry, ABIs.MemberRegistry, chainId as SupportedChainIds)
    try {
      const { node, baseNode } = await MemberRegistry.getFullNode(tokenId)
      return this._searchUserDID(`${node}.${baseNode}`)
    } catch (e) {
      return null
    }
  }

}
