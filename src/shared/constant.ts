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
import MemberRegistryInterface from '../abis/MemberRegistryInterface.json'
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
  'Base Goerli Testnet': TestnetChainIDs['Base Goerli Testnet']
} : {
  Ethereum: ChainIDs.Ethereum
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
  MemberRegistry: '0xc5751123fcB55F04B21D01ACb3B2270F9c276772',
  MemberTokenomics: '0xad92F1c50C81464a484A64BB0785A41C1Cbf17c8',
  MemberTokenURI: '0xc10b7B0a8E0D1D7eEACa88A25F23112083D8BE5C',
  CommunityRegistryInterface: '0xd115a8Fe397F1ceFb8B0b9d66908990917045a70',
  RelayerCommunityRegistryInterface: '0xF9786c7B1d0d0825433a38B11F36282fB8F69AB5',
  MemberRegistryInterfaceFactory: '0x6119f579E747BD34F55CBAdeC612C7d349A51F80',
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
  MemberRegistry: '0x463090f36cC952948d60C690e4Aa4FC0c060579C',
  MemberTokenomics: '0xF9A7282A8F82d0CE94BC25094a8c1e59a094056F',
  MemberTokenURI: '0xc5751123fcB55F04B21D01ACb3B2270F9c276772',
  CommunityRegistryInterface: '0xad92F1c50C81464a484A64BB0785A41C1Cbf17c8',
  RelayerCommunityRegistryInterface: ZERO_ADDRESS,
  MemberRegistryInterfaceFactory: '0xF9786c7B1d0d0825433a38B11F36282fB8F69AB5',
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
  MemberRegistry: '0x219D1BC97f3a7BBe1f7Fef245E1580DfdFeDC4C5',
  MemberTokenomics: '0x31964b6d3Bb64144d45f9e85C5e665F0468A57b3',
  MemberTokenURI: '0xdDfE9c93B11F66C442D4Ac9B1EcF645CF59D3480',
  CommunityRegistryInterface: '0x973F4e839E1C6Ff80c84005266a0FB6afB125ad1',
  RelayerCommunityRegistryInterface: ZERO_ADDRESS,
  MemberRegistryInterfaceFactory: '0xdE930A113A090a1fAD6CE23178B554cEDf704cC5',
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
  MemberRegistry: '0xbc1D7AD62979A03e242b505cD4e15c84AE41Cfd6',
  MemberTokenomics: '0x967decd4560f295F6DA40d934F496E0028D6286E',
  MemberTokenURI: '0xCdCA8D8B3b57632E1c5Ba947d66d21F81a124963',
  CommunityRegistryInterface: '0x14C2C54e4EA5BB10687C2B0ff95090bC853433E3',
  RelayerCommunityRegistryInterface: '0x0000000000000000000000000000000000000000',
  MemberRegistryInterfaceFactory: '0xF1DF1b62e51b11C2Fe6c84fD9A1B350d68E8f1b7',
  TextRecord: '0x0CB8e1780e507b86EFD591E5b6874f5A66bed875',
  PrimaryRecord: '0xaa13C3bAAb922e906753c37A96D98F14e4F8a1aB'
}

const CONTRACT_ADDRESS_MAINNET = {
  BaseNodeValidator: '0x20b1714B4a378534e9cAFA199Fe8134d5DC8fAF1',
  SubNodeValidator: '0xd75652233327e7399B65A88F4812846c29964404',
  CommunityTokenURIValidator: '0x604860152261700c23171528fED4A032382E8893',
  CommunityTokenURI: '0xC29c941d3Eea73C1e17859fFF9E164DB645713C6',
  CommunityRegistry: '0x8f4eC0e46A9b3e4Ddfe12f8b0A6c1F095D20B76f',
  MemberRouter: '0x674bFAEaAe434063Ee5B90117953Ab8E9cb9e5F1',
  MemberProtocolFee: '0xB9389ad43fb43a13cDd70d6d28E486fe0bC38383',
  MemberRegistry: '0xA024CF083A373eeAF052D222476FF6030993e081',
  MemberTokenomics: '0x3FD166a6F7d857E7a749BF721E8Fbb26644EF767',
  MemberTokenURI: '0xE52191331Ef603c6964A7Ad53722cf1b9Fa2F211',
  CommunityRegistryInterface: '0xaC77FA6E0810385BbD4be8C72ebbc96F6C36daD8',
  RelayerCommunityRegistryInterface: '0x0000000000000000000000000000000000000000',
  MemberRegistryInterfaceFactory: '0x963322A9BDF848D9a495a3186D4b95008FF72816',
  TextRecord: '0xcEc6dc6bD56dd2aC5A1eebda92087Ac96a09260E',
  PrimaryRecord: '0xd926AcDC0bcC76232aEB4f3A07cFEE768F1afb57'
};

export const CONTRACT_MAP = isTestnet => isTestnet ? {
  [TestnetChainIDs.Goerli]: CONTRACT_ADDRESS_GOERLI,
  [TestnetChainIDs['Polygon Mumbai']]: CONTRACT_ADDRESS_MUMBAI,
  [TestnetChainIDs['Base Goerli Testnet']]: CONTRACT_ADDRESS_BASE_GOERLI,
  [TestnetChainIDs['Optimism Goerli Testnet']]: CONTRACT_ADDRESS_OP_GOERLI
} : {
  [ChainIDs.Ethereum]: CONTRACT_ADDRESS_MAINNET
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
  MemberRegistryInterface,
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