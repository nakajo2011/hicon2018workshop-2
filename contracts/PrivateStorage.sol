pragma solidity ^0.4.24;


/**
 * @title PrivateStorage.
 * @dev The PrivateStorage contract is to provide personal storage.
 * This storage reference anyone, but only owner can modify.
 */
contract PrivateStorage {
  address public owner;
  uint storedData;
  uint[] public arrayStorage;

  modifier onlyOwner() {
    require(msg.sender == owner);
    _;
  }

  constructor() public {
    owner = msg.sender;
  }

  function set(uint x) onlyOwner public {
    storedData = x;
  }

  function get() public view returns (uint) {
    return storedData;
  }

  function heavyCostSet(uint copyValue) public {
    for(uint i=0; i<100; i++) {
      arrayStorage.push(copyValue);
    }
  }
}