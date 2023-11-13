import { ABIs, CONTRACT_MAP, MAIN_CHAIN_ID, MemberRegistryInterfaceUpgradeTime, ONE_ADDRESS } from "./shared/constant";
import SDKBase from "./base";
import { BurnUserDIDOptions, BrandDID, UserDID, MintUserDIDOptions, RenewUserDIDOptions, SupportedChainIds } from "./shared/types";
import { keccak256, parseContractError } from "./shared/utils";
import { ethers } from "ethers";

export default class Operator extends SDKBase {
  constructor(options) {
    super(options)
  }

  /**
   * Get the price of minting a user DID
   *
   * @param name - The name of the user DID
   * @param options - The options for getting the price
   * @param options.brandDID - The brand DID that this user DID belongs to, if you do not pass this, this function will get the brand DID from contract by itself
   *
   */
  async getMintUserDIDPrice(name: string, options: { brandDID?: BrandDID } = {}) {
    const dotPosition = name.lastIndexOf(".");
    if (dotPosition === -1) {
      throw new Error("The format of identity name is invalid, the corrent format is `${member}.${community}`");
    }
    const memberName = name.substring(0, dotPosition);
    const communityName = name.substring(dotPosition + 1);
    let community = options.brandDID
    if (!community) {
      community = await this._searchBrandDID(communityName)
    }
    const chainId = community.chainId
    const contractAddress = CONTRACT_MAP(this.isTestnet)[chainId]
    const { node, config } = community
    const MemberProtocolFee = this.getContract(contractAddress.MemberProtocolFee, ABIs.MemberProtocolFee, chainId as SupportedChainIds)
    const MemberRegistryInterface = this.getContract(node.registryInterface, ABIs.MemberRegistryInterface, chainId as SupportedChainIds)
    const { basePrice, commission } = await MemberRegistryInterface.getMintPrice(keccak256(memberName), ONE_ADDRESS, ONE_ADDRESS, config.durationUnit);
    const protocolFee = await MemberProtocolFee.getProtocolFee(node.registry, 1);
    return { price: basePrice.add(commission), protocolFee }
  }

  /**
   * Mint a user DID
   *
   * @param name - The name of the user DID
   * @param mintTo - The address that you want to mint this user DID to
   * @param mintOptions - The options for mint user DID
   */
  async mintUserDID(name: string, mintTo: string, mintOptions: MintUserDIDOptions = {}) {
    const dotPosition = name.lastIndexOf(".");
    if (dotPosition === -1) {
      throw new Error("The format of identity name is invalid, the corrent format is `${member}.${community}`");
    }
    const memberName = name.substring(0, dotPosition);
    const communityName = name.substring(dotPosition + 1);
    let community = mintOptions.brandDID
    if (!community) {
      community = await this._searchBrandDID(communityName)
    }
    if (!community) {
      throw new Error(`This community "${communityName}" does not exist`);
    }
    let totalPrice = mintOptions.mintPrice
    if (!totalPrice) {
      const { price, protocolFee } = await this.getMintUserDIDPrice(name, { brandDID: community })
      totalPrice = price.add(protocolFee)
    }
    
    const { node, chainId } = community

    const isLegacyCommunity = node.createTime < MemberRegistryInterfaceUpgradeTime
    const abi = isLegacyCommunity ? ABIs.MemberRegistryInterfaceLegacy :  ABIs.MemberRegistryInterface
    const MemberRegistryInterface = this.getWriteContract(node.registryInterface, abi, chainId as SupportedChainIds)
    if (!mintOptions.refundRecipient) {
      mintOptions.refundRecipient = await MemberRegistryInterface.signer.getAddress()
    }
    const config = await MemberRegistryInterface.getConfig()
    if (!config.publicMint && !config.holdingMint && !config.signatureMint) {
      throw new Error(`This community "${communityName}" does not support mint currently`);
    }
    const durationUnit = community.config.durationUnit
    try {
      if (config.publicMint && memberName.indexOf('.') === -1) {
        const args = [mintTo, durationUnit, memberName]
        if (!isLegacyCommunity) {
          args.push(mintOptions.refundRecipient)
        }
        const mintTx = await MemberRegistryInterface.publicMint(...args, { value: totalPrice.toString(), ...mintOptions.txConfig })
        if (mintOptions.onTransactionCreated) {
          mintOptions.onTransactionCreated(mintTx)
        }
        const receipt = await mintTx.wait();
        return receipt
      }
      if (config.holdingMint || config.proofOfHolding.length > 0) {
        const proofs = await this.openseaSDK.fetchProofOfHolding(config.proofOfHolding, mintTo, chainId as SupportedChainIds)
        if (proofs) {
          const { holdingContract, holdingTokenId } = proofs
          const args = [mintTo, durationUnit, memberName, holdingContract, holdingTokenId]
          if (!isLegacyCommunity) {
            args.push(mintOptions.refundRecipient)
          }
          const mintTx = await MemberRegistryInterface.holdingMint(...args, { value: totalPrice.toString(), ...mintOptions.txConfig })
          if (mintOptions.onTransactionCreated) {
            mintOptions.onTransactionCreated(mintTx)
          }
          const receipt = await mintTx.wait();
          return receipt
        } else if (!config.signatureMint) {
          throw new Error(`You do not have required NFTs to mint the member under community "${communityName}"`)
        }
      }
      if (config.signatureMint && mintOptions.signature) {
        const commitment = {
          registry: node.registry,
          node: memberName,
          owner: mintOptions.owner,
          day: durationUnit,
          deadline: 999999999999,
        };
        const args = [commitment, mintOptions.signature, mintTo]
        if (!isLegacyCommunity) {
          args.push(mintOptions.refundRecipient)
        }
        const mintTx = await MemberRegistryInterface.signatureMint(...args, { value: totalPrice.toString(), ...mintOptions.txConfig })
        if (mintOptions.onTransactionCreated) {
          mintOptions.onTransactionCreated(mintTx)
        }
        const receipt = await mintTx.wait();
        return receipt
      }
    } catch (err) {
      throw {
        message: parseContractError(err),
        originalError: err
      }
    }

  }

