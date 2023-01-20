import iden3 from "iden3";

export const getPolygonId = async () => {

    const db = new iden3.Db();
    console.log("db",db);
    let keyContainer = new iden3.KeyContainer('localStorage');
    console.log("keyContainer",keyContainer);

    let passphrase = 'pass';
    keyContainer.unlock(passphrase);


    const mnemonic = 'enjoy alter satoshi squirrel special spend crop link race rally two eye';
    keyContainer.setMasterSeed(mnemonic);

    const mnemonicDb = keyContainer.getMasterSeed();
    console.log("mnemonicDb",mnemonicDb);

    // Generate keys for first identity
    const keys = keyContainer.createKeys();
    console.log("keys",keys);


    const { keySeed, pathKey } = keyContainer.getKeySeed();
    console.log("keySeed",pathKey);

    // It should be noted that 'keys' are in form of ethereum addresses except
    // key[1] that is a pubic key in its compressed form
    const keyAddressOp = keys[0];
    const keyPublicOp = keys[1];
    const keyRecover = keys[2];
    const keyRevoke = keys[3];

    keyContainer.unlock(passphrase);

    // new relay
    const relay = new iden3.Relay('http://127.0.0.1:8000/api/unstable');
    const relayAddr = '0xe0fbce58cfaa72812103f003adce3f284fe5fc7c';
    // const relay = new iden3.Relay(relayUrl);
    console.log("relay",relay);

    // create identity object with a set of keys
    const keyPath = 0;
    const id = new iden3.Id(keyPublicOp, keyRecover, keyRevoke, relay, relayAddr, '', undefined, keyPath);
    console.log("id",id);

    id.createID().then(res => {
        console.log(res.idAddr);
        console.log(res.proofClaim);
    });

}