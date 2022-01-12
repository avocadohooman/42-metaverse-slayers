import React, { useEffect, useState } from 'react';
import './Arena.css';
import { ethers } from "ethers";
import config from '../../config/config';
import characterService from '../../services/characterService';

/*
* We pass in our characterNFT metadata so we can a cool card in our UI
*/
const Arena = ({ characterNFT, setCharacterNFT }) => {
	// State
	const [gameContract, setGameContract] = useState(null);
	const [boss, setBoss] = useState(null);
	const [isAttacking, setIsAttacking] = useState('');

	const runAttackAction = async () => {
		setIsAttacking('attacking');
		if (gameContract) {
			try {
				console.log('attacking boss...');
				const attackTxn = await gameContract.attackBoss();
				await attackTxn.wait();
				console.log('attackTxn', attackTxn);
				setIsAttacking('hit');
			} catch (error) {
				console.error('Error attacking boss:', error);
			}
		}
		setIsAttacking('');
	}

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
				console.log('bossCharacter', bossCharacter);
				setBoss(bossCharacter);
			} catch (error) {
				console.log(error);
			}
		}

		const onAttackComplete = async (newBossHp, newPlayerHp) => {
			const bossHp = newBossHp.toNumber();
			const playerHp = newPlayerHp.toNumber();

			console.log(`AttackComplete: Boss Hp: ${bossHp} Player Hp: ${playerHp}`);

			setBoss((prevState) => {
				return {...prevState, hp: bossHp};
			});
			setCharacterNFT((prevState) => {
				return {...prevState, hp: playerHp};
			});
		}
		if (gameContract) {
			fetchBoss();
			gameContract.on('AttackComplete', onAttackComplete);
		}
		return () => {
			if (gameContract) {
				gameContract.off('AttackComplete', onAttackComplete)
			}
		}
	}, [gameContract])

	return (
		<div className="arena-container">
			{/* Boss */}
			{boss && 
				<div className="boss-container">
					<div className={`boss-content ${isAttacking}`}>
						<h2>🔥 {boss.name} 🔥</h2>
						<div className="image-content">
						<img src={boss.imageURI} alt={`Boss ${boss.name}`} />
						<div className="health-bar">
							<progress value={boss.hp} max={boss.maxHp} />
							<p>{`${boss.hp} / ${boss.maxHp} HP`}</p>
						</div>
						</div>
					</div>
					<div className="attack-container">
						<button className="cta-button" onClick={runAttackAction}>
						{`💥 Attack ${boss.name}`}
						</button>
					</div>
				</div>
			}

			{/* Character NFT */}
			{characterNFT && (
				<div className="players-container">
					<div className="player-container">
					<h2>Your Character</h2>
					<div className="player">
						<div className="image-content">
						<h2>{characterNFT.name}</h2>
						<img
							src={characterNFT.imageURI}
							alt={`Character ${characterNFT.name}`}
						/>
						<div className="health-bar">
							<progress value={characterNFT.hp} max={characterNFT.maxHp} />
							<p>{`${characterNFT.hp} / ${characterNFT.maxHp} HP`}</p>
						</div>
						</div>
						<div className="stats">
						<h4>{`⚔️ Attack Damage: ${characterNFT.attackDamage}`}</h4>
						</div>
					</div>
					</div>
				</div>
   			)}
		</div>
	);
};

export default Arena;