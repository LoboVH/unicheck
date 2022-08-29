import "./connectwallet.scss";

import React, { useState, useContext, useEffect } from "react";
import { Web3Context } from "../../context/Web3Context";
import useConnect from "./useConnect";
import {
  useWalletModal,
} from "@solana/wallet-adapter-react-ui";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";

import metamaskLogo from "../../assets/svgs/metamask.svg";
import tronLinkLogo from "../../assets/svgs/tron-link.svg";
import phantomLogo from "../../assets/svgs/phantomLogo.svg";
import nearLogo from "../../assets/svgs/nearLogo.svg";
import coinbaseLogo from "../../assets/svgs/coinbase.svg";
import mewLogo from "../../assets/svgs/myetherwallet.svg";
import walletconnectLogo from "../../assets/svgs/walletconnect.svg";
import { useNavigate, useParams } from "react-router-dom";

import { WalletConnection } from "near-api-js";
import {
  connectNear,
  connToCoinbase,
  connToMetaMask,
  connToMew,
  connToSol,
  connToTron,
  connToWalletConnector,
} from "../../utils/utils";
import { walletLogin } from "../../services/api/supplier";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { ACCESS_TOKEN } from "../../utils/constants";
import { cookieDomain } from "../../config";

/*type Event = "connect" | "disconnect";

interface Phantom {
  on: (event: Event, callback: () => void) => void;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
}*/

type AuthType = Readonly<{
  wallet?: WalletConnection;
}>;

const ConnectWallet: React.FC<AuthType> = () => {

  const {wallet, connect, publicKey} = useWallet()
  const {setVisible} = useWalletModal()

  const navigate = useNavigate();

  let redirect = useParams();

  const getSolWallet=()=>{
    return wallet
  }

  //@ts-ignore
  /* const [phantom, setPhantom] = useState<Phantom | null>(null);*/

  /* const connectHandler = () => {
    
    if ("solana" in window) {
      setPhantom(window["solana"]);
      phantom?.connect();
    } else {
        alert!("Phantom wallet not found, Get Phantom wallet");
    }
    
  };*/

 

  const loginWallet = async (wallet) => {
    toast("Connecting to wallet...")
    try {
      let address;
      switch (wallet) {
        case "meta": {
          address = await connToMetaMask();
          break;
        }
        case "cb": {
          address = await connToCoinbase();

          break;
        }
        case "wc": {
          address = await connToWalletConnector();

          break;
        }
        case "mew": {
          address = await connToMew();

          break;
        }
        case "tron": {
          address = await connToTron();
          break;
        }
        case "sol": {
        
          address = await connToSol(publicKey, getSolWallet, connect, setVisible);

          break;
        }
        case "near": {
          address = await connectNear();
          break;
        }
      }
      console.log("sel address", address);

      if (address) {
        const res = await walletLogin(address);
        toast.success("Login successful");
        Cookies.set(ACCESS_TOKEN, res.data.accessToken, { domain:cookieDomain,
          expires: 30,
        });
        Cookies.set("userInfo", JSON.stringify(res.data.user), {
          domain: cookieDomain,
          expires: 30,
        });

        localStorage.setItem("userInfo", JSON.stringify(res.data.user));
        console.log(":redirect", redirect["*"]);

        navigate(`/${redirect["*"]}`, { replace: true });
        window.location.reload();
      } else {
        if (wallet != "near") {
          toast.error("Wallet connection failed");
        }
      }
    } catch (e) {
      toast.error(e.message);
      console.log(e);
      // disConnectWallet();
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const nearAccountId = urlParams.get("account_id");
    const nearPublicKey = urlParams.get("public_key");
    if (nearAccountId != null && nearPublicKey != null) {
      toast("Connection successful...")
      walletLogin(nearAccountId).then((res) => {
        toast.success("Login successful");
        Cookies.set(ACCESS_TOKEN, res.data.accessToken, {
          expires: 30,
        });
        Cookies.set("userInfo", JSON.stringify(res.data.user), {
          domain: cookieDomain,
          expires: 30,
        });

        localStorage.setItem("userInfo", JSON.stringify(res.data.user));
        console.log(":redirect", redirect["*"]);

        navigate(`/${redirect["*"]}`, { replace: true });
        window.location.reload();
      });
    } 
  }, []);

  return (
    <div className="connect-wallet-page">
      <div className="connect-wrapper">
        <div className="using-email">
          <div className="blue-head">Connect using Email</div>
          <button
            className="large-btn-outline"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
          <button
            className="large-btn-outline"
            onClick={() => navigate("/register")}
          >
            Register
          </button>
        </div>
        <div className="using-wallets">
          <div className="blue-head">Connect using Wallet</div>
          <div className="wallet-text">
            Connect with one of our available wallet providers or create a new
            one{" "}
          </div>
          <div className="wallets">
            <button onClick={() => loginWallet("meta")}>
              Metamask
              <img src={metamaskLogo} alt="metamask" />
            </button>
            <button onClick={() => loginWallet("tron")}>
              TronLink
              <img src={tronLinkLogo} alt="tronlink" />
            </button>
            <button onClick={() => loginWallet("sol")}>
              SolanaConnect
              <img src={phantomLogo} alt="Phantom" />
            </button>
            <button onClick={() => loginWallet("near")}>
              NearWallet
              <img src={nearLogo} alt="Near" />
            </button>
            <button onClick={() => loginWallet("cb")}>
              Coinbase
              <img src={coinbaseLogo} alt="metamask" />
            </button>
            <button onClick={() => loginWallet("wc")}>
              WalletConnect
              <img src={walletconnectLogo} alt="metamask" />
            </button>
            <button onClick={() => loginWallet("near")}>
              MEW
              <img src={mewLogo} alt="metamask" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectWallet;
