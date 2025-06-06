
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { TrendingUp, TrendingDown, BarChart3, Clock } from "lucide-react";

// Mock data for the chart
const mockData = [
  { time: '00:00', price: 45.2 },
  { time: '04:00', price: 46.1 },
  { time: '08:00', price: 47.8 },
  { time: '12:00', price: 48.5 },
  { time: '16:00', price: 49.2 },
  { time: '20:00', price: 48.9 },
  { time: '24:00', price: 50.1 },
];

export default function ChartPage() {
  const [selectedToken] = useState("SOL");
  const [currentPrice] = useState(50.12);
  const [priceChange] = useState(2.3);

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
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <BarChart3 className="h-6 w-6" />
            Trading Charts
          </h1>
          <p className="text-gray-400">Real-time market data and analysis</p>
        </div>
        
        {/* Token Info */}
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center justify-between">
              <span>{selectedToken}/USD</span>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-400">Live</span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-white">
                  ${currentPrice.toFixed(2)}
                </div>
                <div className={`flex items-center gap-1 text-sm ${
                  priceChange >= 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                  {priceChange >= 0 ? 
                    <TrendingUp className="h-4 w-4" /> : 
                    <TrendingDown className="h-4 w-4" />
                  }
                  {priceChange > 0 ? '+' : ''}{priceChange}% (24h)
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-400">Volume (24h)</div>
                <div className="text-lg font-semibold text-white">$125.2M</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Chart */}
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Price Chart (24h)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis 
                    dataKey="time" 
                    stroke="#9CA3AF"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="#9CA3AF"
                    fontSize={12}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="price" 
                    stroke="#ffffff" 
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Market Stats */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-gray-900/50 border-gray-800">
            <CardContent className="p-4">
              <div className="text-sm text-gray-400">24h High</div>
              <div className="text-lg font-semibold text-white">$52.45</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-900/50 border-gray-800">
            <CardContent className="p-4">
              <div className="text-sm text-gray-400">24h Low</div>
              <div className="text-lg font-semibold text-white">$47.12</div>
            </CardContent>
          </Card>
        </div>
        
        {/* Trading Actions */}
        <div className="flex gap-4">
          <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white">
            Buy {selectedToken}
          </Button>
          <Button className="flex-1 bg-red-600 hover:bg-red-700 text-white">
            Sell {selectedToken}
          </Button>
        </div>
      </div>
    </div>
  );
}
