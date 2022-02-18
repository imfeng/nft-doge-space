const { create, } = require('ipfs-http-client');

const ipfs = create('https://ipfs.infura.io:5001');
// const ipfs = create('https://ipfs.infura.io:5001');

// we added two attributes, add as many as you want!
async function run() {
  try {
    // const ipfs = await IPFS.create();
    const files = [{
      path: '/',
      content: JSON.stringify({
        name: 'A Bored Ape On Testnet',
        attributes: [
          {
            trait_type: 'Bored',
            value: '100',
          },
          {
            trait_type: 'Leopard',
            value: '100',
          },
        ],
        // if you want to upload your own IPFS image, you can do so here:
        // https://github.com/ChainShot/IPFS-Upload
        // or you can use https://www.pinata.cloud/
        image: 'https://gateway.pinata.cloud/ipfs/QmYxT4LnK8sqLupjbS6eRvu1si7Ly2wFQAqFebxhWntcf6/',
        description: 'Tongue is out! Leopard is on!',
      }),
    }, ];
    console.log('??');
    const result = await ipfs.addAll([files, ]);
    console.log(result);
    return result;
  } catch (error) {
    console.warn(error);
  }
}

run().then(r => console.log(r));
