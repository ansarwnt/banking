import Web3 from "web3";

const getWeb3 = async () => {
  if (window.ethereum) {
    const web3 = new Web3(window.ethereum);
    await window.ethereum.request({ method: "eth_requestAccounts" });
    return web3;
  } else {
    alert("Please install MetaMask!");
  }
};

export default getWeb3;
