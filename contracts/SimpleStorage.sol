pragma solidity ^0.5.16;

contract SimpleStorage {
    uint constant number = 123;

    function get() public view returns (uint number) {
        return number;
    }
}