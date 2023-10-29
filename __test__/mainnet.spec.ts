import { ethers } from "ethers";
import CommunitiesID, { CommunitiesIDInput } from "../src/index";
require('dotenv').config()

const OPTIONS: CommunitiesIDInput = {
  isTestnet: false,
  openseaKey: process.env.OPENSEA_KEY || '',
  chainbaseKey: process.env.CHAINBASE_KEY || '',
  Ethereum: {
    RPCUrl: process.env.RPC_URL || ''
  },
  Polygon: {
    RPCUrl: ''
  },
  Base: {
    RPCUrl: ''
  },
  OP: {
    RPCUrl: ''
  },
  BSC: {
    RPCUrl: process.env.RPC_URL || ''
  },
  Scroll: {
    RPCUrl: ''
  },
  arbitrum: {
    RPCUrl: process.env.RPC_URL || ''
  },
}


const sdk = new CommunitiesID(OPTIONS)
const { resolver, collector, operator } = sdk
const ADDRESS = '0xca07bD081A9cc15b45D3Fe2BbE7762B923Ca4B29'

test("should searchBrandDID works well", async () => {
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

test.only("should getAllBrandDIDs works well", async () => {
  const res: any[] = await collector.getAllBrandDIDs(137)
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