
import { GradientBackground } from "@/components/ui/gradient-background";
import { Button } from "@/components/ui/button";
import { RefreshCw, Wallet } from "lucide-react";
import { Link } from "react-router-dom";

export default function BalancePage() {
  return (
    <GradientBackground>
      <div className="flex min-h-screen flex-col items-center justify-center px-4 pb-20 pt-10">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold">Your Balance</h1>
          <p className="text-muted-foreground">SOL balance in your wallet</p>
        </div>
        
        <div className="w-full max-w-md rounded-xl border bg-background/50 p-6 backdrop-blur-sm">
          <div className="flex justify-end">
            <Button variant="ghost" size="icon">
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="my-8 text-center">
            <h2 className="text-4xl font-bold">0.000 SOL</h2>
            <p className="mt-2 text-sm text-muted-foreground">≈ $0.00 USD</p>
          </div>
          
          <div className="mt-6 grid grid-cols-2 gap-3">
            <Button variant="outline" className="gap-2">
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.5 2C7.77614 2 8 2.22386 8 2.5L8 11.2929L11.1464 8.14645C11.3417 7.95118 11.6583 7.95118 11.8536 8.14645C12.0488 8.34171 12.0488 8.65829 11.8536 8.85355L7.85355 12.8536C7.75979 12.9473 7.63261 13 7.5 13C7.36739 13 7.24021 12.9473 7.14645 12.8536L3.14645 8.85355C2.95118 8.65829 2.95118 8.34171 3.14645 8.14645C3.34171 7.95118 3.65829 7.95118 3.85355 8.14645L7 11.2929L7 2.5C7 2.22386 7.22386 2 7.5 2Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
              </svg>
              <span>Receive</span>
            </Button>
            <Button variant="outline" className="gap-2">
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.5 2C7.77614 2 8 2.22386 8 2.5L8 11.2929L11.1464 8.14645C11.3417 7.95118 11.6583 7.95118 11.8536 8.14645C12.0488 8.34171 12.0488 8.65829 11.8536 8.85355L7.85355 12.8536C7.75979 12.9473 7.63261 13 7.5 13C7.36739 13 7.24021 12.9473 7.14645 12.8536L3.14645 8.85355C2.95118 8.65829 2.95118 8.34171 3.14645 8.14645C3.34171 7.95118 3.65829 7.95118 3.85355 8.14645L7 11.2929L7 2.5C7 2.22386 7.22386 2 7.5 2Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
              </svg>
              <span>Send</span>
            </Button>
          </div>
          
          <div className="mt-6 rounded-lg border border-dashed p-4 text-center">
            <p className="text-sm text-muted-foreground">
              Connect your wallet to view your balance
            </p>
            <Button asChild className="mt-4 w-full gap-2">
              <Link to="/connect-wallet">
                <Wallet className="h-4 w-4" />
                <span>Connect Wallet</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </GradientBackground>
  );
}
