
import { useState } from "react";
import { GradientBackground } from "@/components/ui/gradient-background";
import { ChartContainer } from "@/components/ui/chart";
import { 
  Line, 
  LineChart, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis 
} from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Generate sample chart data
const generateChartData = (days: number) => {
  const data = [];
  const startPrice = 0.00000085;
  let currentPrice = startPrice;
  
  const now = new Date();
  for (let i = days; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    // Add some random price movement
    const change = (Math.random() - 0.5) * 0.00000005;
    currentPrice = Math.max(0.00000001, currentPrice + change);
    
    data.push({
      date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      price: currentPrice,
    });
  }
  
  return data;
};

const timeframeOptions = [
  { label: "1D", value: "1D", days: 1 },
  { label: "7D", value: "7D", days: 7 },
  { label: "30D", value: "30D", days: 30 },
  { label: "90D", value: "90D", days: 90 },
];

export default function ChartPage() {
  const [timeframe, setTimeframe] = useState("30D");
  const selectedTimeframe = timeframeOptions.find(option => option.value === timeframe);
  const chartData = generateChartData(selectedTimeframe?.days || 30);
  
  return (
    <GradientBackground>
      <div className="flex min-h-screen flex-col px-4 pb-20 pt-10">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold">$PEPE Chart</h1>
          <div className="flex items-center justify-center gap-2">
            <span className="text-lg font-semibold text-green-500">
              ${chartData[chartData.length - 1].price.toFixed(8)}
            </span>
            <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-600">
              +15.3%
            </span>
          </div>
        </div>
        
        <div className="mb-4 flex items-center justify-between">
          <div className="text-sm font-medium">Chart</div>
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-24">
              <SelectValue placeholder="Timeframe" />
            </SelectTrigger>
            <SelectContent>
              {timeframeOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="h-80 w-full rounded-xl border bg-background/50 p-4 backdrop-blur-sm">
          <ChartContainer config={{
            price: {
              theme: {
                light: "#22c55e",
                dark: "#22c55e",
              },
            },
          }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <XAxis 
                  dataKey="date" 
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  padding={{ left: 10, right: 10 }}
                />
                <YAxis 
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => value.toFixed(8)}
                  padding={{ top: 10, bottom: 10 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="price" 
                  stroke="var(--color-price)" 
                  strokeWidth={2}
                  dot={false}
                />
                <Tooltip 
                  formatter={(value: number) => [
                    `$${value.toFixed(8)}`,
                    "Price"
                  ]}
                  labelFormatter={(label) => `Date: ${label}`}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
        
        <div className="mt-6 rounded-xl border bg-background/50 p-4 backdrop-blur-sm">
          <h2 className="mb-2 font-medium">About $PEPE</h2>
          <p className="text-sm text-muted-foreground">
            $PEPE is a popular memecoin inspired by the Pepe the Frog character. 
            It gained significant traction in the cryptocurrency market as a community-driven token.
          </p>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-muted-foreground">Market Cap</p>
              <p className="font-medium">$420.69M</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">24h Volume</p>
              <p className="font-medium">$35.8M</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Holders</p>
              <p className="font-medium">125.3K</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Circulating Supply</p>
              <p className="font-medium">420.69T</p>
            </div>
          </div>
        </div>
      </div>
    </GradientBackground>
  );
}
