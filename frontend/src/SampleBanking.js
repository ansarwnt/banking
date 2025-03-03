 

import React, { useEffect, useState } from "react";
import getWeb3 from "./web3";
 
import Web3 from "web3";

const contractAddress = "0x37aCA713b6dBEdff830e2c4A819C7672d4325B23"; // Replace with actual address

const contractABI =   [
    {
      "inputs": [],
      "name": "checkBalance",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "deposit",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_amount",
          "type": "uint256"
        }
      ],
      "name": "withdraw",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]
function SampleBanking() {
  const [account, setAccount] = useState("");
  const [balance, setBalance] = useState(0);
  const [contractBalance, setContractBalance] = useState(0);
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [transferTo, setTransferTo] = useState("");
  const [transferAmount, setTransferAmount] = useState("");
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const init = async () => {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);

      const bankingContract = new web3.eth.Contract(contractABI, contractAddress);
      setContract(bankingContract);

      const userBalance = await web3.eth.getBalance(accounts[0]);
      setBalance(web3.utils.fromWei(userBalance, "ether"));

      const contractBal = await web3.eth.getBalance(contractAddress);
      setContractBalance(web3.utils.fromWei(contractBal, "ether"));
    };

    init();
  }, []);

  const deposit = async () => {
    if (contract && depositAmount) {
      await contract.methods.deposit().send({
        from: account,
        value: Web3.utils.toWei(depositAmount, "ether"),
      });
      alert("Deposit successful!");
    }
  };

  const withdraw = async () => {
    if (contract && withdrawAmount) {
      await contract.methods.withdraw(Web3.utils.toWei(withdrawAmount, "ether")).send({ from: account });
      alert("Withdraw successful!");
    }
  };

  const transfer = async () => {
    if (contract && transferTo && transferAmount) {
      await contract.methods.transfer(transferTo, Web3.utils.toWei(transferAmount, "ether")).send({ from: account });
      alert("Transfer successful!");
    }
  };

  return (
    <div style={{ fontFamily: "Arial", padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h1>Banking System</h1>
      <p>Contract Balance: {contractBalance} ETH</p>
      <p>Your Address: {account}</p>
      <p>Your Balance: {balance} ETH</p>

      <h3>Deposit Amount (ETH):</h3>
      <input type="text" value={depositAmount} onChange={(e) => setDepositAmount(e.target.value)} />
      <button style={{ background: "blue", color: "white", padding: "5px", marginLeft: "10px" }} onClick={deposit}>Deposit</button>

      <h3>Withdraw Amount (ETH):</h3>
      <input type="text" value={withdrawAmount} onChange={(e) => setWithdrawAmount(e.target.value)} />
      <button style={{ background: "red", color: "white", padding: "5px", marginLeft: "10px" }} onClick={withdraw}>Withdraw</button>

      <h3>Transfer To Address:</h3>
      <input type="text" value={transferTo} onChange={(e) => setTransferTo(e.target.value)} />

      <h3>Transfer Amount (ETH):</h3>
      <input type="text" value={transferAmount} onChange={(e) => setTransferAmount(e.target.value)} />
      <button style={{ background: "blue", color: "white", padding: "5px", marginLeft: "10px" }} onClick={transfer}>Transfer</button>
    </div>
  );
}

export default SampleBanking; 
