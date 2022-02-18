import * as IPFS from 'ipfs-core';

const ipfs = await IPFS.create();
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
const result = await ipfs.addAll(files);
for await (const item of result) {
  console.log('item', item);
}
