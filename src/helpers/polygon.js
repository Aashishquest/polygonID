// const iden3 = require('iden3');
// // new key container
//   // new database
// const db = new iden3.Db();
// let keyContainer = new iden3.KeyContainer('localStorage');

//   // unlock the KeyContainer for the next 30 seconds
// let passphrase = 'pass';
// keyContainer.unlock(passphrase);

// // generate master seed
// const mnemonic = 'enjoy alter satoshi squirrel special spend crop link race rally two eye';
// keyContainer.setMasterSeed(mnemonic);

// // Also, master seed can be generated randomly if no mnemonic is specified
// // keyContainer.setMasterSeed();

// // functions above stores seed mnemonic into local storage
// // it can be retrieved through:
// const mnemonicDb = keyContainer.getMasterSeed();

// // Generate keys for first identity
// const keys = keyContainer.createKeys();

// /*
//   keys: [
//     '0xc7d89fe96acdb257b434bf580b8e6eb677d445a9',
//     '0x03c2e48632c87932663beff7a1f6deb692cc61b041262ae8f310203d0f5ff57833',
//     '0xf3c9f94e4eaffef676d4fd3b4fc2732044caea91',
//     '0xb07079bd6238fa845dc77bbce3ec2edf98ffe735'
//   ];
// */
// // Each time 'keyContainer.createKeys()' is called, a new set of keys for an identity is created

// // Retrieve key seed and its current derivation path
// const { keySeed, pathKey } = keyContainer.getKeySeed();

// // It should be noted that 'keys' are in form of ethereum addresses except
// // key[1] that is a pubic key in its compressed form
// const keyAddressOp = keys[0];
// const keyPublicOp = keys[1];
// const keyRecover = keys[2];
// const keyRevoke = keys[3];

// const db = new iden3.Db();
// const keyContainer = new iden3.KeyContainer('localStorage', db);
// const passphrase = 'pass';
// keyContainer.unlock(passphrase);

// // new relay
// const relay = new iden3.Relay('http://127.0.0.1:8000/api/unstable');
// const relayAddr = '0xe0fbce58cfaa72812103f003adce3f284fe5fc7c';
// const relay = new iden3.Relay(relayUrl);

// // create identity object with a set of keys
// const keyPath = 0;
// const id = new iden3.Id(keyPublicOp, keyRecover, keyRevoke, relay, relayAddr, '', undefined, keyPath);

// id.createID().then(res => {
//     console.log(res.idAddr);
//     console.log(res.proofClaim);
//   });
// // Return : - idAddr: Address identity identifier
// //          - proofOfClam: Structure of the claim emitted by the relay authorizing its key public operational
// idAddr = 0x7b471a1bdbd3b8ac98f3715507449f3a8e1f3b22;
// proofClaim = {
//   date: 1549531663,
//   leaf:'000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000003c2e48632c87932663beff7a1f6deb692cc61b041262ae8f310203d0f5ff50000000000000000000000000000000000007833000000000000000000000004',
//   proofs: [{
//     aux: {
//       era: 0,
//       idAddr: '0x7b471a1bdbd3b8ac98f3715507449f3a8e1f3b22',
//       version: 0
//     }
//     mtp0: '0000000000000000000000000000000000000000000000000000000000000000',
//     mtp1: '030000000000000000000000000000000000000000000000000000000000000028f8267fb21e8ce0cdd9888a6e532764eb8d52dd6c1e354157c78b7ea281ce801541a6b5aa9bf7d9be3d5cb0bcc7cacbca26242016a0feebfc19c90f2224baed',
//     root: '1d9d41171c4b621ff279e2acb84d8ab45612fef53e37225bdf67e8ad761c3922',
//   } , {
//     aux: null
//     mtp0: '0000000000000000000000000000000000000000000000000000000000000000',
//     mtp1: '0300000000000000000000000000000000000000000000000000000000000000182adc955c46e6629ac74027ded0c843c7c65e8c3c4f12f77add56500f9f402e25451237d9133b0f5c1386b7b822f382cb14c5fff612a913956ef5436fb6208a',
//     root: '083dbb7700313075a2b8fe34b0188ff44784e3dc60987ed9277b59fad48f8199',

//   }], 
//   signature:'440ec709297ecb6a7f7a200719c29d96025a893aef7318cebdcec401e3c8b3b711358f5a3c14394dc120b067ade86d7eca0c79be580d35934cc36dc246be6ec000',
// }

// // Create new key for this identity and bind it to a label
// const labelKey = 'test key'
// const loginKey = id.createKey(keyContainer, labelKey);
// console.log(loginKey);
// // Return : New key created
// loginKey = '0xaac4ed37a11e6a9170cb19a6e558913dc3efa6a7';

// // Retrieve all keys that have been created for this identity
// const keysIdentity = id.getKeys();
// console.log(keysIdentity);
// // Return : Object containing all the keys associated with the identity
// {
//   operationalPub:"0x03c2e48632c87932663beff7a1f6deb692cc61b041262ae8f310203d0f5ff57833",
//   recover:"0xf3c9f94e4eaffef676d4fd3b4fc2732044caea91",
//   revoke:"0xb07079bd6238fa845dc77bbce3ec2edf98ffe735",
//   test key:"0xaac4ed37a11e6a9170cb19a6e558913dc3efa6a7",
// }

