import { config } from "dotenv";
import { setApiKey, wrapFunction } from "smart-error-explanator";
config();

setApiKey(process.env.OPENAI_API_KEY);

import tac, { JettonWallet } from "tac-sdk";
const { TacSdk, Network, SenderFactory } = tac;
import { ethers } from "ethers";

const mnemonic = process.env.MNEMONIC;
const DappProxyAddress = "0xe610E30F07A7F79bC520f946D828a8a263c7e39D";
const walletVersion = 'v4';

const tacSdk = new TacSdk({
  network: Network.Testnet,
  delay: 3,
});

const sender = await SenderFactory.getSender({
  version: walletVersion,
  mnemonic
});

const abi = new ethers.AbiCoder();

async function performCrossChainTransaction() {

  const evmProxyMsg = {
    evmTargetAddress: DappProxyAddress,
    methodName: "lockTokens(uint256 amount)",
    encodedParameters: abi.encode(["uint256"], [1]),
  };

  const jetton = [
    {
      address: "EQBvmYl-CFo6B00UI-UP1mkwYCxm0zzad9cbuEpw413OUOAc",
      amount: 1,
    }
  ];

  console.log("Processing jetton:", jetton);

  try {
    const { transactionLinker } = await tacSdk.sendCrossChainTransaction(
      evmProxyMsg,
      sender,
      jetton
    )

    
  
    console.log("Transaction successfully initiated!");
    console.log("Transaction Linker:", transactionLinker);
  
  
  } catch (error) {
    //log error 
    console.log("error ", error);
  }

}
const safeFunction = wrapFunction(performCrossChainTransaction);
safeFunction();