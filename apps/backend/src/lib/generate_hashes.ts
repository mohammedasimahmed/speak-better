import customHasher from "./custom_hasher";

const generateHashes = (key: string, numHashes: number) : number[] => {
  const hashes = [];
  for (let i = 1; i <= numHashes; i++) {
    const seed = i;  // Different seed for each hash function
    const hashValue = customHasher(key, seed);
    hashes.push(hashValue);
  }
  return hashes;
};

export default generateHashes;