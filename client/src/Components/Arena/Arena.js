import React, { useEffect, useState } from 'react';
import './Arena.css';
import { ethers } from "ethers";
import config from '../../config/config';

	/*
	* We pass in our characterNFT metadata so we can a cool card in our UI
	*/
	const Arena = ({ characterNFT }) => {
		// State
		const [gameContract, setGameContract] = useState(null);
	
		// UseEffects
		useEffect(() => {
		const { ethereum } = window;
	
		if (ethereum) {
			const provider = new ethers.providers.Web3Provider(ethereum);
			const signer = provider.getSigner();
			const gameContract = new ethers.Contract(
				config.contractAddress,
				config.contractAddress,
				signer
			);
	
			setGameContract(gameContract);
		} else {
			console.log('Ethereum object not found');
		}
		}, []);
	
		return (
		<div className="arena-container">
			{/* Boss */}
			<p>BOSS GOES HERE</p>
	
			{/* Character NFT */}
			<p>CHARACTER NFT GOES HERE</p>
		</div>
		);
};

export default Arena;