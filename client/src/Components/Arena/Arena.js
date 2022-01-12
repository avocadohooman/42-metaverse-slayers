import React, { useEffect, useState } from 'react';
import './Arena.css';
import { ethers } from "ethers";
import config from '../../config/config';
import characterService from '../../services/characterService';

/*
* We pass in our characterNFT metadata so we can a cool card in our UI
*/
const Arena = ({ characterNFT }) => {
	// State
	const [gameContract, setGameContract] = useState(null);
	const [boss, setBoss] = useState(null);

	// UseEffects
	useEffect(() => {
		const { ethereum } = window;

		if (ethereum) {
			const provider = new ethers.providers.Web3Provider(ethereum);
			const signer = provider.getSigner();
			const gameContract = new ethers.Contract(
				config.contractAddress,
				config.contractABI,
				signer
			);

			setGameContract(gameContract);
		} else {
			console.log('Ethereum object not found');
		}
	}, []);

	useEffect(() => {

		const fetchBoss = async () => {
			try {
				const bossTxn = await gameContract.getBigBoss();
				console.log('big boss bossTxn', bossTxn);
				const bossCharacter = characterService.transformCharacterData(bossTxn);
				setBoss(bossCharacter);
			} catch (error) {
				console.log(error);
			}
		}

		if (gameContract) {
			fetchBoss();
		}
	}, [gameContract])

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