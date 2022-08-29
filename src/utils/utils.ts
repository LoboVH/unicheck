import Cookies from "js-cookie";
import { WalletConnection } from "near-api-js";
import { toast } from "react-toastify";
import TronWeb from "tronweb";
import Web3 from "web3";
import {
  tronChain,
  bscChain,
  ethChain,
  polygonChain,
  nearChain,
  UNICUS_STORE,
  solonaChain,
  cookieDomain,
} from "../config";
import { IStore } from "../models/Store";
import {
  auctionAbiB,
  auctionAddressB,
} from "../Redux/Blockchain/Binance/auction";
import {
  createNFTAbiB,
  createNFTAddressB,
} from "../Redux/Blockchain/Binance/createNFT";
import {
  marketPlaceAbiB,
  marketPlaceAddressB,
} from "../Redux/Blockchain/Binance/marketPlace";
import {
  ethereumCoinbase,
  getMetamaskProvider,
  walletConnectorProvider,
  walletLink,
} from "../Redux/Blockchain/contracts";
import {
  auctionAbiE,
  auctionAbiE1155,
  auctionAddressE,
  auctionAddressE1155,
} from "../Redux/Blockchain/Ethereum/auction";
import {
  createNFTAbiE,
  createNFTAbiE1155,
  createNFTAddressE,
  createNFTAddressE1155,
} from "../Redux/Blockchain/Ethereum/createNFT";
import {
  marketPlaceAbiE,
  marketPlaceAddressE,
  marketPlaceAddressE1155,
} from "../Redux/Blockchain/Ethereum/marketPlace";
import { MEWethereum } from "../Redux/Blockchain/mewConfig";
import {
  auctionAbiP,
  auctionAddressP,
} from "../Redux/Blockchain/Polygon/auction";
import {
  createNFTAbiP,
  createNFTAddressP,
} from "../Redux/Blockchain/Polygon/createNFT";
import {
  marketPlaceAbiP,
  marketPlaceAddressP,
} from "../Redux/Blockchain/Polygon/marketPlace";
import { addWalletAdd } from "../services/api/supplier";
import { ACCESS_TOKEN, RPC_URLS } from "./constants";
import { initContract, sendMeta } from "./helpers";
import * as nearAPI from "near-api-js";
import {
  createNFTAbiT,
  createNFTAddressT,
} from "../Redux/Blockchain/Tron/createNFT";
import {
  marketPlaceAbiT,
  marketPlaceAddressT,
} from "../Redux/Blockchain/Tron/marketplace";
import { auctionAbiT, auctionAddressT } from "../Redux/Blockchain/Tron/auction";
import { useNavigate } from "react-router-dom";
import {
  useWalletModal,
} from "@solana/wallet-adapter-react-ui";

import BN from "bn.js";

const {
  utils: {
    format: { parseNearAmount },
  },
} = nearAPI;
//testnet
const HttpProvider = TronWeb.providers.HttpProvider;
const fullNode = new HttpProvider("https://shasta.api.trongrid.io");
const solidityNode = new HttpProvider("https://shasta.api.trongrid.io");
const eventServer = new HttpProvider("https://shasta.api.trongrid.io");
const privateKey = "01";


export const userInfo: any = Cookies.get("userInfo")
  ? JSON.parse(Cookies.get("userInfo"))
  : "";

export const getUserInfo = () => {
  const userInfo: any = Cookies.get("userInfo")
    ? JSON.parse(Cookies.get("userInfo"))
    : "";
  return userInfo;
};
export let nearWalletConnection;

export let web3 = new Web3(Web3.givenProvider);

//@ts-ignore
export let tronWeb = window.tronWeb? window.tronWeb
  : new TronWeb({ fullNode, solidityNode, privateKey });

