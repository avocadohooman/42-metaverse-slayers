const testContract = async () => {
	const gameContractFactory = await hre.ethers.getContractFactory('EpicGame');
	const gameContract = await gameContractFactory.deploy(
		["Lucifer", "Solulu", "Melanios"],       // Names
		["https://i.imgur.com/pKd5Sdk.png", // Images
		"https://i.imgur.com/xVu4vFL.png", 
		"https://i.imgur.com/WMB6g9u.png"],
		[600, 400, 250],                    // HP values
		[130, 260, 400],					// Dark matter values
		[150, 200, 300]                       // Attack damage values
	);
	await gameContract.deployed();
	console.log('Contract deployed to:', gameContract.address);
}


const runTestContract = async () => {
	try {
		await testContract();
		process.exit(0);
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
}

runTestContract();
