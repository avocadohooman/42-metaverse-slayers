import abi from '../utils/EpicGame.json';
import dotenv from 'dotenv';
dotenv.config();

const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
const contractABI = abi.abi;

// eslint-disable-next-line import/no-anonymous-default-export
export default {
	contractAddress,
	contractABI,
}
