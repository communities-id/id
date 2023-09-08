import { ethers } from "ethers"
import { ERROR_MAP } from "./constant"

export function parseTokenURI(tokenUriString: string) {
  const base64String = tokenUriString.split('base64,')[1] || ''
  const tokenUri = Buffer.from(base64String, 'base64').toString() || '{}'
  const jsonString = tokenUri.replace(/\n/g, ' ')
  const res = JSON.parse(jsonString)
  return res
}

export function keccak256(value: string) {
  const { utils } = ethers
  return utils.keccak256(utils.toUtf8Bytes(value));
}

export function parseContractError(err: any) {
  const errString = err.toString()
  for (let i in ERROR_MAP) {
    if (errString.includes(i)) {
      return ERROR_MAP[i]
    }
  }
  if (err.data && err.data.message) {
    return err.data.message
  }
  if (err.error) {
    return err.error.message
  }
  if(err.reason || err.message) {
    return err.reason || err.message
  }
  return errString
}