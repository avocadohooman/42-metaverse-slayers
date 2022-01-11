import abi from '../utils/EpicGame.json';
import dotenv from 'dotenv';
dotenv.config();

const contractAddress = '0x82e82a6ff8e06d2cefcb72975dbf55d695f2879d';
const contractABI = abi.abi;

// eslint-disable-next-line import/no-anonymous-default-export
export default {
	contractAddress,
	contractABI,
}
