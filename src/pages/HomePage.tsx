
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Wallet, TrendingUp, Shield, Zap } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-black"></div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                         linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)`,
        backgroundSize: '20px 20px'
      }}></div>
      
      <div className="relative z-10 flex min-h-screen flex-col">
        {/* Header */}
        <header className="p-6 flex justify-between items-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            VertexSol
          </div>
          <Link to="/connect-wallet">
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0">
              <Wallet className="mr-2 h-4 w-4" />
              Connect Wallet
            </Button>
          </Link>
        </header>
        
        {/* Main content */}
        <div className="flex-1 flex flex-col items-center justify-center px-4 pb-20 pt-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Advanced Solana
              </span>
              <br />
              <span className="text-white">Trading Platform</span>
            </h1>
            
            <p className="text-xl text-gray-400 mb-8 leading-relaxed">
              Execute sophisticated trading strategies with institutional-grade tools.<br />
              Bundle trades, manage risk, and maximize profits in the Solana ecosystem.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link to="/connect-wallet">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 px-8 py-3 text-lg">
                  <Wallet className="mr-2 h-5 w-5" />
                  Get Started
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="border-gray-600 text-white hover:bg-gray-800 px-8 py-3 text-lg">
                View Documentation
              </Button>
            </div>
          </div>
          
          {/* Features grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-16">
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 text-center">
              <TrendingUp className="h-12 w-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Bundle Trading</h3>
              <p className="text-gray-400">Execute multiple trades simultaneously with advanced bundling strategies.</p>
            </div>
            
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 text-center">
              <Shield className="h-12 w-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Risk Management</h3>
              <p className="text-gray-400">Protect your capital with sophisticated risk management tools.</p>
            </div>
            
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 text-center">
              <Zap className="h-12 w-12 text-cyan-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
              <p className="text-gray-400">Ultra-low latency execution on the fastest blockchain.</p>
            </div>
          </div>
          
          {/* Stats section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mt-16 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-400">$2.5B+</div>
              <div className="text-gray-400">Volume Traded</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-400">150K+</div>
              <div className="text-gray-400">Active Users</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-cyan-400">99.9%</div>
              <div className="text-gray-400">Uptime</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-400">0.1%</div>
              <div className="text-gray-400">Trading Fees</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
