import React, { useCallback, useEffect, useState } from 'react';
import detectEthereumProvider from '@metamask/detect-provider';
import { StaticJsonRpcProvider, Web3Provider } from '@ethersproject/providers';
import { formatEther, parseEther } from '@ethersproject/units';
import { Contract } from '@ethersproject/contracts';
import data from './contract/contractData.json';

function App() {
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);

  const [accountAddress, setAccountAddress] = useState('');
  const [accountBalance, setAccountBalance] = useState('');

  const [contractAddress, setContractAddress] = useState('');
  const [contractBalance, setContractBalance] = useState('');

  const [value, setValue] = useState(null);
  const [newValue, setNewValue] = useState(null);

  const [address, setAddress] = useState('');
  const [ether, setEther] = useState(null);

  useEffect(() => {
    const init = async () => {
      const provider = await detectEthereumProvider();

      if (provider !== window.ethereum) {
        alert('Connect app to Metamask!');
      } else {
        const web3Provider = new Web3Provider(provider);

        const signer = await web3Provider.getSigner();

        const address = await signer.getAddress();
        const balance = await signer.getBalance();

        setAccountAddress(String(address));
        setAccountBalance(formatEther(String(balance)));

        const contractInstance = new Contract(data.address, data.abi, signer);
        setContract(contractInstance);
        setContractAddress(contractInstance.address);
      }
    };
    init();
  }, []);

  return (
    <>
      <div>
        <h2>Contract Address :</h2>
        <p>{contractAddress}</p>
        <h2>Contract Balance :</h2>
        <p></p>
      </div>
      <div>
        <h2>Account :</h2>
        <p>{accountAddress}</p>
        <h2>Account Balance :</h2>
        <p>{accountBalance} ETH</p>
      </div>
      <div>
        <h2>Value :</h2>
        <p>{value}</p>
      </div>
      <div>
        <h2>Set Value :</h2>
        <form>
          <label>Value :</label>
          <input type='number' onChange={(e) => setNewValue(e.target.value)} />
        </form>
      </div>
      <div>
        <h2>Send Ether :</h2>
        <form>
          <label>Address :</label>
          <input type='text' value={address} onChange={(e) => setAddress(e.target.value)} />
          <br />
          <br />
          <label>Ether :</label>
          <input type='number' onChange={(e) => setEther(e.target.value)} />
          <button>Send</button>
        </form>
      </div>
    </>
  );
}

export default App;
