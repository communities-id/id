# Communities ID SDK

## Install

```
npm i @communitiesid/id
```

## Usage

### Initialze

``` javascript
import CommunitiesID from '@communitiesid/id';

const options: CommunitiesIDInput = {
  mainnet: {
    RPCUrl: "<rpc url for mainnet>",
    alchemyKey: "<your alchemy key for mainnet network>",
    generateSigner: provider => new ethers.Wallet('<your private key>', provider)
  },
  // binance and arbitrum chain only support resolve name and lookup address, so only RPC url is nedded
  binance: {
    RPCUrl: "<rpc url for binance>",
  },
  arbitrum: {
    RPCUrl: "<rpc url for arbitrum>",
  }
}

const { resolver, collector, operator } = new CommunitiesID(options);
```

If you want to use this sdk on communitiesID testnet, you can initialize it like this:

``` javascript
const options: CommunitiesIDInput = {
  isTestnet: true,
  goerli: {
    RPCUrl: "<rpc url for goerli>",
    alchemyKey: "<your alchemy key for goerli network>",
    generateSigner: provider => new ethers.Wallet('<your private key>', provider)
  },
  mumbai: {
    RPCUrl: "<rpc url for mumbai>",
    alchemyKey: "<your alchemy key for mumbai network>",
    generateSigner: provider => new ethers.Wallet('<your private key>', provider)
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

#### ```collector.getAllBrandDIDs```

Get all brand DID in specific chain, only works when you provide the alchemy key of this chain

Input:

|Name|Type|Description|required|
|---|---|---|---|
|chain|'goerli' \| 'mumbai' \| 'mainnet'|The chain that you want to get communities|true|

Output: `Promise<object[]>`

Example: 

``` javascript
const res = await collector.getAllBrandDIDs('goerli')
```

---

#### ```collector.getAllBrandDIDsOwnedByAddress```

Get all brand DIDs owned by an address in specific chain, only works when you provide the alchemy key of this chain

Input:

|Name|Type|Description|required|
|---|---|---|---|
|address|string|The address you want to get brand DIDs|true|
|chain|'goerli' \| 'mumbai' \| 'mainnet'|The chain that you want to get brand DIDs|true|

Output: `Promise<object[]>`

Example: 

``` javascript
const res = await collector.getAllBrandDIDsOwnedByAddress('0x0000000000000000000000000000000000000000', 'mainnet')
```

---

#### ```collector.getAllUserDIDsOwnedByAddress```

Get all user DIDs owned by an address in specific chain, only works when you provide the alchemy key of this chain

Input:

|Name|Type|Description|required|
|---|---|---|---|
|address|string|The address you want to get user DIDs|true|
|chain|'goerli' \| 'mumbai' \| 'mainnet'|The chain that you want to get user DIDs|true|

Output: `Promise<object[]>`

Example: 

``` javascript
const res = await collector.getAllUserDIDsOwnedByAddress('0x0000000000000000000000000000000000000000', 'mainnet')
```

---

#### ```collector.getAllBrandDIDsJoinedByAddress```

Get all brand DIDs joined by an address in specific chain, only works when you provide the alchemy key of this chain

Input:

|Name|Type|Description|required|
|---|---|---|---|
|address|string|The address you want to get brand DIDs|true|
|chain|'goerli' \| 'mumbai' \| 'mainnet'|The chain that you want to get brand DIDs|true|

Output: `Promise<object[]>`

Example: 

``` javascript
const res = await collector.getAllBrandDIDsJoinedByAddress('0x0000000000000000000000000000000000000000', 'mainnet')
```

---

#### ```collector.getAllUserDIDsOwnedByBrand```

Get all user DIDs under specific brand DID, only works when you provide the alchemy key of the chain which brand DID on

Input:

|Name|Type|Description|required|
|---|---|---|---|
|name|string|TThe name of the brand DID, if registry and chain is provided, the name will be ignored, and the query efficiency will improve|true|
|registry|string|The registry of this brand DID|false|
|chain|'goerli' \| 'mumbai' \| 'mainnet'|The chain this brand DID is on|false|

Output: `Promise<object[]>`

Example: 

``` javascript
const res = await collector.getAllUserDIDsOwnedByBrand('did')
const res = await collector.getAllUserDIDsOwnedByBrand('', '0x123', 'mainnet')
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
|address|string|The address of the user DID|true|

Output: `Promise<string | null>`

Example: 

``` javascript
const res = await resolver.lookupAddress('0x0000000000000000000000000000000000000000')
```

### operator

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

