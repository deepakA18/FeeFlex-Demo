import { useState } from 'react';
import { getProgram } from '../utils/solana';
import { BN } from '@project-serum/anchor';

const useSwap = (wallet) => {
  const [transactionStatus, setTransactionStatus] = useState(null);

  const swapUSDCtoSOL = async (amountIn) => {
    try {
      const program = getProgram(wallet);
      const tx = await program.rpc.swap(new BN(amountIn), {
        accounts: {
          user: wallet.publicKey,
          // Replace with actual account public keys
          pool: 'PoolPubkey',
          userUsdcTokenAccount: 'UserUSDCAccountPubkey',
          userSolTokenAccount: 'UserSOLAccountPubkey',
        },
        signers: [wallet],
      });
      setTransactionStatus(`Transaction successful: ${tx}`);
    } catch (error) {
      setTransactionStatus(`Transaction failed: ${error.message}`);
    }
  };

  return { swapUSDCtoSOL, transactionStatus };
};

export default useSwap;
