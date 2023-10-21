import BaseNodeValidator from '../abis/BaseNodeValidator.json'
import CommunityRegistry from '../abis/CommunityRegistry.json'
import CommunityRegistryInterface from '../abis/CommunityRegistryInterface.json'
import CommunityTokenURI from '../abis/CommunityTokenURI.json'
import CommunityTokenURIValidator from '../abis/CommunityTokenURIValidator.json'
import ERC20 from '../abis/erc20.json'
import RelayerCommunityRegistryInterface from '../abis/RelayerCommunityRegistryInterface.json'
import RelayerReplicaCommunityRegistryInterface from '../abis/RelayerReplicaCommunityRegistryInterface.json'
import MemberProtocolFee from '../abis/MemberProtocolFee.json'
import MemberRegistry from '../abis/MemberRegistry.json'
import MemberRegistryLegacy from '../abis/MemberRegistry-legacy.json'
import MemberRegistryInterface from '../abis/MemberRegistryInterface.json'
import MemberRegistryInterfaceLegacy from '../abis/MemberRegistryInterface-legacy.json'
import MemberRegistryInterfaceFactory from '../abis/MemberRegistryInterfaceFactory.json'
import MemberRouter from '../abis/MemberRouter.json'
import MemberTokenomics from '../abis/MemberTokenomics.json'
import MemberTokenURI from '../abis/MemberTokenURI.json'
import PrimaryRecord from '../abis/PrimaryRecord.json'
import SubNodeValidator from '../abis/SubNodeValidator.json'
import TextRecord from '../abis/TextRecord.json'
import { ChainIDs, TestnetChainIDs } from './types'

export const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
export const ONE_ADDRESS = "0x0000000000000000000000000000000000000001";

export const MAIN_CHAIN = isTestnet => isTestnet ? 'goerli' : 'mainnet'
export const MAIN_CHAIN_ID = isTestnet => isTestnet ? TestnetChainIDs.Goerli : ChainIDs.Ethereum

export const CHAINS_NETWORK_TO_ID = isTestnet => isTestnet ?{
  Goerli: TestnetChainIDs.Goerli,
  'Polygon Mumbai': TestnetChainIDs['Polygon Mumbai'],
  'Base Goerli Testnet': TestnetChainIDs['Base Goerli Testnet'],
  'Optimism Goerli Testnet': TestnetChainIDs['Optimism Goerli Testnet'],
  'BNB Smart Chain Testnet': TestnetChainIDs['BNB Smart Chain Testnet'],
  'Scroll Sepolia Testnet': TestnetChainIDs['Scroll Sepolia Testnet']
} : {
  Ethereum: ChainIDs.Ethereum,
  Polygon: ChainIDs.Polygon,
  Base: ChainIDs.Base,
  OP: ChainIDs.OP,
  BSC: ChainIDs.BSC,
}

const testnetIdToNetworkMap = {}
const mainnetIdToNetworkMap = {}

const testnetNetworkToIdMap = CHAINS_NETWORK_TO_ID(true)
const mainnetNetworkToIdMap = CHAINS_NETWORK_TO_ID(false)

for (let i in testnetNetworkToIdMap) {
  testnetIdToNetworkMap[testnetNetworkToIdMap[i]] = i
}

for (let i in mainnetNetworkToIdMap) {
  mainnetIdToNetworkMap[mainnetNetworkToIdMap[i]] = i
}

export const CHAINS_ID_TO_NETWORK = isTestnet => isTestnet ? testnetIdToNetworkMap : mainnetIdToNetworkMap 

