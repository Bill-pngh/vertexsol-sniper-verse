
import { GradientBackground } from "@/components/ui/gradient-background";
import { Button } from "@/components/ui/button";
import { Book, ChevronRight, Eye, Lock, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export default function FeaturesPage() {
  const features = [
    {
      title: "Monitor Top Holders Wallets",
      description: "Track the trades and movements of top token holders in real-time",
      icon: Eye,
      comingSoon: false,
    },
    {
      title: "Trade Training",
      description: "Learn trading strategies with our algorithm-driven training tool",
      icon: Book,
      comingSoon: true,
    },
    {
      title: "Automate Trading with AI",
      description: "Use advanced AI algorithms to automate your trading strategies and maximize profits",
      icon: Zap,
      comingSoon: true,
    },
  ];

  return (
    <GradientBackground>
      <div className="flex min-h-screen flex-col px-4 pb-20 pt-10">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold">Features</h1>
          <p className="text-muted-foreground">Advanced VertexSol functionalities</p>
        </div>

        <div className="grid gap-4">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={cn(
                "group relative overflow-hidden rounded-xl border bg-background/50 p-6 backdrop-blur-sm",
                feature.comingSoon && "opacity-80"
              )}
            >
              {feature.comingSoon && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/60 backdrop-blur-sm">
                  <div className="rounded-lg bg-background px-3 py-1 text-sm font-medium">Coming Soon</div>
                </div>
              )}
              
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              
              <h2 className="mb-2 text-lg font-medium">{feature.title}</h2>
              <p className="mb-4 text-sm text-muted-foreground">{feature.description}</p>
              
              <Button asChild variant="ghost" className="gap-1 pl-0 text-primary hover:bg-transparent hover:text-primary/90">
                <Link to="#">
                  Learn more
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          ))}
          
          <div className="mt-4 rounded-xl border bg-background/50 p-6 text-center backdrop-blur-sm">
            <Lock className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 font-medium">Connect Wallet to Access</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Connect your wallet to unlock all features
            </p>
            <Button asChild className="mt-4">
              <Link to="/connect-wallet">Connect Wallet</Link>
            </Button>
          </div>
        </div>
      </div>
    </GradientBackground>
  );
}
