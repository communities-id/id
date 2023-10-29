import axios, { AxiosInstance } from "axios";
import { CONTRACT_MAP } from "./constant";
import { ChainIDs, SupportedChainIds, TestnetChainIDs } from "./types";
import { parseTokenURI } from "./utils";

export default class OpenseaSDK {
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

  createEndPoint(chainID: SupportedChainIds) {
    const baseUrl = this.isTestnet ? 'https://testnets-api.opensea.io/api/v2/chain' : 'https://api.opensea.io/api/v2/chain'
    const chainMap = {
      [ChainIDs.Ethereum]: 'ethereum',
      [ChainIDs.Polygon]: 'matic',
      [ChainIDs.Base]: 'base',
      [ChainIDs.OP]: 'optimism',
      [ChainIDs.BSC]: 'bsc',
      [TestnetChainIDs.Goerli]: 'goerli',
      [TestnetChainIDs["Polygon Mumbai"]]: 'mumbai',
      [TestnetChainIDs["Base Goerli Testnet"]]: 'base_goerli',
      [TestnetChainIDs["Optimism Goerli Testnet"]]: 'optimism_goerli',
      [TestnetChainIDs["BNB Smart Chain Testnet"]]: 'bsctestnet'
    }
    if (!chainMap[chainID]) {
      throw new Error(`This method is currently not support for chain ${chainID}`)
    }
    return `${baseUrl}/${chainMap[chainID]}`
  }

  async _fetchAllNFTsOfUser(chainID: SupportedChainIds, address: string) {
    const url = `${this.createEndPoint(chainID)}/account/${address}/nfts`
    let data = []
    const res = await this.axios.get(url)
    if (res.data && res.data.nfts.length > 0) {
      data = data.concat(res.data.nfts)
    }
    let nextToken = res.data.next
    while (nextToken) {
      const url = `${this.createEndPoint(chainID)}/account/${address}/nfts?next=${nextToken}`
      const res = await this.axios.get(url)
      if (res.data && res.data.nfts.length > 0) {
        data = data.concat(res.data.nfts)
      }
      nextToken = res.data.next
    }
    return data
  }

  async fetchAllCommunities(chainID: SupportedChainIds) {
    const contractAddress = CONTRACT_MAP(this.isTestnet)[chainID].CommunityRegistry
    const url = `${this.createEndPoint(chainID)}/contract/${contractAddress}/nfts`
    let data = []
    const res = await this.axios.get(url)
    if (res.data && res.data.nfts.length > 0) {
      data = data.concat(res.data.nfts)
    }
    let nextToken = res.data.next
    while (nextToken) {
      const url = `${this.createEndPoint(chainID)}/contract/${contractAddress}/nfts?next=${nextToken}`
      const res = await this.axios.get(url)
      if (res.data && res.data.nfts.length > 0) {
        data = data.concat(res.data.nfts)
      }
      nextToken = res.data.next
    }
    return data
  }

  async fetchAllCommunitiesOfAddress(address: string, chainID: SupportedChainIds) {
    const contractAddress = CONTRACT_MAP(this.isTestnet)[chainID].CommunityRegistry
    const allNFTs = await this._fetchAllNFTsOfUser(chainID, address)
    return allNFTs.filter(v => v.contract.toLowerCase() === contractAddress.toLowerCase())
  }

  async fetchAllMembersOfAddress(address: string, chainID: SupportedChainIds) {
    const allCommunities = await this.fetchAllCommunities(chainID)
    const allNFTsOfAddress = await this._fetchAllNFTsOfUser(chainID, address)
    const allCommunitiesAddresses = allCommunities.map(v => {
      const tokenURI = parseTokenURI(v.metadata_url)
      return tokenURI.registry
    })
    return allNFTsOfAddress.filter(v => allCommunitiesAddresses.includes(v.contract))
  }

  async fetchAllMembersOfCommunity(communityAddress: string, chainID: SupportedChainIds) {
    const url = `${this.createEndPoint(chainID)}/contract/${communityAddress}/nfts`
    let data = []
    const res = await this.axios.get(url)
    if (res.data && res.data.nfts.length > 0) {
      data = data.concat(res.data.nfts)
    }
    let nextToken = res.data.next
    while (nextToken) {
      const url = `${this.createEndPoint(chainID)}/contract/${communityAddress}/nfts?next=${nextToken}`
      const res = await this.axios.get(url)
      if (res.data && res.data.nfts.length > 0) {
        data = data.concat(res.data.nfts)
      }
      nextToken = res.data.next
    }
    return data
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