const CONTRACT_ADDRESS_GOERLI = {
  BaseNodeValidator: '0x2AC9A5947C163fF76CC59Aa6053a7Fd295cA60F2',
  SubNodeValidator: '0x429360A35e2630E1602E56C5f1a860A5Ee360d2b',
  CommunityTokenURIValidator: '0x8F176d2649971F5d78C170782FaDa2230Ac4347D',
  CommunityTokenURI: '0x0739238B571FbBB32ed06e7f0Fa6895146C5B28B',
  CommunityRegistry: '0xbb3F40bF826b6eB27701c04A7493b2A55BDA29d1',
  MemberRouter: '0x72A8Ca0B973aFa03e080559f571B2Fe977F70606',
  MemberProtocolFee: '0x463090f36cC952948d60C690e4Aa4FC0c060579C',
  MemberRegistry: '0x91A023682715e29568BEbAe0E4A9A2B8A3a7E03e',
  MemberTokenomics: '0xad92F1c50C81464a484A64BB0785A41C1Cbf17c8',
  MemberTokenURI: '0xc10b7B0a8E0D1D7eEACa88A25F23112083D8BE5C',
  CommunityRegistryInterface: '0xd115a8Fe397F1ceFb8B0b9d66908990917045a70',
  RelayerReplicaCommunityRegistryInterface: '0x0000000000000000000000000000000000000000',
  RelayerCommunityRegistryInterface: '0xF9786c7B1d0d0825433a38B11F36282fB8F69AB5',
  MemberRegistryInterfaceFactory: '0x94df9636fCf5c5e0e70274d2050E7855d9205653',
  TextRecord: '0xB756Be760b45AF204b956C392137e6e7397a766d',
  PrimaryRecord: '0x5d2C41305e2827D6BccB195e532eAB86A460a9b5'
};

const CONTRACT_ADDRESS_MUMBAI = {
  BaseNodeValidator: '0x615C2FaccEEc0C1e10273e580A062BE50b03C2EA',
  SubNodeValidator: '0xd121ccF8DEc3798271D88B877CBe26B280676482',
  CommunityTokenURIValidator: '0x2AC9A5947C163fF76CC59Aa6053a7Fd295cA60F2',
  CommunityTokenURI: '0x8F176d2649971F5d78C170782FaDa2230Ac4347D',
  CommunityRegistry: '0x5a8a7655f7f024A6f167FB2a5891a63eC49e730f',
  MemberRouter: '0xbb3F40bF826b6eB27701c04A7493b2A55BDA29d1',
  MemberProtocolFee: '0x9a17d7b43Bb8b741C4663e6f8A0FE6eD48cD4900',
  MemberRegistry: '0x74aadD63dFF7244198BAF06A3F8c8c6906BaB008',
  MemberTokenomics: '0xF9A7282A8F82d0CE94BC25094a8c1e59a094056F',
  MemberTokenURI: '0xc5751123fcB55F04B21D01ACb3B2270F9c276772',
  CommunityRegistryInterface: '0xad92F1c50C81464a484A64BB0785A41C1Cbf17c8',
  RelayerReplicaCommunityRegistryInterface: '0xad92F1c50C81464a484A64BB0785A41C1Cbf17c8',
  RelayerCommunityRegistryInterface: '0x0000000000000000000000000000000000000000',
  MemberRegistryInterfaceFactory: '0x05CEeE56b1278fb59B75388D5b451331cb7743bC',
  TextRecord: '0x5125B8Ea2B783C9E9417A10511e791E6551ae26A',
  PrimaryRecord: '0xA8B36a6f1DC0d67D0367086709179A1f90d455D9'
};

const CONTRACT_ADDRESS_BASE_GOERLI = {
  BaseNodeValidator: '0x04215617861853a2B00a5003137901e0CEf5364c',
  SubNodeValidator: '0x3aB0B78B7a6A51602722730b5fCCDAeadAb7929f',
  CommunityTokenURIValidator: '0x98eFDdF61749125BA1fd6A5B2ff6bF2816987583',
  CommunityTokenURI: '0xfb249C3FFB28BfEd898751192a1AAD93268998f5',
  CommunityRegistry: '0x8D63E3796B5972b1878A83eeF90fb6d27aBF6191',
  MemberRouter: '0x88537F689fa5A33A17E25dBEe3622Dc6B959E188',
  MemberProtocolFee: '0x69c1759CC06587213B896d4Aac2470eaf2DBE453',
  MemberRegistry: '0x933a441d25975b29153233a92f3aff9FAF13E808',
  MemberTokenomics: '0x31964b6d3Bb64144d45f9e85C5e665F0468A57b3',
  MemberTokenURI: '0xdDfE9c93B11F66C442D4Ac9B1EcF645CF59D3480',
  CommunityRegistryInterface: '0x973F4e839E1C6Ff80c84005266a0FB6afB125ad1',
  RelayerReplicaCommunityRegistryInterface: '0x973F4e839E1C6Ff80c84005266a0FB6afB125ad1',
  RelayerCommunityRegistryInterface: '0x0000000000000000000000000000000000000000',
  MemberRegistryInterfaceFactory: '0x2e1314B03E4c7C21a4A86cc2998F8f5a226F236F',
  TextRecord: '0x3710fAB64f4c2BAb8fb14b758496551C6893E3e7',
  PrimaryRecord: '0xbc1D7AD62979A03e242b505cD4e15c84AE41Cfd6'
};

