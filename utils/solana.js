import { Connection, PublicKey } from '@solana/web3.js';
import { Program, AnchorProvider } from '@project-serum/anchor';
import idl from '../idl/idl.json';  // Path to your IDL file

const getSolanaConnection = () => {
  const network = process.env.NEXT_PUBLIC_SOLANA_NETWORK;
  return new Connection(network, 'confirmed');
};

const getProvider = (wallet) => {
  const connection = getSolanaConnection();
  return new AnchorProvider(connection, wallet, { preflightCommitment: 'processed' });
};

const getProgram = (wallet) => {
  const provider = getProvider(wallet);
  const programID = new PublicKey(process.env.NEXT_PUBLIC_PROGRAM_ID);
  return new Program(idl, programID, provider);
};

export { getSolanaConnection, getProvider, getProgram };
