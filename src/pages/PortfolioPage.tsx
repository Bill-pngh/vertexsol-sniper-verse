
import { Button } from "@/components/ui/button";
import { GradientBackground } from "@/components/ui/gradient-background";
import { BarChart3, Rocket } from "lucide-react";
import { Link } from "react-router-dom";

export default function PortfolioPage() {
  return (
    <GradientBackground>
      <div className="flex min-h-screen flex-col items-center justify-center px-4 pb-20 pt-10">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold">Portfolio</h1>
          <p className="text-muted-foreground">Track your tokens</p>
        </div>
        
        <div className="flex w-full max-w-md flex-col items-center justify-center gap-6 rounded-xl border bg-background/50 p-10 text-center backdrop-blur-sm">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
            <BarChart3 className="h-10 w-10 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-semibold">Your portfolio is empty</h2>
          <p className="text-muted-foreground">
            Snipe some tokens to build your portfolio
          </p>
          <Button asChild className="mt-4 gap-2">
            <Link to="/">
              <Rocket className="h-4 w-4" />
              <span>Snipe new tokens</span>
            </Link>
          </Button>
        </div>
      </div>
    </GradientBackground>
  );
}
