import { ethers } from "ethers";
import CommunitiesID, { CONTRACT_MAP, CommunitiesIDInput } from "../src/index";
require('dotenv').config()

const OPTIONS: CommunitiesIDInput = {
  isTestnet: true,
  openseaKey: process.env.OPENSEA_KEY || '',
  Goerli: {
    RPCUrl: process.env.GOERLI_RPC_URL || '',
  },
  'Polygon Mumbai': {
    RPCUrl: process.env.MUMBAI_RPC_URL || '',
  },
  'Base Goerli Testnet': {
    RPCUrl: process.env.BASE_GOERLI_RPC_URL || '',
  },
  'Optimism Goerli Testnet': {
    RPCUrl: process.env.OP_RPC_URL || '',
  },
  'BNB Smart Chain Testnet': {
    RPCUrl: process.env.BSC_RPC_URL || '',
  },
  'Scroll Sepolia Testnet': {
    RPCUrl: process.env.SCROLL_SEPOLIA_RPC_URL || ''
  }
}

const WRITEABLE_OPTIONS: CommunitiesIDInput = {
  isTestnet: true,
  openseaKey: process.env.OPENSEA_KEY || '',
  Goerli: {
    RPCUrl: process.env.GOERLI_RPC_URL || '',
    generateSigner: provider => new ethers.Wallet(process.env.PRIVATE_KEY || '', provider)
  },
  'Polygon Mumbai': {
    RPCUrl: process.env.MUMBAI_RPC_URL || '',
    generateSigner: provider => new ethers.Wallet(process.env.PRIVATE_KEY || '', provider)
  },
  'Base Goerli Testnet': {
    RPCUrl: process.env.BASE_RPC_URL || '',
    generateSigner: provider => new ethers.Wallet(process.env.PRIVATE_KEY || '', provider)
  },
  'Optimism Goerli Testnet': {
    RPCUrl: process.env.OP_RPC_URL || '',
    generateSigner: provider => new ethers.Wallet(process.env.PRIVATE_KEY || '', provider)
  },
  'BNB Smart Chain Testnet': {
    RPCUrl: process.env.BSC_RPC_URL || '',
    generateSigner: provider => new ethers.Wallet(process.env.PRIVATE_KEY || '', provider)
  },
  'Scroll Sepolia Testnet': {
    RPCUrl: process.env.SCROLL_SEPOLIA_RPC_URL || '',
    generateSigner: provider => new ethers.Wallet(process.env.PRIVATE_KEY || '', provider)
  }
}

const sdk = new CommunitiesID(OPTIONS)
// const sdk = new CommunitiesID(WRITEABLE_OPTIONS)
const { resolver, collector, operator } = sdk
const ADDRESS = '0xca07bD081A9cc15b45D3Fe2BbE7762B923Ca4B29'

test("should searchBrandDID works well", async () => {
  const res = await collector.searchBrandDID('jtest1')
  console.log(res)
});

test("should searchBrandDIDByTokenId works well", async () => {
  const res = await collector.searchBrandDIDByTokenId(7, 84531)
  console.log(res)
});

test("should searchUserDID works well", async () => {
  const res = await collector.searchUserDID('a.jtest7')
  console.log(res)
});

test("should searchUserDIDByTokenId works well", async () => {
  const res = await collector.searchUserDIDByTokenId('0x8898e5e65bd4d3f117e1ba9f899780a7c51c7d57', 1, 5)
  console.log(res)
});

test("should searchUserDID with brandDID works well", async () => {
  const brandDID = await collector.searchBrandDID('did')
  if (!brandDID) {
    return
  }
  const res = await collector.searchUserDID('a.did', brandDID)
  console.log(res)
});

test("should resolveName works well", async () => {
  const res = await resolver.resolveName('a.did')
  console.log(res)
});

test("should lookupAddress works well", async () => {
  const res = await resolver.lookupAddress(ADDRESS)
  console.log(res)
});

test("should getAllBrandDIDs works well", async () => {
  const res: any[] = await collector.getAllBrandDIDs(5)
  console.log(res.map(v => v.name))
});

test("should getAllBrandDIDsOwnedByAddress works well", async () => {
  const res: any[] = await collector.getAllBrandDIDsOwnedByAddress(ADDRESS, 5)
  console.log(res.map(v => v.name))
});

test("should getAllUserDIDsOwnedByAddress works well", async () => {
  const res: any[] = await collector.getAllUserDIDsOwnedByAddress(ADDRESS, 5)
  console.log(res.map(v => v.name))
});

test("should getAllBrandDIDsJoinedByAddress works well", async () => {
  const res: any[] = await collector.getAllBrandDIDsJoinedByAddress(ADDRESS, 5)
  console.log(res)
});

test("should getAllUserDIDsOwnedByBrand works well", async () => {
  const res: any[] = await collector.getAllUserDIDsOwnedByBrand('jtest2')
  console.log(res.map(v => v.name))
});

test("should getAllUserDIDsOwnedByBrand with registry and chain works well", async () => {
  const res: any[] = await collector.getAllUserDIDsOwnedByBrand('', '0x6c3c46ccd0382653346fdd9912e9764876718060', 5)
  console.log(res.map(v => v.name))
});

test("should getAllUserDIDsOfOneWalletInOneBrand with name works well", async () => {
  const res: any[] = await collector.getAllUserDIDsOfOneWalletInOneBrand('0xca07bD081A9cc15b45D3Fe2BbE7762B923Ca4B29', 'jtest1')
  console.log(res.map(v => v.name))
});

test("should getAllUserDIDsOfOneWalletInOneBrand with registry and chain works well", async () => {
  const res: any[] = await collector.getAllUserDIDsOfOneWalletInOneBrand('0xca07bD081A9cc15b45D3Fe2BbE7762B923Ca4B29', '', '0x724123c1D1a65928E9831795A97bD94b2015742c', 5)
  console.log(res.map(v => v.name))
});

test('should getMintUserDIDPrice works well', async() => {
  const res = await operator.getMintUserDIDPrice('a.goerlitest1')
  console.log(res)
})

test('should mintUserDID works well', async() => {
  try {
    const res = await operator.mintUserDID('b.jtest3', ADDRESS, {
      onTransactionCreated: tx => console.log(tx)
    })
    return res
  } catch(e) {
    console.log(e)
  }
})

test('should renewUserDID works well', async() => {
  try {
    const res = await operator.renewUserDID('c.did', {
      onTransactionCreated: tx => console.log(tx)
    })
    return res
  } catch(e) {
    console.log(e.message)
  }
})


test('should setAsPrimary works well', async() => {
  try {
    const res = await operator.setAsPrimary('c.did', {
      onTransactionCreated: tx => console.log(tx)
    })
    return res
  } catch(e) {
    console.log(e)
  }
})