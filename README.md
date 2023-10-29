# Communities ID SDK

## Install

```
npm i @communitiesid/id
```

## Usage

### Initialze

``` javascript
import CommunitiesID from '@communitiesid/id';

const OPTIONS: CommunitiesIDInput = {
  isTestnet: false,
  openseaKey: '<Your opensea api key>',
  Ethereum: {
    RPCUrl: '<Your rpc url for this chain>'
  },
  Polygon: {
    RPCUrl: '<Your rpc url for this chain>'
  },
  Base: {
    RPCUrl: '<Your rpc url for this chain>'
  },
  OP: {
    RPCUrl: '<Your rpc url for this chain>'
  },
  BSC: {
    RPCUrl: '<Your rpc url for this chain>'
  },
  Scroll: {
    RPCUrl: '<Your rpc url for this chain>'
  },
  arbitrum: {
    RPCUrl: '<Your rpc url for this chain>'
  },
}

const { resolver, collector, operator } = new CommunitiesID(options);
```

If you want to use this sdk on communitiesID testnet, you can initialize it like this:

``` javascript
const OPTIONS: CommunitiesIDInput = {
  isTestnet: true,
  openseaKey: '<Your opensea api key>',
  Goerli: {
    RPCUrl: '<Your rpc url for this chain>',
  },
  'Polygon Mumbai': {
    RPCUrl: '<Your rpc url for this chain>',
  },
  'Base Goerli Testnet': {
    RPCUrl: '<Your rpc url for this chain>',
  },
  'Optimism Goerli Testnet': {
    RPCUrl: '<Your rpc url for this chain>',
  },
  'BNB Smart Chain Testnet': {
    RPCUrl: '<Your rpc url for this chain>',
  },
  'Scroll Sepolia Testnet': {
    RPCUrl: '<Your rpc url for this chain>',
  }
}

```


### collector

#### ```collector.searchBrandDID```

Get the brand DID info by name

Input:

|Name|Type|Description|required|
|---|---|---|---|
|name|string|The name of the brand DID|true|

Output: `Promise<BrandDID | null>`

Example: 

``` javascript
const res = await collector.searchBrandDID('did')
```

---

#### ```collector.searchBrandDIDByTokenId```

Get the brand DID info by name

Input:

|Name|Type|Description|required|
|---|---|---|---|
|tokenId|number|The token ID of this brand DID|true|
|chainId|SupportedChainIds|The chain ID that that this brand DID is on|true|

Output: `Promise<BrandDID | null>`

Example: 

``` javascript
const res = await collector.searchBrandDIDByTokenId(1, 80001)
```

---

#### ```collector.searchUserDID```

Get the user DID info by name

Input:

|Name|Type|Description|required|
|---|---|---|---|
|name|string|The name of the user DID, the format should be `${userDID}.${brandDID}`|true|

Output: `Promise<UserDID | null>`

Example: 

``` javascript
const res = await collector.searchUserDID('a.did')
```

---

#### ```collector.searchUserDIDByTokenId```

Get the brand DID info by name

Input:

|Name|Type|Description|required|
|---|---|---|---|
|registry|string|The registry address of this user DID|true|
|tokenId|number|The token ID of this brand DID|true|
|chainId|SupportedChainIds|The chain ID that that this brand DID is on|true|

Output: `Promise<UserDID | null>`

Example: 

``` javascript
const res = await collector.searchUserDIDByTokenId('0x123...', 1, 80001)
```

---

#### ```collector.getAllBrandDIDs```

Get all brand DID in specific chain, if you call this on mainnet, opensea Key is required

Input:

|Name|Type|Description|required|
|---|---|---|---|
|chainId|SupportedChainIds|The chain ID that you want to get brand DIDs|true|

Output: `Promise<object[]>`

Example: 

``` javascript
const res = await collector.getAllBrandDIDs(5)
```

---

#### ```collector.getAllBrandDIDsOwnedByAddress```

