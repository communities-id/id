import { ethers } from "ethers";
import CommunitiesID, { CommunitiesIDInput } from "../src/index";
require('dotenv').config()

const OPTIONS: CommunitiesIDInput = {
  isTestnet: true,
  Goerli: {
    RPCUrl: process.env.GOERLI_RPC_URL || '',
    alchemyKey: process.env.GOERLI_ALCHEMY_KEY || '',
  },
  'Polygon Mumbai': {
    RPCUrl: process.env.MUMBAI_RPC_URL || '',
    alchemyKey: process.env.MUMBAI_ALCHEMY_KEY || '',
  },
  'Base Goerli Testnet': {
    RPCUrl: process.env.BASE_RPC_URL || '',
    alchemyKey: process.env.BASE_ALCHEMY_KEY || '',
  },
  'Optimism Goerli Testnet': {
    RPCUrl: process.env.OP_RPC_URL || '',
    alchemyKey: process.env.OP_ALCHEMY_KEY || '',
  }
}

// const WRITEABLE_OPTIONS: CommunitiesIDInput = {
//   isTestnet: true,
//   Goerli: {
//     RPCUrl: process.env.GOERLI_RPC_URL || '',
//     alchemyKey: process.env.GOERLI_ALCHEMY_KEY || '',
//     generateSigner: provider => new ethers.Wallet(process.env.PRIVATE_KEY || '', provider)
//   },
//   'Polygon Mumbai': {
//     RPCUrl: process.env.MUMBAI_RPC_URL || '',
//     alchemyKey: process.env.MUMBAI_ALCHEMY_KEY || '',
//     generateSigner: provider => new ethers.Wallet(process.env.PRIVATE_KEY || '', provider)
//   }
// }

const sdk = new CommunitiesID(OPTIONS)
// const sdk = new CommunitiesIDResolver(WRITEABLE_OPTIONS)
const { resolver, collector, operator } = sdk
const ADDRESS = '0x78DC4D67310d7963754799393510b9940F99230f'

test.only("should searchBrandDID works well", async () => {
  const res = await collector.searchBrandDID('jtest1')
  console.log(res)
});

test("should searchUserDID works well", async () => {
  const res = await collector.searchUserDID('a.did')
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
  const res: any[] = await collector.getAllBrandDIDs("Goerli")
  console.log(res.map(v => v.title))
});

test("should getAllBrandDIDsOwnedByAddress works well", async () => {
  const res: any[] = await collector.getAllBrandDIDsOwnedByAddress(ADDRESS, 'Goerli')
  console.log(res.map(v => v.title))
});

test("should getAllUserDIDsOwnedByAddress works well", async () => {
  const res: any[] = await collector.getAllUserDIDsOwnedByAddress(ADDRESS, 'Goerli')
  console.log(res.map(v => v.metadata && v.metadata.name))
});

test("should getAllUserDIDsOwnedByBrand works well", async () => {
  const res: any[] = await collector.getAllUserDIDsOwnedByBrand('did')
  console.log(res.map(v => v.metadata && v.metadata.name))
});

test("should getAllUserDIDsOwnedByBrand with registry and chain works well", async () => {
  const res: any[] = await collector.getAllUserDIDsOwnedByBrand('', '0x5824C18c5f36A898b93F458BA5345fD25d039076', 'Goerli')
  console.log(res.map(v => v.metadata && v.metadata.name))
});

test('should getMintUserDIDPrice works well', async() => {
  const res = await operator.getMintUserDIDPrice('a.goerlitest1')
  console.log(res)
})

test('should mintUserDID works well', async() => {
  try {
    const res = await operator.mintUserDID('c.did', ADDRESS, {
      onTransactionCreated: tx => console.log(tx)
    })
    return res
  } catch(e) {
    console.log(e.message)
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