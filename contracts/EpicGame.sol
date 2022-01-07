//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

// We first import some OpenZeppelin Contracts.
// OpenZeppelin implements for us the EIP-721 standard for us, so we don't need to do it
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";

contract EpicGame {
	/*
		Here we create a struct, that holds the attributed of each character.
	*/
	struct CharacterAttributes {
		uint characterIndex;
		string name;
		string imageURI;
		uint hp;
		uint maxHp;
		uint darkMatter;
		uint maxdarkMatter;
		uint attackDamage;
	}

	/*
		An array that holds the default data of our characters.
		This will be helpful when we mint new characters, and need to know
		the specific attributes like darkMatter, hp, ...
	*/
	CharacterAttributes[] defaultCharakters;

	/*
  		Data passed in to the contract when it's first created initializing the characters.
  		We're going to actually pass these values in from run.js.
	*/
    constructor(
		string[] memory characterNames,
		string[] memory characterImageURIs,
		uint[] memory characterHp,
		uint[] memory characterDarkMatter,
		uint[] memory characterAttackingDmg
	) {
        for(uint i = 0; i < characterNames.length; i++) {
			defaultCharakters.push(CharacterAttributes({
				characterIndex: i,
				name: characterNames[i],
				imageURI: characterImageURIs[i],
				hp: characterHp[i],
				maxHp: characterHp[i],
				darkMatter: characterDarkMatter[i],
				maxdarkMatter: characterDarkMatter[i],
				attackDamage: characterAttackingDmg[i]
			}));
			
			CharacterAttributes memory c = defaultCharakters[i];
			console.log("Done initializing %s w/ HP %s, img %s", c.name, c.hp, c.imageURI);
		}
    }

}