export const connectWallet = async (
  network: any,
  publicKey,
  wallet,
  connect,
  setVisible
) => {
  try {
    let address;
    if (network.toString() === nearChain) {
      if (nearWalletConnection && nearWalletConnection.account()) {
        address = nearWalletConnection.account().accountId;
      } else {
        address = await connectNear();
      }
    } else if (network.toString() === tronChain) {
      address = tronWeb.defaultAddress.base58;
    } else if (network.toString() === solonaChain) {
      address = await connToSol(publicKey, wallet, connect, setVisible);
    } else {
      console.log(3);
      //@ts-ignore
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      address = accounts[0];
      await SwitchNetwork(network);
    }
    if (!getUserInfo()) {
      toast.error("New Address. Please Login");
      window.location.href = "/login";
      return;
    }
    if (
      userInfo.wallets.length === 0 ||
      !userInfo.wallets.some((el) => {
        return el.toLowerCase() == address.toLowerCase();
      })
    ) {
      await addWalletAdd(address).then(async (res: any) => {
        console.log(res);
        Cookies.set("userInfo", JSON.stringify(res.data.user), {
          domain: cookieDomain,
          expires: 30,
        });
        localStorage.setItem("userInfo", JSON.stringify(res.data.user));
      });
    }

    return address;
  } catch (e) {
    console.log(e);
    toast.error(e.code);
  }
};

export const SwitchNetwork = async (network: any) => {
  try {
    const metaMaskProvider: any = await getMetamaskProvider();
    await metaMaskProvider.request({
      method: "wallet_switchEthereumChain",
      params: [
        {
          chainId: Web3.utils.toHex(network),
        },
      ],
    });
  } catch (error: any) {
    console.log("err", error);

    if (error?.code === 4902) {
      try {
        // await metaMaskProvider.request({
        //   method: "wallet_addEthereumChain",
        //   params:
        //     network === "ethereum"
        //       ? ethereum
        //       : network === "bnb"
        //       ? bnb
        //       : network === "polygon"
        //       ? polygon
        //       : null,
        // });
      } catch (addError: any) {
        console.error(addError?.message);
      }
    }
  }
};

// export const checkAndAddNetwork = (data: any) => async (dispatch: any) => {
//   try {
//     await metaMaskProvider.request({
//       method: "wallet_switchEthereumChain",
//       params: [{ chainId: data[0]?.chainId }],
//     });
//   } catch (error: any) {
//     console.log(error);
//     if (error?.code === 4902) {
//       try {
//         await metaMaskProvider.request({
//           method: "wallet_addEthereumChain",
//           params: data,
//         });
//       } catch (addError: any) {
//         console.error(addError?.message);
//       }
//     }
//   }
// };

export const connToMetaMask = async () => {
  try {
    const metaMaskProvider: any = await getMetamaskProvider();
    const accounts = await metaMaskProvider.request({
      method: "eth_requestAccounts",
    });
    web3 = new Web3(metaMaskProvider);
    localStorage.setItem("walletType", "Metamask");
    return accounts[0];
  } catch (error: any) {
    console.log(error);
  }
};

export const connToCoinbase = async () => {
  try {
    // dispatch(checkAndAddNetwork())
    const accounts = await ethereumCoinbase.enable();
    // coinbaseWeb3.eth.defaultAccount = accounts[0]
    web3 = new Web3(ethereumCoinbase);
    localStorage.setItem("walletType", "Coinbase");
    return accounts[0];
  } catch (error: any) {
    console.error(error?.message);
  }
};

export const connToWalletConnector = async () => {
  try {
    const accounts = await walletConnectorProvider.enable();
    web3 = new Web3(walletConnectorProvider);
    localStorage.setItem("walletType", "WalletConnect");
    return accounts[0];
  } catch (error: any) {
    console.error(error?.message);
  }
};

export const connToMew = async () => {
  try {
    const accounts = await MEWethereum.request({
      method: "eth_requestAccounts",
    });
    web3 = new Web3(MEWethereum);
    localStorage.setItem("walletType", "MEW");
    return accounts[0];
  } catch (error: any) {
    console.error(error?.message);
  }
};