const CONTRACT_ADDRESS_OP_GOERLI = {
  BaseNodeValidator: '0x69c1759CC06587213B896d4Aac2470eaf2DBE453',
  SubNodeValidator: '0x3F591ce589bEAab3033EA9402431a7CbcA86E992',
  CommunityTokenURIValidator: '0x219D1BC97f3a7BBe1f7Fef245E1580DfdFeDC4C5',
  CommunityTokenURI: '0xdDfE9c93B11F66C442D4Ac9B1EcF645CF59D3480',
  CommunityRegistry: '0x973F4e839E1C6Ff80c84005266a0FB6afB125ad1',
  MemberRouter: '0x988b19761351BfF31Cfa5B63107E0574c13a0382',
  MemberProtocolFee: '0xdE930A113A090a1fAD6CE23178B554cEDf704cC5',
  MemberRegistry: '0xbf1EeBC5DA000adb2A40dd013d11304695156960',
  MemberTokenomics: '0x967decd4560f295F6DA40d934F496E0028D6286E',
  MemberTokenURI: '0xCdCA8D8B3b57632E1c5Ba947d66d21F81a124963',
  CommunityRegistryInterface: '0x14C2C54e4EA5BB10687C2B0ff95090bC853433E3',
  RelayerReplicaCommunityRegistryInterface: '0x14C2C54e4EA5BB10687C2B0ff95090bC853433E3',
  RelayerCommunityRegistryInterface: '0x0000000000000000000000000000000000000000',
  MemberRegistryInterfaceFactory: '0xB029Ea750e96288592258E33A37D4fBa8044804A',
  TextRecord: '0x0CB8e1780e507b86EFD591E5b6874f5A66bed875',
  PrimaryRecord: '0xaa13C3bAAb922e906753c37A96D98F14e4F8a1aB'
};

const CONTRACT_ADDRESS_BSC_TESTNET = {
  BaseNodeValidator: '0x98eFDdF61749125BA1fd6A5B2ff6bF2816987583',
  SubNodeValidator: '0x16dd8Bd899C4ace6638d31C91235877A6bDb513a',
  CommunityTokenURIValidator: '0xfb249C3FFB28BfEd898751192a1AAD93268998f5',
  CommunityTokenURI: '0xE74C9F7e4682D4c986B873Dc0AE5dd934900f63a',
  CommunityRegistry: '0x88537F689fa5A33A17E25dBEe3622Dc6B959E188',
  MemberRouter: '0x3F591ce589bEAab3033EA9402431a7CbcA86E992',
  MemberProtocolFee: '0x219D1BC97f3a7BBe1f7Fef245E1580DfdFeDC4C5',
  MemberRegistry: '0xd7638A3259676D5d9C2c90F39E1176A3186bb269',
  MemberTokenomics: '0x973F4e839E1C6Ff80c84005266a0FB6afB125ad1',
  MemberTokenURI: '0x62998330B44337230833e148767e4450880C67D6',
  CommunityRegistryInterface: '0x988b19761351BfF31Cfa5B63107E0574c13a0382',
  RelayerReplicaCommunityRegistryInterface: '0x988b19761351BfF31Cfa5B63107E0574c13a0382',
  RelayerCommunityRegistryInterface: '0x0000000000000000000000000000000000000000',
  MemberRegistryInterfaceFactory: '0x61F491E4f237A78476eF622d2F3F10780F162F7C',
  TextRecord: '0x967decd4560f295F6DA40d934F496E0028D6286E',
  PrimaryRecord: '0xCdCA8D8B3b57632E1c5Ba947d66d21F81a124963'
}

