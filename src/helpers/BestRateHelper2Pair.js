import Web3 from "web3";
const dexMainnet = require('./dexMainnet.json')

const Bestcontract = "0x5692B8f81142b0060BD15c305368c0392e2C6106";
const ABI = [{ "inputs": [{ "components": [{ "internalType": "string", "name": "name", "type": "string" }, { "internalType": "contract IRouter", "name": "router", "type": "address" }, { "internalType": "contract IFactory", "name": "factory", "type": "address" }], "internalType": "struct BestDexRate.Data[]", "name": "_param", "type": "tuple[]" }, { "internalType": "uint256", "name": "_amountIn", "type": "uint256" }, { "internalType": "address[]", "name": "inOutToken", "type": "address[]" }], "name": "getMaxAmount", "outputs": [{ "internalType": "uint256", "name": "maxAmount", "type": "uint256" }, { "internalType": "address", "name": "maxRouter", "type": "address" }, { "internalType": "string", "name": "name", "type": "string" }], "stateMutability": "view", "type": "function" }];

export const get2PathOutputAmount = async (_amountIn, _inToken, _outToken) => {
	let web3 = new Web3(new Web3.providers.HttpProvider("https://bsc-dataseed1.binance.org:443"));
	let contract = new web3.eth.Contract(ABI, Bestcontract);
	_inToken = web3.utils.toChecksumAddress(_inToken);
	_outToken = web3.utils.toChecksumAddress(_outToken);

	let param = dexMainnet;
	let path = ["0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
		"0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
		"0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c",
		"0x250632378e573c6be1ac2f97fcdf00515d0aa91b",
		"0x55d398326f99059fF775485246999027B3197955"]
	let maxAmt = 0;
	let address = null;
	let address2 = null;
	let type;
	let router1;
	let router2;
	let router3;
	let amountOut;
	try {
		amountOut = await contract.methods.getMaxAmount(param, _amountIn, [_inToken, _outToken]).call();
	} catch (error) {

	}
	if (maxAmt < amountOut.maxAmount) {
		type = "direct";
		maxAmt = amountOut.maxAmount;
		router1 = amountOut.name;
	}
	for (let i = 0; i < path.length; i++) {
		if (path[i].toLowerCase() !== _inToken.toLowerCase() && path[i].toLowerCase() !== _outToken.toLowerCase()) {
			try {
				let amountOut1 = await contract.methods.getMaxAmount(param, _amountIn, [_inToken, path[i]]).call();
				let amountOut2 = await contract.methods.getMaxAmount(param, amountOut1.maxAmount, [path[i], _outToken]).call();
				if (maxAmt < amountOut2.maxAmount) {
					address = path[i];
					type = `single`;
					maxAmt = amountOut2.maxAmount;
					router1 = amountOut1.name;
					router2 = amountOut2.name;
				}
				console.log(i, "amountOut2", amountOut2.maxAmount)
			} catch (error) {
				// console.log(error);
			}
			for (let j = 0; j < path.length; j++) {
				if (path[i].toLowerCase() !== _inToken.toLowerCase() && path[i].toLowerCase() !== path[j].toLowerCase() && path[j].toLowerCase() !== _outToken.toLowerCase()) {
					try {
						let amountOut1 = await contract.methods.getMaxAmount(param, _amountIn, [_inToken, path[i]]).call();
						let amountOut2 = await contract.methods.getMaxAmount(param, amountOut1.maxAmount, [path[i], path[j]]).call();
						let amountOut3 = await contract.methods.getMaxAmount(param, amountOut2.maxAmount, [path[j], _outToken]).call();

						if (maxAmt < amountOut3.maxAmount) {
							address = path[i];
							address2 = path[j];
							type = `Double ${i} & ${j}`;
							maxAmt = amountOut3.maxAmount;
							router1 = amountOut1.name;
							router2 = amountOut2.name;
							router3 = amountOut3.name;
						}
						console.log(i, "&", j, "amountOut3", amountOut3.maxAmount)
					} catch (error) {
						// console.log(error);
					}
				}

			}


		}
	}

	let obj2 = {
		amountOut: maxAmt,
		pathAddress: address,
		pathAddress2: address2,
		router1: router1,
		router2: router2,
		router3: router3,
		type: type
	}

	return obj2;

	// console.log("best",type," ",maxAmt, "",address, "router1", router1, "router2",router2);
	// return obj;
	// } catch (err) {
	// throw err;
	// console.log(err);
	// }
};
