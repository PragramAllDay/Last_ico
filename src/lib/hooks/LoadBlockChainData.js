import React, {useState, useEffect} from "react";
import { ethers } from "ethers";
import { useAccount, useDisconnect, useProvider, useSigner } from "wagmi";
import abi from "../../abi/abi.json";
import CONFIG from "../../abi/config.json";


export const BlockChainData = (setTotalCollectedAmount) => {
  const provider = useProvider();
  const loadData = async () => { 
    const contract = new ethers.Contract(
        CONFIG.ICO_CONTRACT_ADDRESS,
        abi,
        provider
    );
    const totalCollectedAmount = await contract.weiRaised();
    // console.log("totalCollectedAmount", ethers.utils.formatUnits(totalCollectedAmount, 6));
    setTotalCollectedAmount(ethers.utils.formatUnits(totalCollectedAmount, 6))
    return totalCollectedAmount;
  }
  useEffect(() => {
    loadData();
  }, []);
}