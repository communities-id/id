import axios from "axios";
import { CHAINS_NETWORK_TO_ID, CONTRACT_MAP } from "./constant";

function createEndPoint(network: string, apiKey: string) {

  const prefixMap = {
    mainnet: 'eth-mainnet',
    goerli: 'eth-goerli',
    mumbai: 'polygon-mumbai'
  }

  return `https://${prefixMap[network]}.g.alchemy.com/nft/v2/${apiKey}`
}

export const fetchAllCommunities = async (network: string, apiKey: string, isTestnet: boolean = false) => {
  const endPoint = createEndPoint(network, apiKey)
  const contractMap = CONTRACT_MAP(isTestnet)
  const chainsNetworkToId = CHAINS_NETWORK_TO_ID(isTestnet)
  const contractAddress = contractMap[chainsNetworkToId[network]].CommunityRegistry
  let data = []
  const res = await axios.get(`${endPoint}/getNFTsForCollection?contractAddress=${contractAddress}&withMetadata=true`)
  const d = res.data
  data = data.concat(d.nfts)
  let nextToken = d.nextToken
  while (nextToken) {
    const res = await axios.get(`${endPoint}/getNFTsForCollection?contractAddress=${contractAddress}&withMetadata=true&&startToken=${nextToken}`)
    const d = res.data
    data = data.concat(d.nfts)
    nextToken = d.nextToken
  }
  return data
}

export const fetchAllCommunitiesOfAddress = async (address: string, network: string, apiKey: string, isTestnet: boolean = false) => {
  const endPoint = createEndPoint(network, apiKey)
  const contractMap = CONTRACT_MAP(isTestnet)
  const chainsNetworkToId = CHAINS_NETWORK_TO_ID(isTestnet)
  const contractAddress = contractMap[chainsNetworkToId[network]].CommunityRegistry
  let data = []
  const res = await axios.get(`${endPoint}/getNFTs?owner=${address}&contractAddresses[]=${contractAddress}&withMetadata=true&pageSize=100`)
  const d = res.data
  data = data.concat(d.ownedNfts)
  let pageKey = d.pageKey
  while (pageKey) {
    const res = await axios.get(`${endPoint}/getNFTs?owner=${address}&contractAddresses[]=${contractAddress}&withMetadata=true&pageKey=${pageKey}&pageSize=100`)
    const d = res.data
    data = data.concat(d.ownedNfts)
    pageKey = d.pageKey
  }
  return data
}

export const fetchAllMembersOfAddress = async (address: string, network: string, apiKey: string) => {
  const allCommunities = await fetchAllCommunities(network, apiKey, !!CHAINS_NETWORK_TO_ID(true)[network] )
  const allContractAddresses = allCommunities.map(v => v.metadata && v.metadata.registry)
  const endPoint = createEndPoint(network, apiKey)
  let data = []
  const res = await axios.get(`${endPoint}/getNFTs?owner=${address}&withMetadata=true&pageSize=100`)
  const d = res.data
  data = data.concat(d.ownedNfts.filter(v => allContractAddresses.includes(v.contract.address)))
  let pageKey = d.pageKey
  while (pageKey) {
    const res = await axios.get(`${endPoint}/getNFTs?owner=${address}&withMetadata=true&pageKey=${pageKey}&pageSize=100`)
    const d = res.data
    data = data.concat(d.ownedNfts.filter(v => allContractAddresses.includes(v.contract.address)))
    pageKey = d.pageKey
  }
  return data
}

export const fetchAllMembersOfCommunity = async (communityAddress: string, network: string, apiKey: string) => {
  const endPoint = createEndPoint(network, apiKey)
  let data = []
  const res = await axios.get(`${endPoint}/getNFTsForCollection?contractAddress=${communityAddress}&withMetadata=true`)
  const d = res.data
  data = data.concat(d.nfts)
  let nextToken = d.nextToken
  while (nextToken) {
    const res = await axios.get(`${endPoint}/getNFTsForCollection?contractAddress=${communityAddress}&withMetadata=true&&startToken=${nextToken}`)
    const d = res.data
    data = data.concat(d.nfts)
    nextToken = d.nextToken
  }
  return data
}

export const fetchProofOfHolding = async (proofAddresses: string[], address: string, network: string, apiKey: string) => {
  const contractAddresses = proofAddresses.map(v => v.toLowerCase())
  const endPoint = createEndPoint(network, apiKey)
  const contractAddressParam = contractAddresses.map(v => `contractAddresses[]=${v}`).join('&')
  const res = await axios.get(`${endPoint}/getNFTs?owner=${address}&${contractAddressParam}&pageSize=1`)
  const d = res.data.ownedNfts || []
  if (d.length === 0) {
    return
  }
  const contractAddress = d[0].contract.address
  const tokenId = d[0].id.tokenId
  return {
    holdingContract: contractAddress,
    holdingTokenId: tokenId
  }
}