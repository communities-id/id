import { keccak256 } from "./utils"

export const COMMUNITY_NAME_TO_ADDRESS_MAP_TESTNET = {
  gene400: '0x43c06710d15a2bf0cac1f9d8cd6f5b33f51462e9',
  hellotest: '0xb000ed32ed13e2b9ea74a76edfbf5b7733879223',
  ethhk: '0x2ca4cf3c4a064fc15f7b5b1c0182cc4bf565f473',
  jtest2: '0x6c3c46ccd0382653346fdd9912e9764876718060',
  wagmi_test: '0xd64eadef27660fc71becb7fdcfd5a914ffa536d7',
  reyield: '0x549ea2a88e89c449f03ed925842a2a9f0556dc29',
  ic1101: '0x4d966b3fdcb37bb00e304f6dd711310cfe56ab55',
  wongta: '0x9947ee53fe35e34f5e68efc6819c83d5a900a5ae',
  jtest5: '0x2020b4324bf170bb16694235e5dec35db3f41685',
  owl: '0x2c7ead1c3bbbc355d27c826de1c9bc15d02c3e84',
  gene201: '0xbdcd42e91931a3f37b020a42bb9ae3f6acc80025',
  gene212: '0xb5cbfeef20556af14d2cf3225607880c021af484',
  tesaestsd: '0x0d80b0ad62de74e2879a7299e9a2ac87428966d5',
  teasdfasd: '0x9de8b3fc3e03df170037e8c04e1b121e36a7ff99',
  tokenhunter: '0x36781fbbbd0a38e68e89d19c98dc1c0ec3170d82',
  fasdf: '0x2a71a0912be3115f256e9c7f280b7da4f248d70a',
  asdf: '0x03fc5e8a9a79c30fb7b311cf47c4ef8d02dd2aa7',
  asdfs: '0x7c13141dac805838ab8838a220ac851976591c92',
  gene216: '0xb4eed0064175b6cdd40243d93de42c78a2b895c2',
  gm: '0xbd5a696b6758aa18fd687d639e94bd4d3a96f7a6',
  gene243: '0x9d863aa1ec19ac93700fbb81da54262a52606dca',
  gene100: '0x05a3e3cd65cd00222f2623d768fce4dfb5b988a3',
  maintest: '0xf28ca73bc937477952c55188eebfd3ea0e44e249',
  atem: '0xe63268f078327fb7aa8cf3aec7ddfd5cb78902bd',
  jtest6: '0x6e0dbd0c986e25be23238a1218275ac96f1b432f',
  gene120: '0x8898e5e65bd4d3f117e1ba9f899780a7c51c7d57',
  soulland: '0x312d710e8bc36cf0041499fc582a6fbb336d15b3',
  ezswap: '0x604ec6679b219f3f856c56794a19623e553a4671',
  sqr3d: '0xd7755878356468b2c1a117ab26a30ed4f59d9b9b',
  mises: '0xd860bfd87860eeb2de7c99dc2802763e3742846b',
  magnus: '0x53b5a6b597cb872afdf59f693db8d7df28087a5d',
  gene244: '0xe339ba80bd5a7c65311f8964c0ab273792f8b3e2',
  jtest8: '0x496b4b828cbb557954eb4be9cda182697990575c',
  xbank: '0x40be03d01a5b72c847a2e5712bfa26d03c11ac1b',
  roseon: '0x816f365a21abdd36d7d7e23123e271ad52f667a6',
  jtest10: '0x196f26f28d57dc008bc3285311daa03aa0d450a7',
  gene403: '0x9c310e35f493c06023149b6fa8bd7fa3a28de6bd',
  club3: '0xaeca8fc5786aeca541519ba0a82eed3e1f73af6a',
  jtest1: '0x724123c1d1a65928e9831795a97bd94b2015742c',
  gene206: '0xe2414ccab1074ddee490fb7c9b6ced43dee3d04a',
  eth_hk: '0x8409f895f3ac9a68fa2a7859c7c16cc54c544711',
  joy: '0xd1d3007d2bb02776d1fa7c4d7c9c1f25c8e4218a',
  degame: '0xc6b0180c8c0b3eb51c96aaef75249d9495636893',
  jtest12: '0x9ded1a90d49499579c55908064871687373e3952',
  gene250: '0x77a86e896130735d4ca8e40d68785b2734cdc935',
  jtest13: '0xfb8341d07523533c74ddf9ab3fabce602c36cdf9',
  gene252: '0x3aaafd0f21975046c89f6949a5dbfc161a3e492b',
  jtest14: '0xeba2d9b64bda6334771254b688e1cdc666a9ac61',
  btc: '0x23e87d61d4554994f8cececaccc2b443175c75a2',
  test99: '0xaa7cd6393b7b91fc2d75c8abb7b2a13041cf177a',
  jtest11: '0xe95a8865282e47a57b68fb3849a388b3b00c2b65',
  optest3: '0xcdfe0f709d6e0487047b74098f8f9d575476cc2b',
  cid: '0xe172ee34a287927754de6905548ea0e0cd830db3',
  yixuan: '0x01b1ed3791c2e9f87e9106ccb11668de52ea655a',
  xyfinance: '0x56113134ae708f1310b317d562ad9f706714e2c5',
  ultiverse: '0xbeebd1d0da683f13494c4dd9c14add98512d0881',
  nfprompt: '0x952b58667eef375498c4fd1dd18dbea2a5eb81b9',
  gene251: '0x4a1200f0b4e33abf7544ec42093873943c38e6f8',
  gene253: '0x41cee5332455bc235e7344d6c8bb05f4193030e7',
  chatpuppy: '0xbdc16aefc97218a89586f4d887b43c5e026fd65c',
  jtest7: '0x2c52daedf6ba1e12a4895764047fd8ea5d368e56',
  gene214: '0x84e43641a71b62cd1eba4262c3986bdf74854653',
  gene150: '0x769d36a2581b4446d1d29551cd09163031ffa52b',
  gene180: '0x83ae35082a0fd60e82cafc70ee42def5fa7d0221',
  scrolltest: '0xce4475d58950ad94ab21206829a58b02e08c405d',
  gene151: '0x08f31ed549a5b8f1940fb8023a4e6385fa9d9c67',
  gene161: '0x06913380bc6143074f45250856832e40c8a05652',
  gene131: '0xe2125504c17a04ddf3c9e7a131c8f2de511ca2e6',
  maintest2: '0x2be73927676a012fe99c64b61f71ec23187742c2',
  jtest3: '0x08342086adf7b1e0a890d3f132d0dad9d1b2889a',
  gene245: '0xf9d0c8c266b9082aef5fe3d686fbcdf900731810',
  gene112: '0x90ecb0178292c28d04fe64d513c7c7eace0e468d',
  gene113: '0xcadf9d0fb3fbb4ed22a8b2b0e40e588ca20258cd',
  gene202: '0x34885589813235432e3a6eea4fdd8038f4e79a7a',
  optest2: '0x50555768cca48f8d74a1008641aea0255ac31048',
  basetest: '0xb000ed32ed13e2b9ea74a76edfbf5b7733879223',
  gene117: '0xa3ec3bccd34fe5c27527476690042c748fc1d967',
  gene130: '0xd7786e9b5de507191027ac5adfe3962a4665b315',
  gene116: '0xd0a22179a58b8df8cf15068f70cfad0810a94647',
  ddd: '0xf20597b645c7b562769323d9434797827e71e45c',
  gene401: '0xd0a22179a58b8df8cf15068f70cfad0810a94647',
  basetest2: '0x2ca4cf3c4a064fc15f7b5b1c0182cc4bf565f473',
  optest: '0x0a6e77dc635055d526ca9853b25d50722150c67c',
  gene111: '0xd63df13fde435a922060fbecd2e7dfc1256b065f',
  gene208: '0x4423a6d0620b53e11ed322981c017d5b72bcca8a',
  gene103: '0x2e8801d6c91dcb35cf9849ca96597ee43cf15c62',
  gene110: '0xce4475d58950ad94ab21206829a58b02e08c405d',
  gene140: '0x43c06710d15a2bf0cac1f9d8cd6f5b33f51462e9',
  maintest3: '0x885849b70b42ebc2cc053c49d87d444674490d06',
  jtest9: '0x2f9072d0786f49d8fc46286e597d57b3db0b1e86',
  gene200: '0x5ff833ee9eed33c5c7bedff850e71d01c0918083',
  gene213: '0xca7b211fae165b0f90927769e5f42159a0437d45',
  cassava: '0xca18894975f404de0a616c71010db8498e49bfd5'
}

