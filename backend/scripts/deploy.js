const hre = require("hardhat");

async function main() {
    
    const Contract= await hre.ethers.getContractFactory("SimpleBank");
    const contract = await Contract.deploy();
    await contract.waitForDeployment();
    console.log("Counter deployed to:", await contract.getAddress());

}

main()