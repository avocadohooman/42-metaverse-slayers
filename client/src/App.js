import React, {useEffect, useState} from "react";
import './App.css';
import { ethers } from "ethers";
import SelectCharacter from "./Components/SelectCharacter/SelectCharacter";
import config from './config/config';

// Constants

const App = () => {


	const [currentAccount, setCurrentAccount] = useState('');
	/*
	* Right under current account, setup this new state property
	*/
	const [characterNFT, setCharacterNFT] = useState(null);
	const [defaultCharacters, setDefaultCharacters] = useState(null);

	// Render Methods
	const renderContent = () => {
		/*
			Render scenario #1: there is no current account
		*/
		if (!currentAccount) {
			return (
				<div className="connect-wallet-container">
				<img
					src="https://64.media.tumblr.com/tumblr_mbia5vdmRd1r1mkubo1_500.gifv"
					alt="Monty Python Gif"
				/>
				<button
					className="cta-button connect-wallet-button"
					onClick={connectWallet}
				>
					Connect Wallet To Get Started
				</button>
				</div>
			);
		/*
			Render scenario #2: there is an account, but no NFT character
		*/
	} else if (currentAccount && !characterNFT) {
		return (
			 <SelectCharacter setCharacterNFT={setCharacterNFT} defaultCharacters={defaultCharacters}/>
		);
	}
	};

	// Here we check if a wallet is connected
	const checkIfWalletIsConnected = async () => {
		try {
			const { ethereum } = window;
			if (!ethereum) {
				window.alert("Make sure you have MetaMask!");
				return ;
			}
			console.log("We have the ehtereum object", ethereum);
			const address = await ethereum.enable(); 
			console.log('address', address);
			const accounts = await ethereum.request({method: 'eth_accounts'});
			const chainId = await ethereum.request({ method: 'eth_chainId' });
			console.log("Connected to chain " + chainId);

			// String, hex code of the chainId of the Rinkebey, and localhost test network
			const rinkebyChainId = "0x4";
			const localhostChainId = "0x539";
			if (chainId !== rinkebyChainId && chainId !== localhostChainId) {
				alert("You are not connected to the Rinkeby Test Network, or localhost network!");
			}
			
			if (accounts.length > 0) {
				const account = accounts[0];
				console.log('found an authorized account: ', account);
				setCurrentAccount(account);
			} else {
				console.log('no authorized account found');
			}
		} catch (error) {
			console.error(error.message);
		}
	};

	/*
	* Implement your connectWallet method here
	*/
	const connectWallet = async () => {
		try {
			const { ethereum } = window;
			if (!ethereum) {
				window.alert("Make sure you have MetaMask!");
				return ;
			}
			const address = await ethereum.enable(); 
			console.log('address', address);
			const accounts = await ethereum.request({method: 'eth_accounts'});
			const chainId = await ethereum.request({ method: 'eth_chainId' });
			console.log("Connected to chain " + chainId);

			// String, hex code of the chainId of the Rinkebey, and localhost test network
			const rinkebyChainId = "0x4";
			const localhostChainId = "0x539";
			if (chainId !== rinkebyChainId && chainId !== localhostChainId) {
				alert("You are not connected to the Rinkeby Test Network, or localhost network!");
			}
			if (accounts.length > 0) {
				const account = accounts[0];
				console.log('found an authorized account: ', account);
				setCurrentAccount(account);
			} else {
				console.log('no authorized account found');
			} 
		} catch (error) {
			console.log(error);
		}
	}

	const getDefaultCharacters = async (gameContract) => {
		try {
			const txn = await gameContract.getAllDefaultCharacters();
			const defaultCharacters = [];
			txn.forEach(c => {
				const character = {
					index: c.characterIndex.toNumber(),
					name: c.name,
					imageURI: c.imageURI,
					hp: c.hp.toNumber(),
					maxHp: c.maxHp.toNumber(),
					darkMatter: c.darkMatter.toNumber(),
					maxDarkMatter: c.maxDarkMatter.toNumber(),
					attackDamage: c.attackDamage.toNumber(),
				}
				defaultCharacters.push(character);
			});
			console.log('defaultCharacters', defaultCharacters);
			setDefaultCharacters(defaultCharacters);	
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		checkIfWalletIsConnected();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// in this useffect we check whether the user has NFT characters stored in our contract
	useEffect(() => {
		const fetchNFTMetadata = async () => {
			console.log('Checking for Character NFT on address:', currentAccount);
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			const signer = provider.getSigner();
			const gameContract = new ethers.Contract(
				config.contractAddress,
				config.contractABI,
				signer,
			);
			const txn = await gameContract.checkIfUserHasNFT();
			if (txn.name) {
				console.log('user has NFT character: ', txn.name);
				const userCharacter = {
					name: txn.name,
					imageURI: txn.imageURI,
					hp: txn.hp.toNumber(),
					maxHp: txn.maxHp.toNumber(),
					attackDamage: txn.attackDamage.toNumber(),
				};
				setCharacterNFT(userCharacter);
			} else {
				console.log('No character NFT found. Getting default game characters...');
				getDefaultCharacters(gameContract);
			}
		}
		if (currentAccount) {
			console.log('CurrentAccount:', currentAccount);
			fetchNFTMetadata();
		}		
	}, [currentAccount]);

	return (
		<div className="App">
		<div className="container">
			<div className="header-container">
				<p className="header gradient-text">⚔️ Metaverse Slayer ⚔️</p>
				<p className="sub-text">Team up to protect the Metaverse!</p>
				{renderContent()}
			</div>
		</div>
		</div>
	);
};

export default App;
