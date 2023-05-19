import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './Withdrawal.css';

const coins = {
  bitcoin: {
    name: 'Bitcoin',
    network: 'BTC',
  },
  usdt: {
    name: 'USDT',
    network: 'TRC20',
  },
  ethereum: {
    name: 'Ethereum',
    network: 'ETH',
  },
};

function Withdrawal() {
  const [user, setUser] = useState(null);
  const [coin, setCoin] = useState('bitcoin');
  const [amount, setAmount] = useState('');
  const [address, setAddress] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return unsubscribe;
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit the withdrawal request to the server here
    setAmount('');
    setAddress('');
    setSuccessMessage('Withdrawal request successfully submitted!');
  };

  const handleCoinChange = (event) => {
    setCoin(event.target.value);
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        {user ? (
          <div className="row">
            <div className="col-md-6 offset-md-3">
              <div className="wallet-card">
                <div className="wallet-heading">Withdrawal</div>
                <div className="wallet-body">
                  {successMessage ? (
                    <div className="alert alert-success" role="alert">
                      {successMessage}
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit}>
                      <div className="form-group">
                        <label htmlFor="coin">Coin</label>
                        <div className="coin-select">
                          <select
                            className="form-select"
                            id="coin"
                            value={coin}
                            onChange={handleCoinChange}
                            required
                          >
                            <option value="bitcoin">Bitcoin</option>
                            <option value="usdt">USDT</option>
                            <option value="ethereum">Ethereum</option>
                          </select>
                          <div className="coin-icon">
                            <i className={`fab fa-${coin}`} />
                          </div>
                        </div>
                      </div>
                      <div className="form-group">
                        <label htmlFor="amount">Amount ({coins[coin].name})</label>
                        <input
                          type="text"
                          className="form-control"
                          id="amount"
                          placeholder="Enter amount"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="address">Receiver's Address</label>
                        <input
                          type="text"
                          className="form-control"
                          id="address"
                          placeholder="Enter address"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="network">Network ({coins[coin].network})</label>
                        <input
                          type="text"
                          className="form-control"
                          id="network"
                          placeholder="Enter network"
                          value={coins[coin].network}
                          readOnly
                          required
                        />
                      </div>
                      <button type="submit" className="btn">
                        Withdraw Request
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="alert alert-warning" role="alert">
            Please login first to make a withdrawal.
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Withdrawal;
