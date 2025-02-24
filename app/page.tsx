"use client";

import { ethers } from "ethers";
import abi from "./config/abi.js";
import { generateKeys } from "./functions/secretpath/generateKeys";
import { constructPayload } from "./functions/secretpath/constructPayload";
import { encryptPayload } from "./functions/secretpath/encryptPayload.js";
import { hexlify } from "ethers/lib/utils";

export default function Home() {
 
  const submit = async (): Promise<void> => {

    const routing_contract = "secret1neeyum9p9h6u0d5jkxlqx9w5nrz49hzrr63jsw";
    const routing_code_hash = "6994d8ff9ed1af73ef4685a9f5c8a5568804afb5fa5ce49ec8496fb271a9760a"
    const iface = new ethers.utils.Interface(abi);
    const provider = "https://base-sepolia.infura.io/v3/7bb38f598ae5404ebc844325edec7c4e"
  
    const [myAddress] = "0x49e01eb08bBF0696Ed0df8cD894906f7Da635929"

    const { userPrivateKeyBytes, userPublicKeyBytes, sharedKey } =
    await generateKeys();

  const callbackSelector = iface.getSighash(
    iface.getFunction("upgradeHandler")
  );

  console.log("callbackSelector: ", callbackSelector);

  const callbackGasLimit = 90000;
  // The function name of the function that is called on the private contract
  const handle = "store_value";



    console.log("test: use client");
  };

  return (
    <div>
      <h1>Home</h1>
      <button onClick={submit}>
        Submit
      </button>
    </div>
  );
}
