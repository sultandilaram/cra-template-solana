import * as web3 from "@solana/web3.js";

export const buildLeaves = (data: { mint: web3.PublicKey }[]) => {
  const leaves: Array<Buffer> = [];
  for (let idx = 0; idx < data.length; ++idx) {
    const nft = data[idx];
    leaves.push(Buffer.from([...nft.mint.toBuffer()]));
  }

  return leaves;
};

export { default as MerkleTree } from "./MerkleTree";
