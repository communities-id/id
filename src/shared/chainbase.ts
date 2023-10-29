import axios, { AxiosInstance } from "axios";
import { CONTRACT_MAP } from "./constant";
import { SupportedChainIds } from "./types";

export default class ChainbaseSDK {
  apiKey: string
  isTestnet: boolean
  axios: AxiosInstance;

  constructor(apiKey, isTestnet) {
    this.isTestnet = isTestnet
    this.axios = axios.create({
      headers: {
        'x-api-key' : apiKey
      }
    })
  }


  async fetchAllCommunities(chainID: SupportedChainIds) {
    const contractAddress = CONTRACT_MAP(this.isTestnet)[chainID].CommunityRegistry
    const url = `https://api.chainbase.online/v1/nft/collection/items`
    let data = []
    const res = await this.axios.get(url, {
      params: {
        chain_id: chainID,
        contract_address: contractAddress
      }
    })
    return res.data.data
  }

  async fetchAllMembersOfCommunity(communityAddress: string, chainID: SupportedChainIds) {
    const url = `https://api.chainbase.online/v1/nft/collection/items`
    let data = []
    const res = await this.axios.get(url, {
      params: {
        chain_id: chainID,
        contract_address: communityAddress
      }
    })
    return res.data.data
  }

  async fetchProofOfHolding(proofAddresses: string[], address: string, chainID: SupportedChainIds) {
    const contractAddresses = proofAddresses.map(v => v.toLowerCase())
    const allNFTs = await this._fetchAllNFTsOfUser(chainID, address)
    for (let i = 0; i < allNFTs.length; i++) {
      const nft = allNFTs[i]
      if (contractAddresses.indexOf(nft.contract.toLowerCase()) > -1) {
        return {
          holdingContract: nft.contract,
          holdingTokenId: nft.identifier
        }
      }
    }
  }

}