Get all brand DIDs owned by an address in specific chain, if you call this on mainnet, opensea Key is required

Input:

|Name|Type|Description|required|
|---|---|---|---|
|address|string|The address you want to get brand DIDs|true|
|chainId|SupportedChainIds|The chain ID that you want to get brand DIDs|true|

Output: `Promise<object[]>`

Example: 

``` javascript
const res = await collector.getAllBrandDIDsOwnedByAddress('0x0000000000000000000000000000000000000000', 5)
```

---

#### ```collector.getAllUserDIDsOwnedByAddress```

Get all user DIDs owned by an address in specific chain, if you call this on mainnet, opensea Key is required

Input:

|Name|Type|Description|required|
|---|---|---|---|
|address|string|The address you want to get user DIDs|true|
|chainId|SupportedChainIds|The chain ID that you want to get brand DIDs|true|

Output: `Promise<object[]>`

Example: 

``` javascript
const res = await collector.getAllUserDIDsOwnedByAddress('0x0000000000000000000000000000000000000000', 5)
```

---

#### ```collector.getAllBrandDIDsJoinedByAddress```

Get all brand DIDs joined by an address in specific chain, if you call this on mainnet, opensea Key is required

Input:

|Name|Type|Description|required|
|---|---|---|---|
|address|string|The address you want to get brand DIDs|true|
|chainId|SupportedChainIds|The chain ID that you want to get brand DIDs|true|

Output: `Promise<object[]>`

Example: 

``` javascript
const res = await collector.getAllBrandDIDsJoinedByAddress('0x0000000000000000000000000000000000000000', 5)
```

---

#### ```collector.getAllUserDIDsOwnedByBrand```

Get all user DIDs under specific brand DID, if you call this on mainnet, opensea Key is required

Input:

|Name|Type|Description|required|
|---|---|---|---|
|name|string|The name of the brand DID, if registry and chain is provided, the name will be ignored, and the query efficiency will improve|true|
|registry|string|The registry of this brand DID|false|
|chainId|SupportedChainIds|The chain ID that you want to get brand DIDs|true|

Output: `Promise<object[]>`

Example: 

``` javascript
const res = await collector.getAllUserDIDsOwnedByBrand('did')
const res = await collector.getAllUserDIDsOwnedByBrand('', '0x123', 5)
```

### resolver

#### ```resolver.resolveName```

Get the owner of a userDID. If not found in communities ID, it will find in ens. If you pass binance or arbitrum rpc url, it will also find address in space id.

Input:

|Name|Type|Description|required|
|---|---|---|---|
|name|string|The name of the userDID, the format should be `${userDID}.${brandDID}`|true|

Output: `Promise<string | null>`

Example: 

``` javascript
const res = await resolver.resolveName('a.did')
```

---

#### ```resolver.lookupAddress```

Get primary did of an address. If not found in communities ID, it will find in ens. If you pass binance or arbitrum rpc url, it will also find address in space id.

Input:

|Name|Type|Description|required|
|---|---|---|---|
|address|string|The address of the user DID|true|true|

Output: `Promise<string | null>`

Example: 

``` javascript
const res = await resolver.lookupAddress('0x0000000000000000000000000000000000000000')
```

### operator

#### ```operator.setSigner```
Set signer for write operation. For some secnarios, like frontend, we are not able to get the private key of the user, so we need to set signer for write operation.

Input:

|Name|Type|Description|required|
|---|---|---|---|
|signer|ethers.Signer|ethers.Signer object|true|

Example: 

``` javascript
communitiesidSDK.operator.setSigner(signer)
```

---

#### ```operator.getMintUserDIDPrice```
Get the price of minting a user DID

Input:

|Name|Type|Description|required|
|---|---|---|---|
|name|string|The name of the user DID|true|
|options|object|mint options|false|
|options.brandDID|object|the brand DID object from `searchBrandDID`, if not pass it, the method will call `searchBrandDID` itself|false|


