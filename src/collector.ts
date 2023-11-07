import SDKBase from "./base";
import { BrandDID, UserDID, SupportedChainIds } from "./shared/types";

export default class Collector extends SDKBase {
  constructor(options) {
    super(options)
  }

  /**
   * Get the brand DID info by name
   *
   * @param name - The name of the brand DID
   *
   */
  async searchBrandDID(name: string): Promise<BrandDID | null> {
    return await this._searchBrandDID(name)
  }

  /**
   * Get the brand DID info by tokenId
   *
   * @param tokenId - The token ID of this brand DID
   * @param chainId - The chain ID that that this brand DID is on
   *
   */
  async searchBrandDIDByTokenId(tokenId: number, chainId: SupportedChainIds): Promise<BrandDID | null> {
    return await this._searchBrandDIDByTokenId(tokenId, chainId)
  }

  /**
   * Get the user DID info by name
   *
   * @param name - The name of the user DID, the format should be `${userDID}.${brandDID}`
   *
   */
  async searchUserDID(name: string, brandDID?: BrandDID): Promise<UserDID | null> {
    return await this._searchUserDID(name, brandDID)
  }

  /**
   * Get the user DID info by tokenId
   *
   * @param registry - The registry address of this user DID
   * @param tokenId - The token ID of this user DID
   * @param chainId - The chain ID that that this user DID is on
   *
   */
  async searchUserDIDByTokenId(registry: string, tokenId: number, chainId: SupportedChainIds): Promise<UserDID | null> {
    return await this._searchUserDIDByTokenId(registry, tokenId, chainId)
  }

  /**
   * Get all brand DIDs in specific chain
   *
   * @param chainId - The chain ID that you want to get brand DIDs
   */
  async getAllBrandDIDs(chainId: SupportedChainIds): Promise<object[]> {
    const res = await this.openseaSDK.fetchAllCommunities(chainId)
    return res
  }

  /**
   * Get all brand DIDs owned by an address in specific chain
   *
   * @param address - The address you want to get brand DIDs
   * @param chainId - The chain ID that you want to get brand DIDs
   *
   */
  async getAllBrandDIDsOwnedByAddress(address: string, chainId: SupportedChainIds): Promise<object[]> {
    const res = await this.openseaSDK.fetchAllCommunitiesOfAddress(address, chainId)
    return res
  }

  /**
   * Get all user DIDs owned by an address in specific chain
   *
   * @param address - The address you want to get user DIDs
   * @param chainID - The chain ID that you want to get user DIDs
   *
   */
  async getAllUserDIDsOwnedByAddress(address: string, chainId: SupportedChainIds): Promise<object[]> {
    const res = await this.openseaSDK.fetchAllMembersOfAddress(address, chainId)
    return res
  }

  /**
   * Get all brand DIDs joined by an address in specific chain
   *
   * @param address - The address you want to get brand DIDs
   * @param chainID - The chain ID that you want to get brand DIDs
   *
   */
  async getAllBrandDIDsJoinedByAddress(address: string, chainID: SupportedChainIds): Promise<string[]> {
    const members = await this.openseaSDK.fetchAllMembersOfAddress(address, chainID)
    const communityNames = members.map((member) => member.name.split('.')[1])
    const nameMap = {}
    communityNames.forEach((name) => {
      nameMap[name] = true
    })
    return Object.keys(nameMap)
  }

  /**
   * Get all user DIDs under specific brand DID
   *
   * @param name - The name owned by brand DID, if pass registry and chainID, this parameter will be ignored
   * @param registry - The registry address of this brand DID
   * @param chainID - The chain ID this brand DID is on
   *
   */
  async getAllUserDIDsOwnedByBrand(name: string, registry?: string, chainID?: SupportedChainIds): Promise<object[]> {
    if (!registry || !chainID) {
      const commnuityInfo = await this.searchBrandDID(name)
      if (!commnuityInfo || !commnuityInfo.node) {
        return null
      }
      const { node, chainId } = commnuityInfo
      const res = await this.openseaSDK.fetchAllMembersOfCommunity(node.registry, chainId as SupportedChainIds)
      return res
    }

    const res = await this.openseaSDK.fetchAllMembersOfCommunity(registry, chainID)
    return res
  }

  /**
   * Get all user DIDs owned by specific address under specific brand DID
   *
   * @param address - The address you want to get user DIDs
   * @param name - The name owned by brand DID, if pass registry and chainID, this parameter will be ignored
   * @param registry - The registry address of this brand DID
   * @param chainID - The chain ID this brand DID is on
   *
   */
  async getAllUserDIDsOfOneWalletInOneBrand(address: string, name: string, registry?: string, chainID?: SupportedChainIds): Promise<object[]> {
    if (!registry || !chainID) {
      const commnuityInfo = await this.searchBrandDID(name)
      if (!commnuityInfo || !commnuityInfo.node) {
        return null
      }
      const { node, chainId } = commnuityInfo
      registry = node.registry
      chainID = chainId as SupportedChainIds
    }
    const allNFTsOfAddress = await this.openseaSDK._fetchAllNFTsOfUser(chainID, address)
    return allNFTsOfAddress.filter(v => v.contract.toLowerCase() === registry.toLowerCase())
  }
}