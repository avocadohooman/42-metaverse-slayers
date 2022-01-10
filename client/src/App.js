import React, {useEffect, useState} from "react";
import './App.css';
import { ethers } from "ethers";

// Constants

const App = () => {

	const [currentAccount, setCurrentAccount] = useState('');

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
			<div className="connect-wallet-container">
				<img
				src="https://64.media.tumblr.com/tumblr_mbia5vdmRd1r1mkubo1_500.gifv"
				alt="Monty Python Gif"
				/>
			</div>
			<button
              className="cta-button connect-wallet-button"
              onClick={connectWallet}
            >
              Connect Wallet To Get Started
            </button>
			</div>
		</div>
		</div>
	);
};

export default App;
