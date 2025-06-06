
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  Shield, 
  Zap, 
  Target, 
  BarChart3, 
  Settings,
  Wallet,
  Clock
} from "lucide-react";

export default function FeaturesPage() {
  const features = [
    {
      icon: TrendingUp,
      title: "Bundle Trading",
      description: "Execute multiple trades simultaneously with advanced bundling strategies for maximum efficiency.",
      benefits: ["Reduced gas fees", "Atomic execution", "MEV protection"]
    },
    {
      icon: Target,
      title: "Token Sniping",
      description: "Get first access to new token launches with our automated sniping system.",
      benefits: ["Millisecond execution", "Launch detection", "Auto-buying"]
    },
    {
      icon: Shield,
      title: "Risk Management",
      description: "Protect your capital with sophisticated risk management and stop-loss tools.",
      benefits: ["Auto stop-loss", "Position sizing", "Risk analytics"]
    },
    {
      icon: Zap,
      title: "Lightning Speed",
      description: "Ultra-low latency execution on the fastest blockchain with optimized routing.",
      benefits: ["Sub-second execution", "Best price routing", "Priority fees"]
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Deep market analysis and trading insights to optimize your strategies.",
      benefits: ["Real-time data", "Custom indicators", "Performance tracking"]
    },
    {
      icon: Settings,
      title: "Automation Tools",
      description: "Set up automated trading strategies and let our bots work for you.",
      benefits: ["Strategy builder", "24/7 monitoring", "Custom alerts"]
    }
  ];

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
        <div className="text-center py-8 border-b border-gray-800/50">
          <h1 className="text-3xl font-bold text-white mb-4">Advanced Trading Features</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Discover the powerful tools that give you an edge in Solana trading
          </p>
        </div>
        
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <Card key={index} className="bg-gray-900/50 border-gray-800 hover:bg-gray-900/70 transition-colors">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-3">
                  <feature.icon className="h-6 w-6" />
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-400">{feature.description}</p>
                <div className="space-y-2">
                  <div className="text-sm font-semibold text-white">Key Benefits:</div>
                  <ul className="space-y-1">
                    {feature.benefits.map((benefit, idx) => (
                      <li key={idx} className="text-sm text-gray-400 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Performance Stats */}
        <Card className="bg-gray-900/50 border-gray-800 max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-white text-center flex items-center justify-center gap-2">
              <Clock className="h-5 w-5" />
              Platform Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-white">0.2s</div>
                <div className="text-gray-400 text-sm">Avg Execution Time</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">99.9%</div>
                <div className="text-gray-400 text-sm">Success Rate</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">50ms</div>
                <div className="text-gray-400 text-sm">API Latency</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">24/7</div>
                <div className="text-gray-400 text-sm">Uptime</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* CTA */}
        <div className="text-center py-8">
          <Button className="bg-white text-black hover:bg-gray-200 px-8 py-3 text-lg">
            <Wallet className="mr-2 h-5 w-5" />
            Start Trading Now
          </Button>
        </div>
      </div>
    </div>
  );
}
