// generateKeys.js

"use client";
import { ethers } from "ethers";
import { arrayify, SigningKey } from "ethers/lib/utils";
import { initWasmSecp256k1 } from '@solar-republic/wasm-secp256k1';
import { base64_to_bytes, sha256 } from "@blake.regalia/belt";

export async function generateKeys() {
  const wallet = ethers.Wallet.createRandom();
  const userPrivateKeyBytes = arrayify(wallet.privateKey);
  const userPublicKey = new SigningKey(wallet.privateKey).compressedPublicKey;
  const userPublicKeyBytes = arrayify(userPublicKey);
  const gatewayPublicKey = "A20KrD7xDmkFXpNMqJn1CLpRaDLcdKpO1NdBBS7VpWh3";
  const gatewayPublicKeyBytes = base64_to_bytes(gatewayPublicKey);

  const wasm = await initWasmSecp256k1();
  const sharedKey = await sha256(wasm.ecdh(userPrivateKeyBytes, gatewayPublicKeyBytes));

  return { userPrivateKeyBytes, userPublicKeyBytes, sharedKey };
}