const CONTRACT_ADDRESS_SCROLL_TESTNET = {
  BaseNodeValidator: '0x04215617861853a2B00a5003137901e0CEf5364c',
  SubNodeValidator: '0x3aB0B78B7a6A51602722730b5fCCDAeadAb7929f',
  CommunityTokenURIValidator: '0x98eFDdF61749125BA1fd6A5B2ff6bF2816987583',
  CommunityTokenURI: '0xfb249C3FFB28BfEd898751192a1AAD93268998f5',
  CommunityRegistry: '0x8D63E3796B5972b1878A83eeF90fb6d27aBF6191',
  MemberRouter: '0x88537F689fa5A33A17E25dBEe3622Dc6B959E188',
  MemberProtocolFee: '0x69c1759CC06587213B896d4Aac2470eaf2DBE453',
  MemberRegistry: '0x219D1BC97f3a7BBe1f7Fef245E1580DfdFeDC4C5',
  MemberTokenomics: '0x31964b6d3Bb64144d45f9e85C5e665F0468A57b3',
  MemberTokenURI: '0xdDfE9c93B11F66C442D4Ac9B1EcF645CF59D3480',
  CommunityRegistryInterface: '0x973F4e839E1C6Ff80c84005266a0FB6afB125ad1',
  RelayerReplicaCommunityRegistryInterface: '0x973F4e839E1C6Ff80c84005266a0FB6afB125ad1',
  RelayerCommunityRegistryInterface: '0x0000000000000000000000000000000000000000',
  MemberRegistryInterfaceFactory: '0xdE930A113A090a1fAD6CE23178B554cEDf704cC5',
  TextRecord: '0x3710fAB64f4c2BAb8fb14b758496551C6893E3e7',
  PrimaryRecord: '0xbc1D7AD62979A03e242b505cD4e15c84AE41Cfd6',
}

const CONTRACT_ADDRESS_MAINNET = {
  BaseNodeValidator: '0xf67e3121EBf047480B8D1dd7E721bb98a4FAA314',
  SubNodeValidator: '0x21CfDA4781FdCA2925015e8346De554462e7e974',
  CommunityTokenURIValidator: '0x81Ab8DF4599B9C0b29b52Fd8FCfAe820c9b607A0',
  CommunityTokenURI: '0xfaeB43ce36c85f386E18CfFb321D49E258E019a7',
  CommunityRegistry: '0x497a1D143fd391815334Cdea0B676C960a1d202d',
  MemberRouter: '0x3388e50bEC21EB033927172a69bE46AD5d557eB4',
  MemberProtocolFee: '0x5AE34a6325c65F6fFd9352bA9CeB3e050BEc968F',
  MemberRegistry: '0x0E53B8aD767cbBfF801B1b2219E2a33852f41476',
  MemberTokenomics: '0xC9B4597b3D5fa8fBFce306f6B1a961F88AD8593b',
  MemberTokenURI: '0x49240B15bf8f0D7914F2D27A596d7e986AfE134b',
  CommunityRegistryInterface: '0x396FF835f5152CF263c96Ec5889dB34c2BEFbD9f',
  RelayerReplicaCommunityRegistryInterface: '0x0000000000000000000000000000000000000000',
  RelayerCommunityRegistryInterface: '0xc4b3Ea419272fe7cB53D19b535b1C3A95b64A369',
  MemberRegistryInterfaceFactory: '0x970C77787e300443C8cf7322096ebDDE9d1777C7',
  TextRecord: '0x959c31db2c5605425C5A49C1c3eee84038e62B61',
  PrimaryRecord: '0x4FD72382aa278251537AAadEc402FF1231b4A99A',
}

