import React, {useEffect, useState} from "react";
import './App.css';
import { ethers } from "ethers";
import SelectCharacter from "./Components/SelectCharacter/SelectCharacter";

// Constants

const App = () => {

	const [currentAccount, setCurrentAccount] = useState('');
	/*
	* Right under current account, setup this new state property
	*/
	const [characterNFT, setCharacterNFT] = useState(null);


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
					onClick={checkIfWalletIsConnected}
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
			 <SelectCharacter setCharacterNFT={setCharacterNFT} />
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

			// String, hex code of the chainId of the Rinkebey test network
			const rinkebyChainId = "0x4"; 
			if (chainId !== rinkebyChainId) {
				alert("You are not connected to the Rinkeby Test Network!");
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

			// String, hex code of the chainId of the Rinkebey test network
			const rinkebyChainId = "0x4"; 
			if (chainId !== rinkebyChainId) {
				alert("You are not connected to the Rinkeby Test Network!");
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
