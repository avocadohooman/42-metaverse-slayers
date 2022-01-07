//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

// We first import some OpenZeppelin Contracts.
// OpenZeppelin implements for us the EIP-721 standard for us, so we don't need to do it
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";

contract EpicGame {

    constructor() {
        console.log("Deploying a EpicGame");
    }

}
