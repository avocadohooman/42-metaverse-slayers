# 42 Metaverse Slayers

My first NFT turn based game, where I write + deploy a smart contract to the ETH blockchain, and build a Web3 client app to interact with my contract.

The 42 Metaverse Slayer game allows players to choose, and mint, a unique character with whom they can fight, together with other players, the evil Vogons. 

[Click here](https://slayer-game.herokuapp.com/) to JOIN the fight.

Note: You will need a Meta Mask wallet and be connected to Rinkeby test network.

## Version 1.0 (release January 2022)

- Minting your own NFT from three characters
- Multiplayer support:
  - Highscore board of all players, ranked by the total damage dealt.
- 10% chance of critical hit
- 20% change that the Vogons miss the attack
- Meta Mask support
- Rinkeby test network support

## Local setup

```
git clone https://github.com/avocadohooman/42-metaverse-slayers.git
cd 42-metaverse-slayers
yarn install
cd client
yarn install
```

### Run local client

```
cd client
yarn run start
```

### Hardhat/Smart contract test

`
npx hardhat run scripts/run.js
`

### Run local blockhain enviroment

Establish local blockhain and keep it running:

`
npx hardhat node
`

Deploy smart contract on local network

`
npx hardhat run scripts/deploy.js --network localhost
`

## App Preview 

### Character selection page
![character_selection](./README_assets/character_selection.png?raw=true)
### Attacking Vogins
![attacking_vogons](./README_assets/attacking_nft_game.gif?raw=true)