const CONTRACT_ADDRESS_POLYGON = {
  BaseNodeValidator: '0xfF795E4B82c97e41e1eFA40239fE1A13763542CD',
  SubNodeValidator: '0x713cE7659C61E36f3Cd3CC146BAB8412bEB2e1D6',
  CommunityTokenURIValidator: '0x035bFdd94Bf49505fC74d2e7d52cF94732103c99',
  CommunityTokenURI: '0x822Caeb805AffCce3D399BD08Abe1B2E35dcB06b',
  CommunityRegistry: '0x2bc0d6915f02593d5c7387156997dda10566dC9a',
  MemberRouter: '0x640216Ea5b2aC018b1d1FDB3F0a206F652C92574',
  MemberProtocolFee: '0x2154E691091C650Aa2788BF43a878b7df932b0bD',
  MemberRegistry: '0x3388e50bEC21EB033927172a69bE46AD5d557eB4',
  MemberTokenomics: '0x213cba02742735d1D0F9D692b1E694644f29c87C',
  MemberTokenURI: '0xfEB14303afeDAAFf9af63E37ae51d86F19010169',
  CommunityRegistryInterface: '0x9B709180dEb3393fE3201cDDA3Ba5556e133DaA1',
  RelayerReplicaCommunityRegistryInterface: '0x9B709180dEb3393fE3201cDDA3Ba5556e133DaA1',
  RelayerCommunityRegistryInterface: '0x0000000000000000000000000000000000000000',
  MemberRegistryInterfaceFactory: '0x9d814367F1E488Ca5327c63835331aB37189b3B9',
  TextRecord: '0xd825A94EAcA80e3e2cBf44C2AdD2202031086b04',
  PrimaryRecord: '0xa05D09C56AFc651cEB2a1D5C9aD3bcbe2C4185A4'
}

const CONTRACT_ADDRESS_BASE = {
  BaseNodeValidator: '0x713cE7659C61E36f3Cd3CC146BAB8412bEB2e1D6',
  SubNodeValidator: '0x035bFdd94Bf49505fC74d2e7d52cF94732103c99',
  CommunityTokenURIValidator: '0xE78DB33F8278CEA9f197689BB2863c3c05fEe522',
  CommunityTokenURI: '0x2bc0d6915f02593d5c7387156997dda10566dC9a',
  CommunityRegistry: '0x67046D3E6bfCb6E6d46DFd4D038260214245D771',
  MemberRouter: '0x2154E691091C650Aa2788BF43a878b7df932b0bD',
  MemberProtocolFee: '0x482FBacDF04060Ca97Ed25a7f69971F860AC4F2D',
  MemberRegistry: '0x00f9fFc7388356FD76f214d952ce482784354a7e',
  MemberTokenomics: '0x1684E74EDA3e23e1D450B25BE82A49BD8B3401a1',
  MemberTokenURI: '0xfBFB4E60A5a6f08790715d1435bd4F392b2f04f7',
  CommunityRegistryInterface: '0x349C8aD4f5555aA9E4BCE37b2379266762882D4B',
  RelayerReplicaCommunityRegistryInterface: '0x349C8aD4f5555aA9E4BCE37b2379266762882D4B',
  RelayerCommunityRegistryInterface: '0x0000000000000000000000000000000000000000',
  MemberRegistryInterfaceFactory: '0x8C1924b5b53a32f8067C83245cAbEE88476Cc15c',
  TextRecord: '0x950DA0957a0128Abe2Ec445Afea1C57f8B135d10',
  PrimaryRecord: '0xf43EF51EeBd1885165BF5D3Bfb2CEe88FE2dD589'
}

