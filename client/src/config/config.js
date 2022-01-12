import abi from '../utils/EpicGame.json';
import dotenv from 'dotenv';
dotenv.config();

const contractAddress = '0x496BBf5A77F963ecE4B4623B6550328Da4D5979F';
const contractABI = abi.abi;

// eslint-disable-next-line import/no-anonymous-default-export
export default {
	contractAddress,
	contractABI,
}