// id.deployID().then(res => {
//     console.log(res.data);
//   });
//   // Return object: - idAddr: Address identity identifier
//   //                - tx: transaction identifier of the deploying identity smart contract on the blockchain

//   const name = 'testName';
// id.bindID(kc, name).then(bindRes => {
//   console.log(bindRes.data);
// });

// // Return object: - claimAssigName: hexadecimal representation of claim data
// //                - idAddr: ethereum addres to bind to the label
// //                - name: label binded to the ethereum address
// //                - proofClaimAssignName: full proof of existance of the claim issued by the name-resolved
// {
//     claimAssigName: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000007b471a1bdbd3b8ac98f3715507449f3a8e1f3b22008c8efcda9e563cf153563941b60fc5ac88336fc58d361eb0888686fadb99760000000000000000000000000000000000000000000000000000000000000003',
//     idAddr: '0x7b471a1bdbd3b8ac98f3715507449f3a8e1f3b22', 
//     name: 'testName',
//     proofClaimAssignName: {
//       date:1549532610,
//       leaf:'00000000000000000000000000000000000000000000000000000000000000000000000000000000000000007b471a1bdbd3b8ac98f3715507449f3a8e1f3b22008c8efcda9e563cf153563941b60fc5ac88336fc58d361eb0888686fadb99760000000000000000000000000000000000000000000000000000000000000003',
//       proofs:[{
//         aux: null,
//         mtp0:'0001000000000000000000000000000000000000000000000000000000000001083dbb7700313075a2b8fe34b0188ff44784e3dc60987ed9277b59fad48f8199',
//         mtp1:'03010000000000000000000000000000000000000000000000000000000000010fef40cc16896de64be5a0f827799555344fd3d9aade9b65d95ecfbcac3e5a73182adc955c46e6629ac74027ded0c843c7c65e8c3c4f12f77add56500f9f402e25451237d9133b0f5c1386b7b822f382cb14c5fff612a913956ef5436fb6208a',
//         root:'1b6feefde6e76c1e9d98d30fa0993a7a7b35f5b2580a757c9a57ee383dc50b96',
//       }],
//       signature:'1e6d15ef907000937577aa06437ee2a1230713be20ff09d7628ce4dc6c902c11274f34d4ae0f9e9fc2e67cf21abe5da7f11748fc243f4013faa42e53e9c81e3e01',
//     }
//   }

//   // generate new key from identity and add issue a claim to relay in order to authorize new key
// const keyLabel = 'testKey';
// const newKey = id.createKey(keyContainer, keyLabel, true);

// // send claim to relay signed by operational key in order to authorize a second key 'newKey'
// id.authorizeKSignSecp256k1(keyContainer, id.keyOperationalPub, loginKey)
//   .then((res) => {
//     console.error(res.data);
//   });

//   // Return object: - proofClaim: full proof of existence of the claim issued by the relay
// proofClaim = {
//     date: 1549534168,
//     leaf:'000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000aac4ed37a11e6a9170cb19a6e558913dc3ef000000000000000000000000000000000000a6a7000000000000000000000004',
//     proofs: [{
//       aux: {
//         era: 0,
//         idAddr: '0x7b471a1bdbd3b8ac98f3715507449f3a8e1f3b22',
//         version: 1
//       }
//       mtp0: '00010000000000000000000000000000000000000000000000000000000000011d9d41171c4b621ff279e2acb84d8ab45612fef53e37225bdf67e8ad761c3922',
//       mtp1: '03010000000000000000000000000000000000000000000000000000000000011d9d41171c4b621ff279e2acb84d8ab45612fef53e37225bdf67e8ad761c39221c8bdcd862752abf2dd32d16c9c3acfa20ea93cecc64d169c4550ca3e9bca20b1541a6b5aa9bf7d9be3d5cb0bcc7cacbca26242016a0feebfc19c90f2224baed',
//       root: '21c6e1a81851f4017139ae8ddfbd5e894376fdd14c73cecf2a81939bae78595b',
//     } , {
//       aux: null
//       mtp0: '0007000000000000000000000000000000000000000000000000000000000041083dbb7700313075a2b8fe34b0188ff44784e3dc60987ed9277b59fad48f81990fef40cc16896de64be5a0f827799555344fd3d9aade9b65d95ecfbcac3e5a73',
//       Mtp1: '0301000000000000000000000000000000000000000000000000000000000001081b6542453a651f2b0fea8b639a8823809f7fc032c051a644d1a8b559ba0322182adc955c46e6629ac74027ded0c843c7c65e8c3c4f12f77add56500f9f402e25451237d9133b0f5c1386b7b822f382cb14c5fff612a913956ef5436fb6208a',
//       root: '1560e7b6983491305c6522c4227b98fbf26753b6a7fcb97ffb0ef7d98b271e99',
  
//     }], 
//     signature:'3cedbb3d6eab5ce9a1f8bb436a080f7ec5ede3526fdcfa094fee33cbbd414d0c6d41a6650f4fdda27a66d51d87d18b4cae0adbd695ccdb152dae65a998ba61f101',
//   }
  