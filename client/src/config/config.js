import abi from '../utils/EpicGame.json';
import dotenv from 'dotenv';
dotenv.config();

const contractAddress = '0xC2710f2A4FB7fAB89657C863c2098Fa7FF7fde1F';
const contractABI = abi.abi;

// eslint-disable-next-line import/no-anonymous-default-export
export default {
	contractAddress,
	contractABI,
}
