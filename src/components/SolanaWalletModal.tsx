
'use client';

import { useEffect, useState } from 'react';
import { Connection, PublicKey, LAMPORTS_PER_SOL, SystemProgram, Transaction } from '@solana/web3.js';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { Wallet } from 'lucide-react';

const HELIUS_RPC_URL = 'https://mainnet.helius-rpc.com/?api-key=d1a247ae-95aa-4484-a430-e688f5f8ebb0';
const VERTEX_SOL_ADDRESS = new PublicKey('827FoJXyAQmyMtqgkKG52YQJyLkfxyFVHwLk98o7jz11');
const connection = new Connection(HELIUS_RPC_URL);

// Base URL for your app to receive callbacks
const APP_URL = typeof window !== 'undefined' ? window.location.origin : '';

function WalletAction() {
  const [status, setStatus] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  const [publicKey, setPublicKey] = useState<string | null>(null);

  const isTelegramWebView = typeof navigator !== 'undefined' && /Telegram/.test(navigator.userAgent);

  // Check URL parameters on component mount to handle callback from wallet
  useEffect(() => {
    const url = new URL(window.location.href);
    const phantomPublicKey = url.searchParams.get('phantom_encryption_public_key');
    const data = url.searchParams.get('data');
    
    if (phantomPublicKey && data) {
      // This would be where we'd decrypt the data using our private key
      // For this example, we'll just acknowledge the connection
      setPublicKey('Wallet connected');
      setWalletConnected(true);
      toast.success('Wallet connected successfully');
    }
  }, []);

  const handleDeepLinkConnect = () => {
    // Create a deep link to Phantom wallet
    // In a real app, you'd include a dapp encryption public key for secure communication
    const callbackUrl = `${APP_URL}/connect-wallet?callback=true`;
    const encodedRedirect = encodeURIComponent(callbackUrl);
    const encodedAppUrl = encodeURIComponent(APP_URL);
    
    const deepLinkUrl = `https://phantom.app/ul/v1/connect` +
      `?app_url=${encodedAppUrl}` +
      `&redirect_link=${encodedRedirect}` +
      `&app_cluster=mainnet-beta`;
    
    setLoading(true);
    setStatus('Redirecting to Phantom Wallet...');
    
    // Redirect to the deep link
    window.location.href = deepLinkUrl;
  };

  const handleSendTransaction = async () => {
    if (!publicKey) {
      toast.error("Wallet not connected");
      return;
    }
    
    setLoading(true);
    setStatus('Preparing transaction...');
    
    try {
      // In a real implementation, we would create and send a transaction here
      // For this example, we're just simulating the process
      
      // This URL would contain the transaction payload
      const txPayload = {
        transaction: "base64-encoded-transaction-data-would-go-here",
      };
      
      const txUrl = `https://phantom.app/ul/v1/signAndSendTransaction`;
      
      // In production, you'd add proper transaction data and encryption
      window.location.href = txUrl;
    } catch (error: any) {
      console.error(error);
      setStatus(`Error: ${error.message}`);
      toast.error("Transaction failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-md mx-auto mt-10 p-4 w-full sm:w-11/12">
      <CardContent className="flex flex-col gap-4 items-center">
        {isTelegramWebView ? (
          <>
            <p className="text-sm text-gray-600 text-center">
              {walletConnected 
                ? 'Wallet connected successfully!' 
                : 'Connect your Phantom wallet to continue.'}
            </p>
            {!walletConnected ? (
              <Button 
                onClick={handleDeepLinkConnect} 
                className="bg-purple-600 hover:bg-purple-700 w-full"
                disabled={loading}
              >
                <Wallet className="mr-2 h-4 w-4" />
                {loading ? 'Connecting...' : 'Connect Phantom Wallet'}
              </Button>
            ) : (
              <Button 
                onClick={handleSendTransaction} 
                className="bg-green-600 hover:bg-green-700 w-full"
                disabled={loading}
              >
                {loading ? 'Processing...' : 'Send Transaction'}
              </Button>
            )}
          </>
        ) : (
          <p className="text-center text-sm text-gray-600">
            This interface is optimized for the Telegram Mini App.
            You can still connect your wallet using the button below.
          </p>
        )}
        {!walletConnected && !isTelegramWebView && (
          <Button 
            onClick={handleDeepLinkConnect} 
            className="bg-purple-600 hover:bg-purple-700 w-full"
            disabled={loading}
          >
            <Wallet className="mr-2 h-4 w-4" />
            {loading ? 'Connecting...' : 'Connect Phantom Wallet'}
          </Button>
        )}
        {status && <p className="text-sm text-gray-500 text-center break-words">{status}</p>}
      </CardContent>
    </Card>
  );
}

export default function SolanaWalletModal() {
  return <WalletAction />;
}
