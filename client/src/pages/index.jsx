import Layout from "@/layout/Layout";
import Content from "@/components/Content";
import UserSupply from "@/components/UserSupply";
import GlobalSupply from "@/components/GlobalSupply";
import detectEthereumProvider from "@metamask/detect-provider";
import { ethers } from "ethers";
import { DinanceFactoryAddress, DinanceFactoryABI } from "@/utils/constant.js"
import { useState } from "react";
import { appDataState } from "@/context";

export default function Home() {
  const [metaMaskAccount, setMetaMaskAccount] = useState("");
  const [factoryContract, setFactoryContract]=useState("");
  const [signerr,setSignerr]=useState("")
  const [amount,setAmount]=useState(0)

  
  const connectWallet = async () => {
    try {
      const provider = await detectEthereumProvider();

      if (provider) {
        const account = await provider.request({
          method: "eth_requestAccounts",
        });
        const ethersProvider = new ethers.providers.Web3Provider(provider);
        const signer = ethersProvider.getSigner();
        setSignerr(signer)

        setMetaMaskAccount(account[0]);
        const DinanceFactoryContract = new ethers.Contract(DinanceFactoryAddress, DinanceFactoryABI, signer);
        setFactoryContract(DinanceFactoryContract)
        console.log(DinanceFactoryContract);
        console.log(account);
        console.log(signer);
      } else {
        alert("Please install metamask wallet!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const disConnectWallet = () => {
  //   setMetaMaskAccount("");
  // }


  console.log(metaMaskAccount);

  return (
    <appDataState.Provider value={{
      metaMaskAccount,
      factoryContract,
      connectWallet,
      setMetaMaskAccount,
      amount,
      setAmount,
      signerr
      }}>

    <Layout>
      <Content />
      <UserSupply />
      <GlobalSupply />
    </Layout>
    </appDataState.Provider>
  )
}