export const connToTron = async () => {
  try {
    let i = 0;
    return new Promise(function (resolve) {
      var obj = setInterval(async () => {
        //@ts-ignore
        if (i === 50 || window.tronWeb && window.tronWeb.defaultAddress.base58) {
          clearInterval(obj);
          //@ts-ignore
          tronWeb = window.tronWeb;
          console.log(tronWeb.defaultAddress.base58);

          resolve(tronWeb.defaultAddress.base58);
        }
        i++
      }, 300);
    });
  } catch (error: any) {
    console.error(error?.message);
  }
};

export const connectNear = async () => {
  const { config, walletConnection } = await initContract();
  if (!walletConnection.isSignedIn()) {
    const res = await walletConnection.requestSignIn(
      {
        contractId: "nft.subauction.testnet",
      },
      "UNICUS", // title. Optional, by the way
      "", // successUrl. Optional, by the way
      "" // failureUrl. Optional, by the way
    );
  } else {
    console.log("near wallet", walletConnection.account());
    console.log("wallet is already connected");
    nearWalletConnection = walletConnection;
    return walletConnection.account().accountId;
  }

  sendMeta(walletConnection, config);

  nearWalletConnection = walletConnection;

  return walletConnection.account().accountId;
};

 export const connToSol = async (publicKey, getSolWallet, connect, setVisible) => {
   try {
     if (publicKey) {
       return publicKey.toBase58();
     }

     if (!getSolWallet()) {
       setVisible(true);
     } else {
       console.log("sol before", publicKey);
       const res = await connect();
       if (getSolWallet().adapter.publicKey) {
         return getSolWallet().adapter.publicKey.toBase58();
       } else {
         throw new Error("Connection refused");
       }
     }
   } catch (error) {
     console.log("Error connecting wallet:", error);
   }
 };

export const disConnectWallet = () => {
  localStorage.removeItem("walletType");
  localStorage.removeItem("userAddress");

  Cookies.remove(ACCESS_TOKEN, { domain:cookieDomain,
    expires: 30,
  });
  Cookies.remove("userInfo", {domain:cookieDomain,
    expires: 30,
  });
  // web3.currentProvider._handleDisconnect()
  walletConnectorProvider.disconnect();
  walletLink.disconnect();
};

export const getUserWallet = async (network) => {
  try {
    let accounts = [];
    if (network.toString() === tronChain) {
      //@ts-ignore
      const address = window.tronWeb.defaultAddress.base58;
      accounts.push(address);
    } else {
      accounts = await web3.eth.getAccounts();
    }
    return accounts;
  } catch (e) {
    console.log(e);
  }
};

export const getNftContractAddress = (nft) => {
  if (nft) {
    if (nft.contractAddress != undefined) {
      return nft.contractAddress;
    } else {
      return getCreateNftContractAddress(nft.chain, "721");
    }
  }
};
export const getChainSymbol = (chain) => {
  if (chain) {
    return chain.toString() === bscChain
      ? "BSC"
      : chain.toString() === polygonChain
      ? "MATIC"
      : chain.toString() === tronChain
      ? "TRX"
      : chain.toString() === nearChain
      ? "NEAR"
      : chain.toString() === solonaChain
      ? "SOL"
      : "ETH";
  }
};
export const getChainId = (chain) => {
  try {
    if (chain) {
      return chain.toString() === "ethereum"
        ? ethChain
        : chain.toString() === "binance"
        ? bscChain
        : chain.toString() === "polygon"
        ? polygonChain
        : chain.toString() === "near"
        ? nearChain
        : chain.toString() === "tron"
        ? tronChain
        : chain.toString() === "solona"
        ? solonaChain
        : 0;
    } else {
      return 0;
    }
  } catch (e) {
    console.log(e);
    return 0;
  }
};
export const selectNetwork = (chain: string) => {
  const type =
    chain.toString() === bscChain
      ? "Binance"
      : chain.toString() === ethChain
      ? "ETH"
      : chain.toString() === tronChain
      ? "TRX"
      : "Matic";
  SwitchNetwork(chain);
  toast(`Your are now on ${type} chain`, {
    className: "toast-custom",
  });
};