const CONTRACT_ADDRESS_OP = {
  BaseNodeValidator: '0xfF795E4B82c97e41e1eFA40239fE1A13763542CD',
  SubNodeValidator: '0x713cE7659C61E36f3Cd3CC146BAB8412bEB2e1D6',
  CommunityTokenURIValidator: '0x035bFdd94Bf49505fC74d2e7d52cF94732103c99',
  CommunityTokenURI: '0x822Caeb805AffCce3D399BD08Abe1B2E35dcB06b',
  CommunityRegistry: '0x2bc0d6915f02593d5c7387156997dda10566dC9a',
  MemberRouter: '0x640216Ea5b2aC018b1d1FDB3F0a206F652C92574',
  MemberProtocolFee: '0x2154E691091C650Aa2788BF43a878b7df932b0bD',
  MemberRegistry: '0x00f9fFc7388356FD76f214d952ce482784354a7e',
  MemberTokenomics: '0x4C35E2d49592992Bbf64334A7F632ACC454A2582',
  MemberTokenURI: '0xfBFB4E60A5a6f08790715d1435bd4F392b2f04f7',
  CommunityRegistryInterface: '0x349C8aD4f5555aA9E4BCE37b2379266762882D4B',
  RelayerReplicaCommunityRegistryInterface: '0x349C8aD4f5555aA9E4BCE37b2379266762882D4B',
  RelayerCommunityRegistryInterface: '0x0000000000000000000000000000000000000000',
  MemberRegistryInterfaceFactory: '0x8C1924b5b53a32f8067C83245cAbEE88476Cc15c',
  TextRecord: '0x950DA0957a0128Abe2Ec445Afea1C57f8B135d10',
  PrimaryRecord: '0xf43EF51EeBd1885165BF5D3Bfb2CEe88FE2dD589'
}

const CONTRACT_ADDRESS_BSC = {
  BaseNodeValidator: '0xfF795E4B82c97e41e1eFA40239fE1A13763542CD',
  SubNodeValidator: '0x713cE7659C61E36f3Cd3CC146BAB8412bEB2e1D6',
  CommunityTokenURIValidator: '0x035bFdd94Bf49505fC74d2e7d52cF94732103c99',
  CommunityTokenURI: '0x822Caeb805AffCce3D399BD08Abe1B2E35dcB06b',
  CommunityRegistry: '0x2bc0d6915f02593d5c7387156997dda10566dC9a',
  MemberRouter: '0x640216Ea5b2aC018b1d1FDB3F0a206F652C92574',
  MemberProtocolFee: '0x2154E691091C650Aa2788BF43a878b7df932b0bD',
  MemberRegistry: '0x332B55f1dbE8DFE0b04457Fe56042De333d32088',
  MemberTokenomics: '0x4C35E2d49592992Bbf64334A7F632ACC454A2582',
  MemberTokenURI: '0x1684E74EDA3e23e1D450B25BE82A49BD8B3401a1',
  CommunityRegistryInterface: '0xfBFB4E60A5a6f08790715d1435bd4F392b2f04f7',
  RelayerReplicaCommunityRegistryInterface: '0xfBFB4E60A5a6f08790715d1435bd4F392b2f04f7',
  RelayerCommunityRegistryInterface: '0x0000000000000000000000000000000000000000',
  MemberRegistryInterfaceFactory: '0x21CfDA4781FdCA2925015e8346De554462e7e974',
  TextRecord: '0x950DA0957a0128Abe2Ec445Afea1C57f8B135d10',
  PrimaryRecord: '0xf43EF51EeBd1885165BF5D3Bfb2CEe88FE2dD589'
}

export const CONTRACT_MAP = isTestnet => isTestnet ? {
  [TestnetChainIDs.Goerli]: CONTRACT_ADDRESS_GOERLI,
  [TestnetChainIDs['Polygon Mumbai']]: CONTRACT_ADDRESS_MUMBAI,
  [TestnetChainIDs['Base Goerli Testnet']]: CONTRACT_ADDRESS_BASE_GOERLI,
  [TestnetChainIDs['Optimism Goerli Testnet']]: CONTRACT_ADDRESS_OP_GOERLI,
  [TestnetChainIDs['BNB Smart Chain Testnet']]: CONTRACT_ADDRESS_BSC_TESTNET,
  [TestnetChainIDs['Scroll Sepolia Testnet']]: CONTRACT_ADDRESS_SCROLL_TESTNET
} : {
  [ChainIDs.Ethereum]: CONTRACT_ADDRESS_MAINNET,
  [ChainIDs.Polygon]: CONTRACT_ADDRESS_POLYGON,
  [ChainIDs.Base]: CONTRACT_ADDRESS_BASE,
  [ChainIDs.OP]: CONTRACT_ADDRESS_OP,
  [ChainIDs.BSC]: CONTRACT_ADDRESS_BSC,
}

