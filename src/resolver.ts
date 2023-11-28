import SID, { getSidAddress } from '@siddomains/sidjs'
import { ABIs, CONTRACT_MAP, MAIN_CHAIN_ID } from "./shared/constant";
import SDKBase from "./base";
import { keccak256 } from "./shared/utils";
import { SupportedChainIds } from "./shared/types";
import { COMMUNITY_ADDRESS_TO_NAME_MAP_MAINNET, COMMUNITY_ADDRESS_TO_NAME_MAP_TESTNET, COMMUNITY_HASH_TO_ADDRESS_MAP_MAINNET, COMMUNITY_HASH_TO_ADDRESS_MAP_TESTNET, COMMUNITY_NAME_TO_ADDRESS_MAP_MAINNET, COMMUNITY_NAME_TO_ADDRESS_MAP_TESTNET, COMMUNITY_NAME_TO_CHAINID_MAP_MAINNET, COMMUNITY_NAME_TO_CHAINID_MAP_TESTNET } from './shared/cache';

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
    if (!this.isTestnet) {
      if (communityName === 'eth') {
        return await this._resolveNameFromEns(name)
      }
      if (communityName === 'bnb' || communityName === 'arb') {
        return await this._resolveNameFromSID(name)
      }
    }
    let chainId = 0
    const nameToChainId = this.isTestnet ? COMMUNITY_NAME_TO_CHAINID_MAP_TESTNET : COMMUNITY_NAME_TO_CHAINID_MAP_MAINNET
    const nameToAddress = this.isTestnet ? COMMUNITY_NAME_TO_ADDRESS_MAP_TESTNET : COMMUNITY_NAME_TO_ADDRESS_MAP_MAINNET
    if (nameToChainId[communityName]) {
      chainId = nameToChainId[communityName]
    } else {
      chainId = await this.getBrandDIDChainId(communityName)
    }
    if (chainId !== 0) {
      let registry = ''
      if (nameToAddress[communityName]) {
        registry = nameToAddress[communityName]
      } else {
        const contractMap = CONTRACT_MAP(this.isTestnet)
        const contractAddress = contractMap[chainId]
        const communityRegistryContract = this.getContract(contractAddress.CommunityRegistry, ABIs.CommunityRegistry, chainId as SupportedChainIds)
        const communityNode = await communityRegistryContract.getNode(keccak256(communityName))
        registry = communityNode.registry
      }
      if (registry) {
        const MemberRegistry = this.getContract(registry, ABIs.MemberRegistry, chainId as SupportedChainIds)
        console.log(chainId, MemberRegistry.address, keccak256(memberName))
        const owner = await MemberRegistry.ownerOfNode(keccak256(memberName))
        return owner
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
      let registry = '', baseName = '', chainId = 0
      const hashToAddress = this.isTestnet ? COMMUNITY_HASH_TO_ADDRESS_MAP_TESTNET : COMMUNITY_HASH_TO_ADDRESS_MAP_MAINNET
      const addressToName = this.isTestnet ? COMMUNITY_ADDRESS_TO_NAME_MAP_TESTNET : COMMUNITY_ADDRESS_TO_NAME_MAP_MAINNET
      const nameToChainId = this.isTestnet ? COMMUNITY_NAME_TO_CHAINID_MAP_TESTNET : COMMUNITY_NAME_TO_CHAINID_MAP_MAINNET
      if (hashToAddress[res.baseNode]) {
        registry = hashToAddress[res.baseNode]
        baseName = addressToName[registry]
        chainId = nameToChainId[baseName]
      } else {
        chainId = await this.getBrandDIDChainId(res.baseNode, false)
        const contractAddress = contractMap[chainId]
        const CommunityRegistry = this.getContract(contractAddress.CommunityRegistry, ABIs.CommunityRegistry, chainId as SupportedChainIds)
        const node = await CommunityRegistry.getNode(res.baseNode)
        registry = node.registry
        baseName = node.node
      }
      if (registry) {
        const MemberRegistry = this.getContract(registry, ABIs.MemberRegistry, chainId as SupportedChainIds)
        const memberNode = await MemberRegistry.getNode(res.node)
        if (memberNode.node) {
          const { tokenId } = memberNode
          const owner = await MemberRegistry.unsafeOwnerOf(tokenId)
          if (owner.toLowerCase() === address.toLowerCase()) {
            return `${memberNode.node}.${baseName}`
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
    try {
      const ensName = await provider.resolveName(name);
      return ensName
    } catch (e) {
      return null
    }
  }

  async _resolveNameFromSID(name: string) {
    const nameArr = name.split('.')
    const communityName = nameArr[nameArr.length - 1]
    if (communityName === 'bnb' && this.providers.BSC) {
      try {
        const sid = new SID({ provider: this.providers.BSC, sidAddress: getSidAddress(97) })
        return await sid.name(name).getAddress()
      } catch (e) {
        return null
      }
    }
    if (communityName === 'arb' && this.providers.arbitrum) {
      try {
        const sid = new SID({ provider: this.providers.arbitrum, sidAddress: getSidAddress(42161) })
        return await sid.name(name).getAddress('ARB1')
      } catch (e) {
        return null
      }
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