export const COMMUNITY_NAME_TO_ADDRESS_MAP_MAINNET = {
  wagmi: '0xb92d06e53f68d1853bf885759e7d49dca482cf44',
  hi_polygon: '0xdd9e049e03beec4130973b9f6e2e3d9dd7d480db',
  oneday: '0x1029c002c4ced5d3c9d133ce07c6f162730a715a',
  hi_op: '0xb92d06e53f68d1853bf885759e7d49dca482cf44',
  hi_base: '0x188532555b4f2d1fe486e75bb5c3a8b3f5f4d5e9',
  basics: '0x36a43094268c25a8e0583db662b3048812a178e5',
  hi_bsc: '0xb92d06e53f68d1853bf885759e7d49dca482cf44',
  jsquare: '0xc7fcfc85524a73999c2d0899b7eecb69acb95711',
  communitiesid: '0x28fadebe9749ec0d79715f8a920bf283d633cfb7',
  tokenhunter: '0xdd9e049e03beec4130973b9f6e2e3d9dd7d480db',
  hi_scroll: '0xb92d06e53f68d1853bf885759e7d49dca482cf44'
}

export const COMMUNITY_NAME_TO_CHAINID_MAP_TESTNET = {
  gene400: 534351,
  hellotest: 534351,
  ethhk: 534351,
  jtest2: 5,
  wagmi_test: 5,
  reyield: 5,
  ic1101: 5,
  wongta: 5,
  jtest5: 5,
  owl: 5,
  gene201: 5,
  gene212: 5,
  tesaestsd: 5,
  teasdfasd: 5,
  tokenhunter: 5,
  fasdf: 5,
  asdf: 5,
  asdfs: 5,
  gene216: 5,
  gm: 5,
  gene243: 5,
  gene100: 5,
  maintest: 5,
  atem: 5,
  jtest6: 5,
  gene120: 5,
  soulland: 5,
  ezswap: 5,
  sqr3d: 5,
  mises: 5,
  magnus: 5,
  gene244: 5,
  jtest8: 5,
  xbank: 5,
  roseon: 5,
  jtest10: 5,
  gene403: 5,
  club3: 5,
  jtest1: 5,
  gene206: 5,
  eth_hk: 5,
  joy: 5,
  degame: 5,
  jtest12: 5,
  gene250: 5,
  jtest13: 5,
  gene252: 5,
  jtest14: 5,
  btc: 5,
  test99: 420,
  jtest11: 5,
  optest3: 420,
  cid: 5,
  yixuan: 5,
  xyfinance: 5,
  ultiverse: 5,
  nfprompt: 5,
  gene251: 420,
  gene253: 420,
  chatpuppy: 5,
  jtest7: 5,
  gene214: 84531,
  gene150: 420,
  gene180: 84531,
  scrolltest: 534351,
  gene151: 5,
  gene161: 420,
  gene131: 97,
  maintest2: 5,
  jtest3: 5,
  gene245: 84531,
  gene112: 420,
  gene113: 420,
  gene202: 97,
  optest2: 420,
  basetest: 84531,
  gene117: 420,
  gene130: 97,
  gene116: 84531,
  ddd: 420,
  gene401: 534351,
  basetest2: 84531,
  optest: 420,
  gene111: 420,
  gene208: 84531,
  gene103: 84531,
  gene110: 84531,
  gene140: 84531,
  maintest3: 5,
  jtest9: 5,
  gene200: 5,
  gene213: 5,
  cassava: 5
}