export const ABIs = {
  BaseNodeValidator,
  CommunityRegistry,
  CommunityRegistryInterface,
  CommunityTokenURI,
  CommunityTokenURIValidator,
  ERC20,
  RelayerCommunityRegistryInterface,
  RelayerReplicaCommunityRegistryInterface,
  MemberProtocolFee,
  MemberRegistry,
  MemberRegistryLegacy,
  MemberRegistryInterface,
  MemberRegistryInterfaceLegacy,
  MemberRegistryInterfaceFactory,
  MemberRouter,
  MemberTokenomics,
  MemberTokenURI,
  PrimaryRecord,
  SubNodeValidator,
  TextRecord,
}

export const ERROR_MAP: any = {
  '0xcfb3b942': 'ApprovalCallerNotOwnerNorApproved',
  '0x04abfdf5': 'ErrUnreachableCode',
  '0x11845c21': 'ErrForbidden',
  '0xcca1fbcd': 'ErrOnlySignatureMint',
  '0x59c896be': 'TransferCallerNotOwnerNorApproved',
  '0x0df85d3f': 'ErrInvalidNode',
  '0x8aea548b': 'ErrInvalidBalance',
  '0x8f4eb604': 'BalanceQueryForZeroAddress',
  '0x00d58153': 'OwnershipNotInitializedForExtraData',
  '0xeb18674f': 'ErrThresholdLimited',
  '0x3a37a418': 'ErrInvalidAttribute',
  '0x6740ff0a': 'ErrKeyIsNotAllowed',
  '0xcc12cef6': 'ErrUnauthorized',
  '0x4041c54e': 'ErrInvalidArguments',
  '0xdf2d9b42': 'OwnerQueryForNonexistentToken',
  '0xd1a57ed6': 'TransferToNonERC721ReceiverImplementer',
  '0x80ea1cc7': 'ErrPriceModelImmutable',
  '0xea553b34': 'TransferToZeroAddress',
  '0xa14c4b50': 'URIQueryForNonexistentToken',
  '0x3ff0f4f4': 'ErrSignatureDeadlineExceed',
  '0xcf4700e4': 'ApprovalQueryForNonexistentToken',
  '0xdc3bc1f3': 'ErrInvalidBaseNode',
  '0xda543657': 'ErrUnexpectedNodeState',
  '0x3db1f9af': 'MintERC2309QuantityExceedsLimit',
  '0x2e076300': 'MintToZeroAddress',
  '0x34afade1': 'ErrRegistryIsActive',
  '0xe3e9d239': 'ErrSignatureMintDisabled',
  '0xe7f0eab5': 'ErrWrongOmniNodeState',
  '0x4eebc1aa': 'ErrOnlyOwner',
  '0xedf82445': 'ErrInvalidSwapValue',
  '0x4842276b': 'ErrInvalidaNode',
  '0x007afbbb': 'ErrUnknownPriceModelMode',
  '0x8a23d533': 'ErrInvalidBalance',
  '0x98c96854': 'ErrInvalidSignature',
  '0x21fdc356': 'ErrNotPermitted',
  '0x6e5731bc': 'ErrHoldingMintDisabled',
  '0xc1968ea5': 'ErrPublicMintDisabled',
  '0xb562e8dd': 'MintZeroQuantity',
  '0xa1148100': 'TransferFromIncorrectOwner',
  '0xe59b1069': 'ErrOmniNodeIsBeingProtected',
  '0xdeec5d41': 'ErrInvalidHoldingProof',
  '0x68b3ecb6': 'ErrNotImplemented',
}

export const MemberRegistryInterfaceUpgradeTime = 1697874330