Example: 

``` javascript
const res = await operator.getMintUserDIDPrice('test.did')
```

``` javascript
const brandDID = await collector.searchBrandDID('did')
const res = await operator.getMintUserDIDPrice('test.did', { brandDID })
```

---

#### ```operator.mintUserDID```
Mint a user DID (This is a write method, the generateSigner function of the chain which this user DID on is required)

Input:

|Name|Type|Description|required|
|---|---|---|---|
|name|string|The name of the user DID|true|
|mintTo|string|The address that you want mint this user DID to|true|
|options|MintUserDIDOptions|mint options|false|
|options.signature|string|The signature to mint user DID|false|
|options.owner|string|The owner in signature|false|
|options.mintPrice|BigNumber \| number \| string|The price to mint this brand DID, if you do not pass this, this function will get the price by itself|false|
|options.refundRecipient|string|If you passed higher value than mint price, the excees part will transfer to this wallet, default is address of signer|false|
|options.brandDID|BrandDID|The brand DID that this user DID belongs to, if you do not pass this, this function will get the brand DID by itself|false|
|options.onTransactionCreated|(transaction: object) => any|The callback function when the transaction is created|false|


Example: 

``` javascript
const res = await operator.mintUserDID('test.did', '0x123456')
```

---

#### ```operator.getRenewUserDIDPrice```
Get the price of renew a user DID

Input:

|Name|Type|Description|required|
|---|---|---|---|
|name|string|The name of the user DID|true|
|options|object|mint options|false|
|options.userDID|object|the user DID object from `searchuserDID`, if not pass it, the method will call `searchuserDID` itself|false|


Example: 

``` javascript
const res = await operator.getRenewUserDIDPrice('test.did')
```

``` javascript
const userDID = await collector.searchUserDID('test.did')
const res = await operator.getRenewUserDIDPrice('test.did', { userDID })
```

---

#### ```operator.renewUserDID```
Mint a user DID (This is a write method, the generateSigner function of the chain which this user DID on is required)

Input:

|Name|Type|Description|required|
|---|---|---|---|
|name|string|The name of the user DID|true|
|options|RenewUserDIDOptions|renew options|false|
|options.mintPrice|BigNumber \| number \| string |The price to mint this brand DID, if you do not pass this, this function will get the price by itself|false|
|options.brandDID|BrandDID|The brand DID that this user DID belongs to, if you do not pass this, this function will get the brand DID by itself|false|
|options.userDID|UserDID|The user DID object that you want to renew, if you do not pass this, this function will get the brand DID by itself|false|
|options.refundRecipient|string|If you passed higher value than mint price, the excees part will transfer to this wallet, default is address of signer|false|
|options.onTransactionCreated|(transaction: object) => any|The callback function when the transaction is created|false|


Example: 

``` javascript
const res = await operator.renewUserDID('test.did')
```

---

#### ```operator.burnUserDID```
Burn a user DID (This is a write method, the generateSigner function of the chain which this user DID on is required)

Input:

|Name|Type|Description|required|
|---|---|---|---|
|name|string|The name of the user DID|true|
|options|BurnUserDIDOptions|burn options|false|
|options.brandDID|BrandDID|The brand DID that this user DID belongs to, if you do not pass this, this function will get the brand DID by itself|false|
|options.onTransactionCreated|(transaction: object) => any|The callback function when the transaction is created|false|


Example: 

``` javascript
const res = await operator.burnUserDID('test.did')
```


---

#### ```operator.setAsPrimary```
Set a user DID as primary (This is a write method, the generateSigner function of the chain which this user DID on is required)

Input:

|Name|Type|Description|required|
|---|---|---|---|
|name|string|The name of the user DID|true|
|options|object|setAsPrimary options|false|
|options.onTransactionCreated|(transaction: object) => any|The callback function when the transaction is created|false|


Example: 

``` javascript
const res = await operator.setAsPrimary('test.did')
```

