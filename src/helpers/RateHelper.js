import Web3 from "web3";
const dexMainnet = require('./dexMainnet.json')

const Bestcontract = "0x5692B8f81142b0060BD15c305368c0392e2C6106";
const ABI = [{"inputs":[{"components":[{"internalType":"string","name":"name","type":"string"},{"internalType":"contract IRouter","name":"router","type":"address"},{"internalType":"contract IFactory","name":"factory","type":"address"}],"internalType":"struct BestDexRate.Data[]","name":"_param","type":"tuple[]"},{"internalType":"uint256","name":"_amountIn","type":"uint256"},{"internalType":"address[]","name":"inOutToken","type":"address[]"}],"name":"getMaxAmount","outputs":[{"internalType":"uint256","name":"maxAmount","type":"uint256"},{"internalType":"address","name":"maxRouter","type":"address"},{"internalType":"string","name":"name","type":"string"}],"stateMutability":"view","type":"function"}];

export const getOutputAmount = async (_amountIn, _inToken, _outToken) => {
  let web3 = new Web3(new Web3.providers.HttpProvider("https://bsc-dataseed1.binance.org:443"));
  let contract = new web3.eth.Contract(ABI,Bestcontract);
  _inToken = web3.utils.toChecksumAddress(_inToken);
  _outToken = web3.utils.toChecksumAddress(_outToken);
  
  let param = dexMainnet;
	// [["PancakeV2","0x10ED43C718714eb63d5aA57B78B54704E256024E","0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73"],["SwychRouter","0x2bf55d1596786f1ae8160e997d655dbe6d9bca7a","0x80f112CD8Ac529d6993090A0c9a04E01d495BfBf"],["SushiSwap","0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506","0xc35DADB65012eC5796536bD9864eD8773aBc74C4"],["ApeSwap","0xcF0feBd3f17CEf5b47b0cD257aCf6025c5BFf3b7","0x0841BD0B734E4F5853f0dD8d7Ea041c241fb0Da6"],["Biswap","0x3a6d8cA21D1CF76F653A67577FA0D27453350dD8","0x858E3312ed3A876947EA49d572A7C42DE08af7EE"],["MdexRouter","0x62c1A0d92B09D0912F7BB9c96C5ecdC7F2b87059","0x3CD1C46068dAEa5Ebb0d3f55F6915B10648062B8"],["PositionExchange","0xdef145C89EE38d8e86fD40A9af466038D8f0252f","0x2bB7EdCF50Fd3870CE64f9cf559b4893dA432655"],["BackerySwap","0xCDe540d7eAFE93aC5fE6233Bee57E1270D3E330F","0x01bF7C66c6BD861915CdaaE475042d3c4BaE16A7"],["BenSwapRouter","0xd07622f60543D1f744B6397C27Ac4a2e226d0943","0x4dC6048552e2DC6Eb1f82A783E859157d40FA193"],["CafeSwapRouter(V2)","0x933DAea3a5995Fb94b14A7696a5F3ffD7B1E385A","0x3e708FdbE3ADA63fc94F8F61811196f1302137AD"],["KnightSwap","0x05E61E0cDcD2170a76F9568a110CEe3AFdD6c46f","0xf0bc2E21a76513aa7CC2730C7A1D6deE0790751f"],["OniRouter","0x974A8959c52f6109C59d0A6D63D4eA4CC522DfA2","0xED13950fD0a2E10788E830e60CFA0D018125310e"],["NinjaRouter","0x008Ea4e222B932D29171fD0E79c7430Bca37454e","0x3C60E7647D1972eF56a81Fd618b65E6A3e6bF799"],["AnnexRouter","0xBa67BA73774dA585664661d22775dB9761418dC5","0x6100af6980d35FDb119BECE4969fF6b68DA6e4ea"],["DonkSwap","0xe779e189a865e880CCCeBC75bC353E38DE487030","0x04D6b20f805e2bd537DDe84482983AabF59536FF"],["CoXswap","0x6B4b93F17D7B6DfFdAC6a95BeC651FeC9A7EEa1d","0xF8E28C1A5d11bfdf8f9bF007FBfB2E36c206a156"]]
	try {
		let amountOut = await contract.methods.getMaxAmount(param,_amountIn, [_inToken, _outToken]).call();
		return amountOut;
	} catch (err) {
    throw err;
		// console.log(err);
	}
};
