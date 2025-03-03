// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

contract SimpleBank {
    // Mapping to store the balance of each address
    mapping(address => uint) private balances;

    // Function to deposit Ether into the bank
    function deposit() public payable {
        require(msg.value > 0, "Deposit amount must be greater than zero");
        balances[msg.sender] += msg.value;
    }

    // Function to withdraw Ether from the bank
    function withdraw(uint _amount) public {
        require(_amount <= balances[msg.sender], "Insufficient balance");
        balances[msg.sender] -= _amount;
        payable(msg.sender).transfer(_amount);
    }

    // Function to check the balance of the caller
    function checkBalance() public view returns (uint) {
        return balances[msg.sender];
    }
}
