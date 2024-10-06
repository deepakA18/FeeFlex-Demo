import { useMemo } from 'react';
import { Connection } from '@solana/web3.js';


const useSolanaConnection = () => {
  const connection = useMemo(() => {
    const apiKey = process.env.NEXT_PUBLIC_HELIUS_API_KEY;
    if (!apiKey) {
      throw new Error('API Key is missing');
    }
    return new Connection(`https://mainnet.helius-rpc.com/?api-key=${apiKey}`);
  }, []);

  return connection;
};

export default useSolanaConnection;
