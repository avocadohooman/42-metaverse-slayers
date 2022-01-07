const testContract = async () => {
	const gameContractFactory = await hre.ethers.getContractFactory('EpicGame');
	const gameContract = await gameContractFactory.deploy();
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
