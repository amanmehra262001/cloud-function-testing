import type { NextPage } from "next";
import { useEffect, useState } from "react";
import axios from "axios";
import { useMoralis, useWeb3Contract } from "react-moralis";
import { tokenLockerAbi } from "../constants/tokenLocker";
import { nftABI } from "../constants/nft";

const Home: NextPage = () => {
  const { isWeb3Enabled, enableWeb3, isAuthenticated, authenticate, account } =
    useMoralis();
  axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL_DEV;
  useEffect(() => {
    if (!isAuthenticated) authenticate();
    console.log(account);
  }, [account]);
  const [walletEthNfts, setWalletEthNfts] = useState<any>();
  const [walletPolyNfts, setWalletPolyNfts] = useState<any>();
  const [params, setParams] = useState<any>();
  const [selectedNftAddress, setSelectedNftAddress] = useState("");
  const nftBridgeLocker = process.env.NEXT_PUBLIC_BRIDGE_SINGLE_TOKEN_LOCKER;

  const { runContractFunction: lockNft } = useWeb3Contract({
    abi: tokenLockerAbi,
    contractAddress: nftBridgeLocker,
    functionName: "lockNft",
    params: params,
  });
  const { runContractFunction: approveLocker } = useWeb3Contract({
    abi: nftABI,
    contractAddress: selectedNftAddress,
    functionName: "setApprovalForAll",
    params: {
      _operator: nftBridgeLocker,
      _approved: true,
    },
  });

  const handleApproveLocker = async (address: any, id: any) => {
    setSelectedNftAddress(address);
    setParams({
      _snft: address,
      _stokenId: id,
    });
    await approveLocker();
  };

  const handleBridgeNft = async () => {
    await lockNft();
  };

  const handleRunCloudFunctions = async () => {
    axios
      .get(
        `http://localhost:5001/neoverse-classic/us-central1/neoverse/bridgeUserNft`,
        {
          params: {
            ethAddress: account,
            snftAddress: params._snft,
            snftTokenId: params._stokenId,
          },
        }
      )
      .then((data) => {
        console.log(data.data);
        setWalletEthNfts(data.data.ethNfts);
        setWalletPolyNfts(data.data.polyNfts);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleClick = async () => {
    console.log("Clicked!");

    axios
      .get(
        `http://localhost:5001/neoverse-classic/us-central1/neoverse/getUserWalletNFTs`,
        {
          params: {
            ethAddress: account,
          },
        }
      )
      .then((data) => {
        console.log(data.data);
        setWalletEthNfts(data.data.ethNfts);
        setWalletPolyNfts(data.data.polyNfts);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <button onClick={handleClick}>Get all wallet nfts</button>
      <div style={{ marginTop: "30px" }}>GOERLI ETH NFTS</div>
      {walletEthNfts
        ? walletEthNfts.map((nft: any) => (
            <button
              onClick={() => handleApproveLocker(nft.tokenAddress, nft.tokenId)}
              style={{ width: "80%" }}
            >
              <div>{nft.tokenAddress}</div>
              <div>{nft.tokenId}</div>
              <div>{nft.tokenUri}</div>
            </button>
          ))
        : ""}
      <div style={{ marginTop: "30px" }}>POLYGON NFTS</div>
      {walletPolyNfts
        ? walletPolyNfts.map((nft: any) => (
            <button
              style={{ width: "80%", display: "block", marginBottom: "10px" }}
            >
              <div>{nft.tokenAddress}</div>
              <div>{nft.tokenId}</div>
              <div>{nft.tokenUri}</div>
            </button>
          ))
        : ""}
      <button style={{ marginTop: "50px" }} onClick={handleBridgeNft}>
        Bridge the Nft!
      </button>
      <button style={{ marginTop: "50px" }} onClick={handleRunCloudFunctions}>
        Run Cloud Functions!
      </button>
    </>
  );
};

export default Home;

// "Moralis Authentication

// Id: F4d7yaIPJIB6nFnk0VP9cVB1F6b1M85Gafbv4dLy:1661783244448"
