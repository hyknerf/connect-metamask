import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [isHaveMetamask, setIsHaveMetamask] = useState(false);
  const [currAccount, setCurrAccount] = useState(null);

  const checkHaveMetamask = async () => {
    try {
      const { ethereum } = window as any;

      if (!ethereum) {
        console.log("don't have metamask");
        return;
      }

      setIsHaveMetamask(true);
      const accounts = await ethereum.request({
        method: "eth_accounts"
      });

      console.log("ethereum object found")

      if (accounts.length > 0) {
        setCurrAccount(accounts[0]);
        console.log("account object found")
      } else {
        console.log("account not found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const connectWallet = async () => {
    try {
      const { ethereum } = window as any;

      if (!ethereum) {
        console.log("don't have metamask");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts"
      });

      setCurrAccount(accounts[0]);
      console.log("connected with account:", currAccount);

    } catch (error) {
      console.log(error);
    }
  };

  const disconnectWallet = async () => {
    setCurrAccount(null);
  };

  useEffect(() => {
    checkHaveMetamask();
  }, []);

  return (
    <div>
      {
        isHaveMetamask
          ? <p>Have Metamask</p>
          : <p>Don't Have Metamask</p>
      }
      {
        currAccount
          ? <p>Connected with: {currAccount}</p>
          : <p>Please Connect Metamask</p>
      }

      {
        currAccount
          ? <button className='font-bold' onClick={disconnectWallet}>Disconnect</button>
          : <button className='font-bold' onClick={connectWallet}>Connect</button>
      }
    </div>
  );
};

export default App;