export const getCreateNftABI = (chain, contractType) => {
  switch (chain.toString()) {
    case ethChain:
      return contractType == "1155" ? createNFTAbiE1155 : createNFTAbiE;
    case bscChain:
      return createNFTAbiB;

    case polygonChain:
      return createNFTAbiP;
    case tronChain:
      return createNFTAbiT;
    default:
      return createNFTAbiE;
  }
};
export const getMarketplaceABI = (chain) => {
  switch (chain.toString()) {
    case ethChain:
      return marketPlaceAbiE;
    case bscChain:
      return marketPlaceAbiB;

    case polygonChain:
      return marketPlaceAbiP;
    case tronChain:
      return marketPlaceAbiT;
    default:
      return marketPlaceAbiE;
  }
};

export const getAuctionABI = (chain) => {
  switch (chain.toString()) {
    case ethChain:
      return auctionAbiE;
    case bscChain:
      return auctionAbiB;

    case polygonChain:
      return auctionAbiP;
    case tronChain:
      return auctionAbiT;
    default:
      return auctionAbiE;
  }
};
export const getCreateNftContractAddress = (chain, contractType) => {
  if (chain) {
    switch (chain.toString()) {
      case ethChain:
        return contractType == "1155"
          ? createNFTAddressE1155
          : createNFTAddressE;
      case bscChain:
        return createNFTAddressB;
      case polygonChain:
        return createNFTAddressP;
      case tronChain:
        return createNFTAddressT;
      case nearChain:
        return "nft.subauction.testnet";
      case solonaChain:
        return 
      default:
        return contractType == "721"
          ? createNFTAddressE
          : createNFTAddressE1155;
    }
  }
};

export const getMarketPlaceContractAddress = (chain, contractType = "721") => {
  switch (chain.toString()) {
    case ethChain:
      return contractType == "1155"
        ? marketPlaceAddressE1155
        : marketPlaceAddressE;
    case bscChain:
      return marketPlaceAddressB;
    case polygonChain:
      return marketPlaceAddressP;
    case tronChain:
      return marketPlaceAddressT;

    default:
      return contractType == "721"
        ? "0x424bb7731c056a52b45cbd613ef08c69c628735f"
        : "0x424bb7731c056a52b45CBD613Ef08c69c628735f";
  }
};
export const getAuctionContractAddress = (chain, contractType = "721") => {
  switch (chain.toString()) {
    case ethChain:
      return contractType == "1155" ? auctionAddressE1155 : auctionAddressE;
    case bscChain:
      return auctionAddressB;
    case polygonChain:
      return auctionAddressP;
    case tronChain:
      return auctionAddressT;

    default:
      return contractType == "1155" ? auctionAddressE1155 : auctionAddressE;
  }
};

export const getCreateNftContract = (chain, contractType = "721") => {
  if (chain.toString() == tronChain) {
    return tronWeb.contract(createNFTAbiT, createNFTAddressT);
  } else {
    return new web3.eth.Contract(
      //@ts-ignore
      getCreateNftABI(chain, contractType),
      getCreateNftContractAddress(chain, contractType)
    );
  }
};

export const getMarketPlace = (chain, contractType = "721") => {
  if (chain.toString() == tronChain) {
    return tronWeb.contract(marketPlaceAbiT, marketPlaceAddressT);
  } else {
    return new web3.eth.Contract(
      //@ts-ignore
      getMarketplaceABI(chain, contractType),
      getMarketPlaceContractAddress(chain, contractType)
    );
  }
};

export const getAuctionContract = (chain, contractType = "721") => {
  if (chain.toString() == tronChain) {
    return tronWeb.contract(auctionAbiT, auctionAddressT);
  } else {
    console.log("auc contract", getAuctionContractAddress(chain, contractType));

    return new web3.eth.Contract(
      //@ts-ignore
      getAuctionABI(chain, contractType),
      getAuctionContractAddress(chain, contractType)
    );
  }
};

//Near MarketPlace
export const offerPrice = async (token_id: string, assetBid: any) => {
  try {
    console.log("amount", parseNearAmount(assetBid.toString()));

    await nearWalletConnection.account().functionCall({
      contractId: "market_auct.subauction.testnet",
      methodName: "offer",
      args: {
        nft_contract_id: "nft.subauction.testnet",
        token_id,
      },
      attachedDeposit: parseNearAmount(assetBid.toString()),
      gas: new BN("200000000000000"),
    });
  } catch (e) {
    console.log(e);
  }
};

