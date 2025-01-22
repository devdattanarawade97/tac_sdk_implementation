import { config } from "dotenv";

config();



import tac, { JettonWallet } from "tac-sdk";
const { TacSdk, Network, SenderFactory } = tac;
import { ethers } from "ethers";
//log env 

const mnemonic = process.env.MNEMONIC;
//log mnemonic

const DappProxyAddress = "0xBe01a0818cD4CCe1A1B2c4E47Da4F512B5e9FcE5";
const walletVersion = 'v4';

const tacSdk = new TacSdk({
  network: Network.Testnet,
  delay: 3,
});

const sender = await SenderFactory.getSender({
  version: walletVersion,
  mnemonic
});

console.log("Sender:", sender.getSenderAddress());
const abi = new ethers.AbiCoder();

async function performCrossChainTransaction() {
   
  //part 1
  // const evmProxyMsg = {
  //   evmTargetAddress: DappProxyAddress,
  //   methodName: "mintAndLockTokens(address user, uint256 amount)",
  //   encodedParameters: abi.encode(["address","uint256"], ["0xf71E2171F7Ec4Ff8D022025BC579AFFBDc2d2493",1]),
  // };
  //part 2 
  const evmProxyMsg = {
   
    evmTargetAddress: "0xe3ECDc63B560B17139844c6b5ed56fb41Bd98be2", // Directly send tokens to the user's EVM address
    methodName: "", // No function call needed
    encodedParameters: "0x", // No parameters needed
  };
  const jetton = [
    {
      address: "EQBvmYl-CFo6B00UI-UP1mkwYCxm0zzad9cbuEpw413OUOAc",
      amount: 1,
    }
  ];

  console.log("Processing jetton:", jetton);

  try {
    const { transactionLinker , transaction , transactionHash , transactionId , transactionStatus  } = await tacSdk.sendCrossChainTransaction(
      evmProxyMsg,
      sender,
      jetton
    )

    
  
    console.log("Transaction successfully initiated!");
    //log all transaction details
    
    console.log("Transaction Hash:", transactionHash);
    console.log("Transaction ID:", transactionId);
    console.log("Transaction Status:", transactionStatus);
    console.log("Transaction Linker:",await transactionLinker);
  
  
  } catch (error) {
    //log error 
    console.log("error ", error);
  }

}
performCrossChainTransaction();