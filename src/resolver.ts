import SID, { getSidAddress } from '@siddomains/sidjs'
import { ABIs, CONTRACT_MAP, MAIN_CHAIN_ID } from "./shared/constant";
import SDKBase from "./base";
import { keccak256 } from "./shared/utils";
import { SupportedChainIds } from "./shared/types";

export default class Resolver extends SDKBase {
  constructor(options) {
    super(options)
  }

  /**
   * Get the owner of a did
   *
   * @param name - The name of the member, the format should be `${member}.${community}`
   *
   */
  async resolveName(name: string): Promise<string | null> {
    const dotPosition = name.lastIndexOf(".");
    if (dotPosition === -1) {
      throw new Error("The format of DID is invalid, the corrent format is `${member}.${community}`");
    }
    const memberName = name.substring(0, dotPosition);
    const communityName = name.substring(dotPosition + 1);
    const chainId = await this.getBrandDIDChainId(communityName)
    if (chainId !== 0) {
      const contractMap = CONTRACT_MAP(this.isTestnet)
      const contractAddress = contractMap[chainId]
      const communityRegistryContract = this.getContract(contractAddress.CommunityRegistry, ABIs.CommunityRegistry, chainId as SupportedChainIds)
      const communityNode = await communityRegistryContract.getNode(keccak256(communityName))
      if (communityNode.node) {
        const { registry } = communityNode
        const MemberRegistry = this.getContract(registry, ABIs.MemberRegistry, chainId as SupportedChainIds)
        const owner = await MemberRegistry.ownerOfNode(keccak256(memberName))
        return owner
      }
    }
    if (!this.isTestnet) {
      if (communityName === 'eth') {
        return await this._resolveNameFromEns(name)
      }
      if (communityName === 'bnb' || communityName === 'arb') {
        return await this._resolveNameFromSID(name)
      }
    }
    return null
  }

  /**
   * Get primary did of an address
   *
   * @param address - The address of the member
   *
   */
  async lookupAddress(address: string): Promise<string | null> {
    const mainChainId = MAIN_CHAIN_ID(this.isTestnet)
    const contractMap = CONTRACT_MAP(this.isTestnet)
    const PrimaryRecord = this.getContract(contractMap[mainChainId].PrimaryRecord, ABIs.PrimaryRecord, mainChainId);
    const res = await PrimaryRecord.getPrimaryRecord(address)
    if (Number(res.node) && Number(res.baseNode)) {
      const chainId = await this.getBrandDIDChainId(res.baseNode, false)
      const contractAddress = contractMap[chainId]
      const CommunityRegistry = this.getContract(contractAddress.CommunityRegistry, ABIs.CommunityRegistry, chainId as SupportedChainIds)
      const node = await CommunityRegistry.getNode(res.baseNode)
      if (node.node) {
        const { registry } = node
        const MemberRegistry = this.getContract(registry, ABIs.MemberRegistry, chainId as SupportedChainIds)
        const memberNode = await MemberRegistry.getNode(res.node)
        if (memberNode.node) {
          const { tokenId } = memberNode
          const owner = await MemberRegistry.unsafeOwnerOf(tokenId)
          if (owner.toLowerCase() === address.toLowerCase()) {
            return `${memberNode.node}.${node.node}`
          }
        }
      }
    }

    if (!this.isTestnet) {
      const ensName = await this._lookupAddressFromENS(address)
      const sidName = await this._lookupAddressFromSID(address)
      if (ensName || sidName) {
        return ensName || sidName
      }
    }
    return null
  }

  async _resolveNameFromEns(name: string) {
    const provider = this.providers.Ethereum
    const ensName = await provider.resolveName(name);
    return ensName
  }

  async _resolveNameFromSID(name: string) {
    const nameArr = name.split('.')
    const communityName = nameArr[nameArr.length - 1]
    if (communityName === 'bnb' && this.providers.BSC) {
      try {
        const sid = new SID({ provider: this.providers.BSC, sidAddress: getSidAddress(97) })
        return await sid.name(name).getAddress()
      } catch (e) { }
    }
    if (communityName === 'arb' && this.providers.arbitrum) {
      try {
        const sid = new SID({ provider: this.providers.arbitrum, sidAddress: getSidAddress(42161) })
        return await sid.name(name).getAddress('ARB1')
      } catch (e) { }
    }
    return null
  }

  async _lookupAddressFromENS(address: string) {
    const provider = this.providers.Ethereum
    const ensAddress = await provider.lookupAddress(address);
    return ensAddress
  }

  async _lookupAddressFromSID(address: string) {
    let bnbName = { name: null }, arbName = { name: null }
    if (this.providers.BSC) {
      try {
        const sid = new SID({ provider: this.providers.BSC, sidAddress: getSidAddress(97) })
        bnbName = await sid.getName(address)
      } catch (e) { }
    }
    if (this.providers.arbitrum) {
      try {
        const sid = new SID({ provider: this.providers.arbitrum, sidAddress: getSidAddress(42161) })
        arbName = await sid.getName(address)
      } catch (e) { }
    }
    return bnbName.name || arbName.name
  }

}