
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { TrendingUp, TrendingDown, BarChart3, Clock, RefreshCw } from "lucide-react";

interface PriceData {
  time: string;
  price: number;
}

interface SolPriceInfo {
  current_price: number;
  price_change_percentage_24h: number;
  high_24h: number;
  low_24h: number;
  total_volume: number;
}

export default function ChartPage() {
  const [selectedToken] = useState("SOL");
  const [priceInfo, setPriceInfo] = useState<SolPriceInfo>({
    current_price: 0,
    price_change_percentage_24h: 0,
    high_24h: 0,
    low_24h: 0,
    total_volume: 0
  });
  const [chartData, setChartData] = useState<PriceData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<string>("");

  const fetchSolPrice = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd&include_24hr_change=true&include_24hr_vol=true&include_high_low_24h=true'
      );
      
      if (!response.ok) throw new Error('Failed to fetch price data');
      
      const data = await response.json();
      const solData = data.solana;
      
      setPriceInfo({
        current_price: solData.usd,
        price_change_percentage_24h: solData.usd_24h_change || 0,
        high_24h: solData.usd_24h_high,
        low_24h: solData.usd_24h_low,
        total_volume: solData.usd_24h_vol
      });

      // Generate chart data points for the last 24 hours
      const now = new Date();
      const newChartData: PriceData[] = [];
      
      for (let i = 23; i >= 0; i--) {
        const time = new Date(now.getTime() - i * 60 * 60 * 1000);
        const variation = (Math.random() - 0.5) * 10; // Random variation for demo
        const price = solData.usd + variation;
        
        newChartData.push({
          time: time.getHours().toString().padStart(2, '0') + ':00',
          price: Math.max(0, price)
        });
      }
      
      setChartData(newChartData);
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (error) {
      console.error('Error fetching SOL price:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSolPrice();
    
    // Update price every 30 seconds
    const interval = setInterval(fetchSolPrice, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const formatVolume = (volume: number) => {
    if (volume >= 1e9) return `$${(volume / 1e9).toFixed(1)}B`;
    if (volume >= 1e6) return `$${(volume / 1e6).toFixed(1)}M`;
    if (volume >= 1e3) return `$${(volume / 1e3).toFixed(1)}K`;
    return `$${volume.toFixed(0)}`;
  };

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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                <BarChart3 className="h-6 w-6" />
                Trading Charts
              </h1>
              <p className="text-gray-400">Real-time market data and analysis</p>
            </div>
            <Button 
              onClick={fetchSolPrice}
              disabled={isLoading}
              variant="outline" 
              size="sm"
              className="border-gray-700 text-white hover:bg-gray-800"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </div>
        
        {/* Token Info */}
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center justify-between">
              <span>{selectedToken}/USD</span>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-400">
                  {isLoading ? 'Updating...' : `Updated: ${lastUpdated}`}
                </span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-white">
                  ${priceInfo.current_price.toFixed(2)}
                </div>
                <div className={`flex items-center gap-1 text-sm ${
                  priceInfo.price_change_percentage_24h >= 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                  {priceInfo.price_change_percentage_24h >= 0 ? 
                    <TrendingUp className="h-4 w-4" /> : 
                    <TrendingDown className="h-4 w-4" />
                  }
                  {priceInfo.price_change_percentage_24h > 0 ? '+' : ''}{priceInfo.price_change_percentage_24h.toFixed(2)}% (24h)
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-400">Volume (24h)</div>
                <div className="text-lg font-semibold text-white">{formatVolume(priceInfo.total_volume)}</div>
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
              {chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis 
                      dataKey="time" 
                      stroke="#9CA3AF"
                      fontSize={12}
                    />
                    <YAxis 
                      stroke="#9CA3AF"
                      fontSize={12}
                      domain={['dataMin - 5', 'dataMax + 5']}
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
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-gray-400">Loading chart data...</div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        {/* Market Stats */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-gray-900/50 border-gray-800">
            <CardContent className="p-4">
              <div className="text-sm text-gray-400">24h High</div>
              <div className="text-lg font-semibold text-white">${priceInfo.high_24h.toFixed(2)}</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-900/50 border-gray-800">
            <CardContent className="p-4">
              <div className="text-sm text-gray-400">24h Low</div>
              <div className="text-lg font-semibold text-white">${priceInfo.low_24h.toFixed(2)}</div>
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
