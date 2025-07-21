const customHasher = (key: string, seed = 0) : number => {
  let hash = seed ^ key.length;
  const prime = 31;

  for (let i = 0; i < key.length; i++) {
    // Simple bitwise operations to create a hash
    hash = (hash * prime) ^ key.charCodeAt(i);
  }

  // Final mixing of the hash value
  hash = (hash ^ (hash >>> 16)) * 0x45d9f3b;  // Another prime number for final mixing
  hash = hash ^ (hash >>> 16);

  return hash & 0xffffffff;  // Return a 32-bit hash
};

export default customHasher;