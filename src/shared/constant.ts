import BaseNodeValidator from '../abis/BaseNodeValidator.json'
import CommunityRegistry from '../abis/CommunityRegistry.json'
import CommunityRegistryInterface from '../abis/CommunityRegistryInterface.json'
import CommunityTokenURI from '../abis/CommunityTokenURI.json'
import CommunityTokenURIValidator from '../abis/CommunityTokenURIValidator.json'
import ERC20 from '../abis/erc20.json'
import LZCommunityRegistryInterface from '../abis/LZCommunityRegistryInterface.json'
import LZReplicaCommunityRegistryInterface from '../abis/LZReplicaCommunityRegistryInterface.json'
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

export const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
export const ONE_ADDRESS = "0x0000000000000000000000000000000000000001";

export const MAIN_CHAIN = isTestnet => isTestnet ? 'goerli' : 'mainnet'
export const MAIN_CHAIN_ID = isTestnet => isTestnet ? 10121 : 101

export const CHAINS_NETWORK_TO_ID = isTestnet => isTestnet ?{
  goerli: 10121,
  mumbai: 10109
} : {
  mainnet: 101
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
  BaseNodeValidator: '0x20f08F8d0F504075c5b640e165a56F17E5d67d3F',
  SubNodeValidator: '0x6A98638de3375fa3403dB438Be74CBad4C7C947c',
  CommunityTokenURIValidator: '0xa680E720dDaf0Eb9E2Bf7aFAd0433F2697d21DF8',
  CommunityTokenURI: '0x08908A51a589d17e0384FA00d631A142f519c2cc',
  CommunityRegistry: '0xB2BBB1450f44effcd50Da49d732CD6be1FEb7b18',
  MemberRouter: '0x9aA2525FAc0992D730e84C8c66D5182C1a646054',
  MemberProtocolFee: '0x33F30ec26c4a7E634ffC6850ADE7ae46D3c1A5F4',
  MemberRegistry: '0xb1dcAc10B35B71C8E3D0C459ad8e75baa6820C69',
  MemberTokenomics: '0x42DC8F2a9d0C0d2Db2F87c500A471621432be8b5',
  MemberTokenURI: '0xAa1bAAae3e107c90f8A80b75D991fB01C908860E',
  CommunityRegistryInterface: '0xa2DF6c0cfD77d673756881fA3E30090a1Accc44c',
  LZCommunityRegistryInterface: '0x3C1121a1bDCA428d53d5c984F28D3a4F6DB0C392',
  MemberRegistryInterfaceFactory: '0x79f86139cc4C6fdEc4fEA57380575a7517a3E64b',
  TextRecord: '0x061D9e048D0D93E64f5D2FFfDa66c97A4cD1AabD',
  PrimaryRecord: '0xe680A242B1BdFB07Ea6353ddF343A368aFE68278'
};

const CONTRACT_ADDRESS_MUMBAI = {
  BaseNodeValidator: '0xa680E720dDaf0Eb9E2Bf7aFAd0433F2697d21DF8',
  SubNodeValidator: '0x0B792F2662Fe5822F7b2f386A3C51ebeC77fcBC7',
  CommunityTokenURIValidator: '0x08908A51a589d17e0384FA00d631A142f519c2cc',
  CommunityTokenURI: '0x71DA0E6fcDcE8Ab582C28cE9F874a8E234067f99',
  CommunityRegistry: '0x9aA2525FAc0992D730e84C8c66D5182C1a646054',
  MemberRouter: '0xE67129FeFd27dA793493CB45A59ff0Bbcf974808',
  MemberProtocolFee: '0xb1dcAc10B35B71C8E3D0C459ad8e75baa6820C69',
  MemberRegistry: '0xAa1bAAae3e107c90f8A80b75D991fB01C908860E',
  MemberTokenomics: '0xa2DF6c0cfD77d673756881fA3E30090a1Accc44c',
  MemberTokenURI: '0x3C1121a1bDCA428d53d5c984F28D3a4F6DB0C392',
  CommunityRegistryInterface: '0x66eC45acb25EaC1F14D1fe55689eb0237090ac5D',
  LZCommunityRegistryInterface: '0x79f86139cc4C6fdEc4fEA57380575a7517a3E64b',
  MemberRegistryInterfaceFactory: '0xe680A242B1BdFB07Ea6353ddF343A368aFE68278',
  TextRecord: '0x8519a14b53e69Afed314B7B37670De859F3bdDcF',
  PrimaryRecord: '0x1130d7700608b7b0c62da7da8C93991b29FE1E4E'
};

const CONTRACT_ADDRESS_MAINNET = {
  BaseNodeValidator: '0xfF795E4B82c97e41e1eFA40239fE1A13763542CD',
  SubNodeValidator: '0x035bFdd94Bf49505fC74d2e7d52cF94732103c99',
  CommunityTokenURIValidator: '0x822Caeb805AffCce3D399BD08Abe1B2E35dcB06b',
  CommunityTokenURI: '0x67046D3E6bfCb6E6d46DFd4D038260214245D771',
  CommunityRegistry: '0x640216Ea5b2aC018b1d1FDB3F0a206F652C92574',
  MemberRouter: '0x0DbE6ad0C681E4055f18509cbdde2dbdF3626065',
  MemberProtocolFee: '0x4C35E2d49592992Bbf64334A7F632ACC454A2582',
  MemberRegistry: '0x14865C1c1a5553144588d26f899FE6101bC2f734',
  MemberTokenomics: '0xfBFB4E60A5a6f08790715d1435bd4F392b2f04f7',
  MemberTokenURI: '0x349C8aD4f5555aA9E4BCE37b2379266762882D4B',
  CommunityRegistryInterface: '0x213cba02742735d1D0F9D692b1E694644f29c87C',
  LZCommunityRegistryInterface: '0x9B709180dEb3393fE3201cDDA3Ba5556e133DaA1',
  MemberRegistryInterfaceFactory: '0xf43EF51EeBd1885165BF5D3Bfb2CEe88FE2dD589',
  TextRecord: '0x4F0061b6ad8be8C038A1447c67eB959017F884e6',
  PrimaryRecord: '0xd825A94EAcA80e3e2cBf44C2AdD2202031086b04'
};

export const CONTRACT_MAP = isTestnet => isTestnet ? {
  10121: CONTRACT_ADDRESS_GOERLI,
  10109: CONTRACT_ADDRESS_MUMBAI
} : {
  101: CONTRACT_ADDRESS_MAINNET
}

export const ABIs = {
  BaseNodeValidator: BaseNodeValidator,
  CommunityRegistry: CommunityRegistry,
  CommunityRegistryInterface: CommunityRegistryInterface,
  CommunityTokenURI: CommunityTokenURI,
  CommunityTokenURIValidator: CommunityTokenURIValidator,
  ERC20: ERC20,
  LZCommunityRegistryInterface: LZCommunityRegistryInterface,
  LZReplicaCommunityRegistryInterface: LZReplicaCommunityRegistryInterface,
  MemberProtocolFee: MemberProtocolFee,
  MemberRegistry: MemberRegistry,
  MemberRegistryInterface: MemberRegistryInterface,
  MemberRegistryInterfaceFactory: MemberRegistryInterfaceFactory,
  MemberRouter: MemberRouter,
  MemberTokenomics: MemberTokenomics,
  MemberTokenURI: MemberTokenURI,
  PrimaryRecord: PrimaryRecord,
  SubNodeValidator: SubNodeValidator,
  TextRecord: TextRecord,
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