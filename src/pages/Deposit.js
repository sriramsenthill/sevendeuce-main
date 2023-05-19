import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Deposit.css";
import qrcodeUSDT from "../assets/qrcodeUSDT.png";
import qrcodeBitcoin from "../assets/qrcodeBitcoin.png";
import qrcodeETH from "../assets/qrcodeETH.png";
import bch from "../assets/bch.png";
import { auth, signInWithGoogle } from "../Firebase";

const coins = {
  bitcoin: {
    name: "Bitcoin",
    network: "BTC",
    address: "162HJ3fGmDscMqShTKJawp7dCQamdayES9",
    qrcode: qrcodeBitcoin,
  },
  usdt: {
    name: "USDT",
    network: "TRC20",
    address: "THE1ihAYMsqMXWBvai9WJgv6BBHHD6ggoh",
    qrcode: qrcodeUSDT,
  },
  ethereum: {
    name: "Ethereum",
    network: "ERC20",
    address: "0xc0951b7261cc7aaef122291284075682d32fbeb9",
    qrcode: qrcodeETH,
  },
  bitcoinCash: {
    name: "Bitcoin Cash",
    network: "BCH",
    address: "162HJ3fGmDscMqShTKJawp7dCQamdayES9",
    qrcode: bch,
  },
};

function Deposit() {
  const [user, setUser] = useState(null);
  const [selectedCoin, setSelectedCoin] = useState("bitcoin");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const { displayName, email, photoURL } = user;
        localStorage.setItem("name", displayName);
        localStorage.setItem("email", email);
        localStorage.setItem("profilePic", photoURL);
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return unsubscribe;
  }, []);

  const handleCoinChange = (event) => {
    setSelectedCoin(event.target.value);
  };

  return (
    <>
      <Navbar />
      <div className="deposit-container">
        {user ? (
          <>
            <h2>Deposit Crypto</h2>
            <p>Please select a cryptocurrency:</p>
            <select className="crypto-select" value={selectedCoin} onChange={handleCoinChange}>
              <option value="bitcoin">Bitcoin</option>
              <option value="usdt">USDT</option>
              <option value="ethereum">Ethereum</option>
              <option value="bitcoinCash">Bitcoin Cash</option>
            </select>
            <p>We accept {coins[selectedCoin].name}. Send {coins[selectedCoin].name} to the following address & network:</p>
            <div className="deposit-info">
              <label htmlFor="network">Network:</label>
              <input type="text" id="network" value={coins[selectedCoin].network} readOnly />
              <label htmlFor="address">Address:</label>
              <input type="text" id="address" value={coins[selectedCoin].address} readOnly />
              <button className="btn" onClick={() => navigator.clipboard.writeText(coins[selectedCoin].address)}>Copy</button>
            </div>
            <div className="qrcode">
              <img src={coins[selectedCoin].qrcode} alt="qrcode" />
            </div>
          </>
        ) : (
          <div className="login-message">
            <p>Please login first to Deposit</p>
            <button className="btn" onClick={signInWithGoogle}>Login with Google</button>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Deposit;
