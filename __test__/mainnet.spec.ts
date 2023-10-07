// import CommunitiesID, { CommunitiesIDInput } from "../src/index";
// require('dotenv').config()

// const OPTIONS: CommunitiesIDInput = {
//   Ethereum: {
//     RPCUrl: process.env.MAINNET_RPC_URL || '',
//     alchemyKey: process.env.MAINNET_ALCHEMY_KEY || '',
//   },
//   BSC: {
//     RPCUrl: process.env.BINANCE_RPC_URL || '',
//     alchemyKey: '',
//   },
//   arbitrum: {
//     RPCUrl: process.env.ARBITRUM_RPC_URL || ''
//   }
// }

// const ADDRESS = '0x374f09F365C624D508E6cE78654E0Ee9FCDFb783'

// const sdk = new CommunitiesID(OPTIONS)
// const { resolver, collector } = sdk


// test("should searchBrandDID works well", async () => {
//   const res = await collector.searchBrandDID('gm')
//   if (res) {
//     console.log(res.node)
//   }
// });

// test("should searchUserDID works well", async () => {
//   const res = await collector.searchUserDID('rain.gm')
//   if (res) {
//     console.log(res.node)
//   }
// });

// test("should resolveName works well", async () => {
//   const res = await resolver.resolveName('rain.gm')
//   console.log(res)
// });

// test("should resolveName with ens/sid works well", async () => {
//   const ensAddress = await resolver.resolveName('laruence.eth')
//   const bnbAddress = await resolver.resolveName('test.bnb')
//   const arbAddress = await resolver.resolveName('test.arb')
//   console.log(ensAddress, bnbAddress, arbAddress)
// });

// test("should lookupAddress works well", async () => {
//   const res = await resolver.lookupAddress(ADDRESS)
//   console.log(res)
// });

// test.only("should lookupAddress with ens works well", async () => {
//   const ensName = await resolver.lookupAddress('0xb389b8cAaEDCD0231780a30E5b6AEc6b6CEb970F')
//   const bnbName = await resolver.lookupAddress('0xB76FBF5A2b580896057880B9B99de4849cc11b67')
//   const arbName = await resolver.lookupAddress('0xB522E32b6B49363f420d2546E13479c05fF27201')
//   console.log(ensName, bnbName, arbName)
// });

// test("should getAllBrandDIDs works well", async () => {
//   const res: any[] = await collector.getAllBrandDIDs("Ethereum")
//   console.log(res.map(v => v.title))
// });

// test("should getAllBrandDIDsOwnedByAddress works well", async () => {
//   const res: any[] = await collector.getAllBrandDIDsOwnedByAddress(ADDRESS, 'Ethereum')
//   console.log(res.map(v => v.title))
// });

// test("should getAllUserDIDsOwnedByAddress works well", async () => {
//   const res: any[] = await collector.getAllUserDIDsOwnedByAddress(ADDRESS, 'Ethereum')
//   console.log(res.map(v => v.metadata && v.metadata.name))
// });

// test("should getAllUserDIDsOwnedByBrand works well", async () => {
//   const res: any[] = await collector.getAllUserDIDsOwnedByBrand('gm')
//   console.log(res.map(v => v.metadata && v.metadata.name))
// });

// test("should getAllUserDIDsOwnedByBrand with registry and chain works well", async () => {
//   const res: any[] = await collector.getAllUserDIDsOwnedByBrand('', '0x6bac3711576a895371ccf5b87c425de7606cf021', 'Ethereum')
//   console.log(res.map(v => v.metadata && v.metadata.name))
// });