export const COMMUNITY_NAME_TO_CHAINID_MAP_MAINNET = {
  wagmi: 137,
  hi_polygon: 137,
  oneday: 8453,
  hi_op: 10,
  hi_base: 8453,
  basics: 137,
  hi_bsc: 56,
  jsquare: 8453,
  communitiesid: 8453,
  tokenhunter: 56,
  hi_scroll: 534352
}


export const COMMUNITY_HASH_TO_ADDRESS_MAP_TESTNET = {}
export const COMMUNITY_HASH_TO_ADDRESS_MAP_MAINNET = {}

export const COMMUNITY_ADDRESS_TO_NAME_MAP_TESTNET = {}
export const COMMUNITY_ADDRESS_TO_NAME_MAP_MAINNET = {}

for (let i in COMMUNITY_NAME_TO_ADDRESS_MAP_TESTNET) {
  COMMUNITY_HASH_TO_ADDRESS_MAP_TESTNET[keccak256(i)] = COMMUNITY_NAME_TO_ADDRESS_MAP_TESTNET[i]
  COMMUNITY_ADDRESS_TO_NAME_MAP_TESTNET[COMMUNITY_NAME_TO_ADDRESS_MAP_TESTNET[i]] = i
}

for (let i in COMMUNITY_NAME_TO_ADDRESS_MAP_MAINNET) {
  COMMUNITY_HASH_TO_ADDRESS_MAP_MAINNET[keccak256(i)] = COMMUNITY_NAME_TO_ADDRESS_MAP_MAINNET[i]
  COMMUNITY_ADDRESS_TO_NAME_MAP_MAINNET[COMMUNITY_NAME_TO_ADDRESS_MAP_MAINNET[i]] = i
}