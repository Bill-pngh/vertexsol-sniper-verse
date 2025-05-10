
import { GradientBackground } from "@/components/ui/gradient-background";
import { SnipeButton } from "@/components/snipe-button";

export default function HomePage() {
  return (
    <GradientBackground>
      <div className="flex min-h-screen flex-col items-center justify-center px-4 pb-20 pt-10">
        <div className="mb-10 text-center">
          <h1 className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-4xl font-extrabold text-transparent sm:text-5xl">
            VertexSol
          </h1>
          <p className="mt-2 text-muted-foreground">
            Solana Memecoin Bundle Trading
          </p>
        </div>
        
        <SnipeButton />
        
        <div className="mt-10 grid w-full max-w-md gap-4 rounded-xl border bg-background/50 p-6 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Hot Memecoins</span>
            <span className="text-xs text-muted-foreground">24h</span>
          </div>
          
          {['$PEPE', '$DOGE', '$SHIB', '$WIF', '$BONK'].map((coin, i) => (
            <div key={coin} className="flex items-center justify-between rounded-lg border border-border/50 bg-background/50 p-3">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                  {coin.charAt(1)}
                </div>
                <span className="font-medium">{coin}</span>
              </div>
              <span className={`text-sm ${i % 2 === 0 ? 'text-green-500' : 'text-red-500'}`}>
                {i % 2 === 0 ? '+' : '-'}{Math.random() * 20 + 1).toFixed(2)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </GradientBackground>
  );
}
