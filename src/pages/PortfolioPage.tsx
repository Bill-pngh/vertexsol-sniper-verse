
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, Wallet, BarChart3 } from "lucide-react";

export default function PortfolioPage() {
  const [portfolio] = useState({
    totalValue: 0.00,
    dailyChange: 0.00,
    dailyChangePercent: 0.00,
    positions: [
      { symbol: "SOL", amount: 0.000, value: 0.00, change: 0.0 },
      { symbol: "BONK", amount: 0.000, value: 0.00, change: 0.0 },
      { symbol: "JUP", amount: 0.000, value: 0.00, change: 0.0 },
      { symbol: "WIF", amount: 0.000, value: 0.00, change: 0.0 },
    ]
  });

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-950 to-black"></div>
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
                         linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)`,
        backgroundSize: '24px 24px'
      }}></div>
      
      <div className="relative z-10 p-4 space-y-6">
        {/* Header */}
        <div className="border-b border-gray-800/50 pb-4">
          <h1 className="text-2xl font-bold text-white">Portfolio</h1>
          <p className="text-gray-400">Track your Solana investments</p>
        </div>
        
        {/* Portfolio Overview */}
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Wallet className="h-5 w-5" />
              Total Portfolio Value
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-white">
                ${portfolio.totalValue.toFixed(2)}
              </div>
              <div className={`flex items-center gap-1 text-sm ${
                portfolio.dailyChange >= 0 ? 'text-green-400' : 'text-red-400'
              }`}>
                {portfolio.dailyChange >= 0 ? 
                  <TrendingUp className="h-4 w-4" /> : 
                  <TrendingDown className="h-4 w-4" />
                }
                ${Math.abs(portfolio.dailyChange).toFixed(2)} 
                ({portfolio.dailyChangePercent.toFixed(2)}%)
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Positions */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Your Positions
          </h2>
          
          {portfolio.positions.map((position, index) => (
            <Card key={index} className="bg-gray-900/50 border-gray-800">
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-semibold text-white">{position.symbol}</div>
                    <div className="text-sm text-gray-400">
                      {position.amount.toFixed(3)} tokens
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-white">
                      ${position.value.toFixed(2)}
                    </div>
                    <div className={`text-sm ${
                      position.change >= 0 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {position.change.toFixed(1)}%
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button className="flex-1 bg-white text-black hover:bg-gray-200">
            Add Funds
          </Button>
          <Button variant="outline" className="flex-1 border-gray-700 text-white hover:bg-gray-800">
            Withdraw
          </Button>
        </div>
      </div>
    </div>
  );
}
