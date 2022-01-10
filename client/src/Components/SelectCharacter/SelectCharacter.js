import React, { useEffect, useState } from 'react';
import './SelectCharacter.css';

const SelectCharacter = ({ setCharacterNFT, defaultCharacters }) => {
	return (
		<div className="select-character-container">
			<h2>Mint Your Hero. Choose wisely.</h2>
			{defaultCharacters && defaultCharacters.map(c => {
				return (
					<div key={c.id}>
						<img src={c.imageURI} alt={c.name}/>
					</div>
				)
			})}
		</div>
	);
}

export default SelectCharacter;