  /**
   * Get the price of renewing a user DID
   *
   * @param name - The name of the user DID
   * @param options - The options for getting the price
   * @param options.member - The brand DID that this user DID belongs to, if you do not pass this, this function will get the user DID from contract by itself
   *
   */
  async getRenewUserDIDPrice(name: string, options: { userDID?: UserDID } = {}) {
    const dotPosition = name.lastIndexOf(".");
    if (dotPosition === -1) {
      throw new Error("The format of identity name is invalid, the corrent format is `${member}.${community}`");
    }
    let member = options.userDID
    if (!member) {
      member = await this._searchUserDID(name)
    }
    const chainId = member.chainId
    const contractAddress = CONTRACT_MAP(this.isTestnet)[chainId]
    const { interfaceNode } = member

    const MemberProtocolFee = this.getContract(contractAddress.MemberProtocolFee, ABIs.MemberProtocolFee, chainId as SupportedChainIds)
    const { basePrice, commission } = interfaceNode
    const protocolFee = await MemberProtocolFee.getProtocolFee(ONE_ADDRESS, 1);
    return { price: basePrice.add(commission), protocolFee }
  }

  /**
   * Renew a user DID
   *
   * @param name - The name of the user DID
   * @param RenewUserDIDOptions - The options for mint user DID
   */
  async renewUserDID(name: string, renewOptions: RenewUserDIDOptions = {}) {
    const dotPosition = name.lastIndexOf(".");
    if (dotPosition === -1) {
      throw new Error("The format of identity name is invalid, the corrent format is `${member}.${community}`");
    }
    const memberName = name.substring(0, dotPosition);
    const communityName = name.substring(dotPosition + 1);
    let community = renewOptions.brandDID
    if (!community) {
      community = await this._searchBrandDID(communityName)
    }
    let member = renewOptions.userDID
    if (!member) {
      member = await this._searchUserDID(name)
    }
    let totalPrice = renewOptions.mintPrice
    if (!totalPrice) {
      const { price, protocolFee } = await this.getRenewUserDIDPrice(name, { userDID: member })
      totalPrice = price.add(protocolFee)
    }
    const { node, chainId, config } = community
    const isLegacyCommunity = node.createTime < MemberRegistryInterfaceUpgradeTime
    const abi = isLegacyCommunity ? ABIs.MemberRegistryInterfaceLegacy :  ABIs.MemberRegistryInterface
    const MemberRegistryInterface = this.getWriteContract(node.registryInterface, abi, chainId as SupportedChainIds)
    if (!renewOptions.refundRecipient) {
      renewOptions.refundRecipient = await MemberRegistryInterface.signer.getAddress()
    }
    try {
      const args = [keccak256(memberName), config.durationUnit]
      if (!isLegacyCommunity) {
        args.push(renewOptions.refundRecipient)
      }
      const tx = await MemberRegistryInterface.renew(...args, { value: totalPrice.toString(), ...renewOptions.txConfig });
      if (renewOptions.onTransactionCreated) {
        renewOptions.onTransactionCreated(tx)
      }
      const receipt = await tx.wait();
      return receipt
    } catch (err) {
      throw {
        message: parseContractError(err),
        originalError: err
      }
    }

  }