export const approveNFTForSale = async (token_id: string, assetPrice: any) => {
  console.log("approve near", assetPrice);

  let sale_conditions = {
    sale_conditions: parseNearAmount(assetPrice.toString()), // set asset price in ui
  };
  await nearWalletConnection.account().functionCall({
    contractId: "nft.subauction.testnet",
    methodName: "nft_approve",
    args: {
      token_id: token_id,
      account_id: "market_auct.subauction.testnet",
      msg: JSON.stringify(sale_conditions),
    },
    attachedDeposit: new BN(parseNearAmount("0.01")),
  });
};

export const removeSale = async (token_id) => {
  await nearWalletConnection.account().functionCall({
    contractId: "market_auct.subauction.testnet",
    methodName: "remove_sale",
    args: {
      nft_contract_id: "nft.subauction.testnet",
      token_id,
    },
    attachedDeposit: parseNearAmount("1"),
    gas: "200000000000000",
  });
};

//Near Auctions
export const approveNFTForAuction = async (
  token_id,
  assetPrice,
  startTime,
  endTime
) => {
  let sale_conditions = {
    sale_conditions: parseNearAmount(assetPrice.toString()), // set asset price in ui
  };
  await nearWalletConnection.account().functionCall({
    contractId: "nft.subauction.testnet",
    methodName: "approve_nft_auction",
    args: {
      auction_token: token_id,
      account_id: "market_auct.subauction.testnet",
      start_time: startTime, // Time in seconds (as type u64)
      end_time: endTime, // Time in seconds (as type u64)
      msg: JSON.stringify(sale_conditions),
    },
    attachedDeposit: parseNearAmount("0.01"),
  });
};
export const offerBid = async (token_id, assetBid) => {
  await nearWalletConnection.account().functionCall({
    contractId: "market_auct.subauction.testnet",
    methodName: "offer_bid",
    args: {
      nft_contract_id: "nft.subauction.testnet",
      token_id,
    },
    attachedDeposit: parseNearAmount(assetBid.toString()),
    gas: "200000000000000",
  });
};
//removes auction and refunds if there is any existing bid
export const removeAuction = async (token_id) => {
  await nearWalletConnection.account().functionCall({
    contractId: "market_auct.subauction.testnet",
    methodName: "remove_auction",
    args: {
      nft_contract_id: "nft.subauction.testnet",
      token_id,
    },
    attachedDeposit: "1",
    gas: "200000000000000",
  });
};

//remove the auction and resolve purchase
export const processPurchase = async (token_id) => {
  await nearWalletConnection.account().functionCall({
    contractId: "market_auct.subauction.testnet",
    methodName: "process_auction_purchase",
    args: {
      nft_contract_id: "nft.subauction.testnet",
      token_id,
    },
    attachedDeposit: 0,
    gas: "200000000000000",
  });
};

const getMinimumStorage = async () => {
  console.log("min");

  let minimum_balance = await nearWalletConnection
    .account()
    .viewFunction("market_auct.subauction.testnet", "storage_minimum_balance");
  console.log("minimum", minimum_balance);

  return minimum_balance;
};

export const sendStorageDeposit = async () => {
  const minimum = await getMinimumStorage();
  await nearWalletConnection.account().functionCall({
    contractId: "market_auct.subauction.testnet",
    methodName: "storage_deposit",
    args: {},

    attachedDeposit: minimum,
  });
};

export const getStoreName = () => {
  const store = JSON.parse(localStorage.getItem("store")) as IStore;
  if (store && store.general.storeName != "") {
    return store.general.storeName;
  } else {
    return "Unicus";
  }
};

export const isMainStore = () => {
  return window.location.host === UNICUS_STORE;
};
export interface WalletsPopupProps {
  show: boolean;
  handleClose: () => void;
}
export const METAMASK = "MetaMask";
export const TRONLINK = "TronLink";
