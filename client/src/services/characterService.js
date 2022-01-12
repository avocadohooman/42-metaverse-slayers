const transformCharacterData = (characterTxn) => {
	const transformedCharacter = {
		index: characterTxn.characterIndex.toNumber(),
		name: characterTxn.name,
		imageURI: characterTxn.imageURI,
		hp: characterTxn.hp.toNumber(),
		maxHp: characterTxn.maxHp.toNumber(),
		darkMatter: characterTxn.darkMatter.toNumber(),
		maxDarkMatter: characterTxn.maxDarkMatter.toNumber(),
		attackDamage: characterTxn.attackDamage.toNumber(),
	}
	return transformedCharacter;
}

export default {
	transformCharacterData,
}