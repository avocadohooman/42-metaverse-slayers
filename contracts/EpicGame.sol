//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

// We first import some OpenZeppelin Contracts.
// NFT contract to inherit from.
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";

contract EpicGame is ERC721{
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
		uint maxDarkMatter;
		uint attackDamage;
	}

	// The tokenId is the NFTs unique identifier, it's just a number that goes
  	// 0, 1, 2, 3, etc.
	using Counters for Counters.Counter;
	Counters.Counter private _tokenIds;

	/*
		An array that holds the default data of our characters.
		This will be helpful when we mint new characters, and need to know
		the specific attributes like darkMatter, hp, ...
	*/
	CharacterAttributes[] defaultCharacters;

	// Here we create a mapping/hash table from the nft's tokenId -> that NFTs attributes
	mapping(uint256 => CharacterAttributes) public nftHolderAttributes;

	// A mapping/hash table from an address => the NFTs tokenId. Gives me an ez way
	// to store the owner of the NFT and reference it later.
	mapping(address => uint256) public nftHolders;

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
	) ERC721("SpaceHeroes", "SPACEONAUTS") {
        for(uint i = 0; i < characterNames.length; i++) {
			defaultCharacters.push(CharacterAttributes({
				characterIndex: i,
				name: characterNames[i],
				imageURI: characterImageURIs[i],
				hp: characterHp[i],
				maxHp: characterHp[i],
				darkMatter: characterDarkMatter[i],
				maxDarkMatter: characterDarkMatter[i],
				attackDamage: characterAttackingDmg[i]
			}));
			
			CharacterAttributes memory c = defaultCharacters[i];
			console.log("Done initializing %s img %s", c.name, c.imageURI);
			console.log("w/ HP %s and DM %s", c.hp, c.darkMatter);
		}
		// here we increment the tokenId so that the first NFT character starts with 1, instead of 0
		_tokenIds.increment();
    }

	/*
		External vs public:

		Public function require more gas than external. The difference is because in public functions, Solidity immediately 
		copies array arguments to memory, while external functions can read directly from calldata. Memory allocation 
		is expensive, whereas reading from calldata is cheap.

		For external functions, the compiler doesn't need to allow internal calls, and so it allows arguments to be 
		read directly from calldata, saving the copying step.

		As for best practices, you should use external if you expect that the function will only ever be called externally, 
		and use public if you need to call the function internally.
	*/
	function mintCharacterNFT(uint _characterIndex) external {
		// Get current tokenId (starts at 1 since we incremented in the constructor).
		uint256 newItemId = _tokenIds.current();

     	// Actually mint the NFT to the sender using msg.sender.
		_safeMint(msg.sender, newItemId);
		
		// We map the tokenId => their character attributes. More on this in
		// the lesson below.
		nftHolderAttributes[newItemId] = CharacterAttributes({
				characterIndex: _characterIndex,
				name: defaultCharacters[_characterIndex].name,
				imageURI: defaultCharacters[_characterIndex].imageURI,
				hp: defaultCharacters[_characterIndex].hp,
				maxHp: defaultCharacters[_characterIndex].maxHp,
				darkMatter: defaultCharacters[_characterIndex].darkMatter,
				maxDarkMatter: defaultCharacters[_characterIndex].maxDarkMatter,
				attackDamage: defaultCharacters[_characterIndex].attackDamage
		});
		console.log("Minted NFT w/ tokenId %s and characterIndex %s", newItemId, _characterIndex);

		// keep an easy way to see who owns that NFT
		nftHolders[msg.sender] = newItemId;

		_tokenIds.increment();
	}
}
