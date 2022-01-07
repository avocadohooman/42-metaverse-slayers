const deployContract = async () => {
	const gameContractFactory = await hre.ethers.getContractFactory('EpicGame');
	const gameContract = await gameContractFactory.deploy(
		["Marvin", "Arthur Dent", "Zaphod Beeblebrox"],       // Names
		["https://i.imgur.com/bxYy4aX.jpeg", // Images
		"https://i.imgur.com/sr38N1u.jpeg", 
		"https://i.imgur.com/fC1NxWl.png"],
		[600, 400, 250],                    // HP values
		[130, 260, 400],					// Dark matter values
		[150, 200, 300]                       // Attack damage values
	);
	await gameContract.deployed();
	console.log('Contract deployed to:', gameContract.address);

	let txn;
	txn = await gameContract.mintCharacterNFT(0);
	await txn.wait();
	console.log("Minted NFT #1");
  
	txn = await gameContract.mintCharacterNFT(1);
	await txn.wait();
	console.log("Minted NFT #2");
  
	txn = await gameContract.mintCharacterNFT(2);
	await txn.wait();
	console.log("Minted NFT #3");
  
	txn = await gameContract.mintCharacterNFT(1);
	await txn.wait();
	console.log("Minted NFT #4");
  
	console.log("Done deploying and minting!");

}


const runDeployContract = async () => {
	try {
		await deployContract();
		process.exit(0);
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
}

runDeployContract();