  /**
   * Burn a user DID
   *
   * @param name - The name of the user DID
   * @param burnOptions - The options for burn user DID
   */
  async burnUserDID(name: string, burnOptions: BurnUserDIDOptions = {}) {
    const dotPosition = name.lastIndexOf(".");
    if (dotPosition === -1) {
      throw new Error("The format of identity name is invalid, the corrent format is `${member}.${community}`");
    }
    const memberName = name.substring(0, dotPosition);
    const communityName = name.substring(dotPosition + 1);
    let community = burnOptions.brandDID
    if (!community) {
      community = await this._searchBrandDID(communityName)
    }
    const chainId = community.chainId
    const contractAddress = CONTRACT_MAP(this.isTestnet)[chainId]
    const { node } = community

    const MemberRegistryInterface = this.getWriteContract(node.registryInterface, ABIs.MemberRegistryInterface, chainId as SupportedChainIds)
    const MemberProtocolFee = this.getContract(contractAddress.MemberProtocolFee, ABIs.MemberProtocolFee, chainId as SupportedChainIds)
    const procotolFee = await MemberProtocolFee.getProtocolFee(node.registry, 4);

    try {
      const tx = await MemberRegistryInterface.burn(keccak256(memberName), { value: procotolFee.toString(), ...burnOptions.txConfig });
      if (burnOptions.onTransactionCreated) {
        burnOptions.onTransactionCreated(tx)
      }
      const receipt = await tx.wait();
      return receipt
    } catch (err) {
      throw {
        message: parseContractError(err),
        originalError: err
      }
    }

  }

  /**
   * Set a did as primary
   *
   * @param name - The name of the did
   * @param options - The options for set primary
   * @param options.txConfig - The config for sending transaction
   * @param options.onTransactionCreated - The callback function when the transaction is created
   */
  async setAsPrimary(name: string, options: { txConfig?: object, onTransactionCreated?: (transaction: object) => any } = {}) {
    const chainId = MAIN_CHAIN_ID(this.isTestnet)
    const contractAddress = CONTRACT_MAP(this.isTestnet)[chainId]
    const PrimaryRecord = this.getWriteContract(contractAddress.PrimaryRecord, ABIs.PrimaryRecord, chainId)
    const MemberProtocolFee = this.getContract(contractAddress.MemberProtocolFee, ABIs.MemberProtocolFee, chainId)
    const keywordsArr = name.split('.')
    const community = keywordsArr[keywordsArr.length - 1]
    const member = keywordsArr.slice(0, -1).join('.')
    let empty = ethers.utils.formatBytes32String("")
    try {
      const procotolFee = await MemberProtocolFee.getProtocolFee(ONE_ADDRESS, 5);
      const tx = await PrimaryRecord.setPrimaryRecord(community ? keccak256(community) : empty, member ? keccak256(member) : empty, { value: procotolFee.toString(), ...options.txConfig })
      if (options.onTransactionCreated) {
        options.onTransactionCreated(tx)
      }
      const receipt = await tx.wait();
      return receipt
    } catch (err) {
      throw {
        message: parseContractError(err),
        originalError: err
      }
    }

  }
}