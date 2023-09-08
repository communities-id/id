import SDKBase from "./base";
import { BrandDID, UserDID, SupportedChains } from "./shared/types";
import { fetchAllCommunities, fetchAllCommunitiesOfAddress, fetchAllMembersOfAddress, fetchAllMembersOfCommunity } from './shared/alchemy'
import { CHAINS_ID_TO_NETWORK} from "./shared/constant";

export default class Collector extends SDKBase {
  constructor(options) {
    super(options)
  }

  /**
   * Get the barnd DID info by name
   *
   * @param name - The name of the barnd DID
   *
   */
  async searchBrandDID(name: string): Promise<BrandDID | null> {
    return await this._searchBrandDID(name)
  }

  /**
   * Get the user DID info by name
   *
   * @param name - The name of the user DID, the format should be `${userDID}.${brandDID}`
   *
   */
  async searchUserDID(name: string): Promise<UserDID | null> {
    return await this._searchUserDID(name)
  }

  /**
   * Get all brand DIDs in specific chain
   *
   * @param chain - The chain that you want to get brand DIDs
   */
  async getAllBrandDIDs(chain: SupportedChains): Promise<object[]> {
    const res = await fetchAllCommunities(chain, this.alchemyKeys[chain], this.isTestnet)
    return res
  }

  /**
   * Get all brand DIDs owned by an address in specific chain
   *
   * @param address - The address you want to get brand DIDs
   * @param chain - The chain that you want to get brand DIDs
   *
   */
  async getAllBrandDIDsOwnedByAddress(address: string, chain: SupportedChains): Promise<object[]> {
    const res = await fetchAllCommunitiesOfAddress(address, chain, this.alchemyKeys[chain], this.isTestnet)
    return res
  }

  /**
   * Get all user DIDs owned by an address in specific chain
   *
   * @param address - The address you want to get user DIDs
   * @param chain - The chain that you want to get user DIDs
   *
   */
  async getAllUserDIDsOwnedByAddress(address: string, chain: SupportedChains): Promise<object[]> {
    const res = await fetchAllMembersOfAddress(address, chain, this.alchemyKeys[chain])
    return res
  }

  /**
   * Get all brand DIDs joined by an address in specific chain
   *
   * @param address - The address you want to get brand DIDs
   * @param chain - The chain that you want to get brand DIDs
   *
   */
  async getAllBrandDIDsJoinedByAddress(address: string, chain: SupportedChains): Promise<string[]> {
    const members = await fetchAllMembersOfAddress(address, chain, this.alchemyKeys[chain])
    const communityNames = members.map((member) => member.title.split('.')[1])
    const nameMap = {}
    communityNames.forEach((name) => {
      nameMap[name] = true
    })
    return Object.keys(nameMap)
  }


  /**
   * Get all user DIDs under specific brand DID
   *
   * @param name - The name owned by brand DID
   *
   */
  async getAllUserDIDsOwnedByBrand(name: string, registry?: string, chain?: SupportedChains): Promise<object[]> {
    if (!registry || !chain) {
      const commnuityInfo = await this.searchBrandDID(name)
      if (!commnuityInfo) {
        return null
      }
      const { node, chainId } = commnuityInfo
      const chain = CHAINS_ID_TO_NETWORK(this.isTestnet)[chainId]
      const res = await fetchAllMembersOfCommunity(node.registry, chain, this.alchemyKeys[chain])
      return res
    }

    const res = await fetchAllMembersOfCommunity(registry, chain, this.alchemyKeys[chain])
    return res
  }
}