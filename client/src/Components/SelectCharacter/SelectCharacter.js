import React, { useEffect, useState } from 'react';
import './SelectCharacter.css';
import { ethers } from "ethers";
import config from '../../config/config';

const SelectCharacter = ({ setCharacterNFT, defaultCharacters }) => {
	const [isMinting, setIsMinting] = useState(false);

	const mintPlayerNFT = async ({index}) => {
		setIsMinting(true);
		try {
			const { ethereum } = window;

			if (ethereum) {
				const provider = new ethers.providers.Web3Provider(ethereum);
				const signer = provider.getSigner();
				const gameContract = new ethers.Contract(
					config.contractAddress,
					config.contractABI,
					signer,
				);
				console.log('gameContract', gameContract);
				console.log('character index', index);
			} else {
				window.alert("Ethereum object doesn't exist!");
			}
		} catch (error) {
			
		}
		setIsMinting(false);
	}

	return (
		<div className="select-character-container">
			<h2>Mint Your Hero. Choose wisely.</h2>
			<div className='character-grid .character-item'>
				{defaultCharacters && defaultCharacters.map((c, idx) => {
					console.log('c', c.index);
					return (
						<div key={idx} className='character-item img'>
							<div className='character-item .name-container'>
								<p>{c.name}</p>
							</div>
							<img src={c.imageURI} alt={c.name}/>
							<button
								className="cta-button connect-wallet-button"
								onClick={() => mintPlayerNFT(c.index)}
							>
								Select character
							</button>
						</div>
					)
				})}
			</div>

		</div>
	);
}

export default SelectCharacter;