
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Wallet, TrendingUp, Shield, Zap } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-950 to-black"></div>
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
                         linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)`,
        backgroundSize: '24px 24px'
      }}></div>
      
      <div className="relative z-10 flex min-h-screen flex-col">
        {/* Header */}
        <header className="p-4 flex justify-between items-center border-b border-gray-800/50">
          <div className="text-xl font-bold text-white">
            VertexSol
          </div>
          <Link to="/connect-wallet">
            <Button className="bg-gray-800 hover:bg-gray-700 text-white border border-gray-700">
              <Wallet className="mr-2 h-4 w-4" />
              Connect Wallet
            </Button>
          </Link>
        </header>
        
        {/* Main content */}
        <div className="flex-1 flex flex-col items-center justify-center px-4 pb-20 pt-8">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <h1 className="text-5xl font-bold mb-4 text-white">
              Advanced Solana Trading
            </h1>
            
            <p className="text-lg text-gray-400 mb-8 leading-relaxed max-w-2xl mx-auto">
              Execute sophisticated trading strategies with institutional-grade tools.
              Bundle trades, manage risk, and maximize profits in the Solana ecosystem.
            </p>
            
            <Link to="/connect-wallet">
              <Button className="bg-white text-black hover:bg-gray-200 px-8 py-3 text-lg font-semibold">
                <Wallet className="mr-2 h-5 w-5" />
                Get Started
              </Button>
            </Link>
          </div>
          
          {/* Trading Videos Section */}
          <div className="w-full max-w-6xl mx-auto mb-16">
            <h2 className="text-2xl font-bold text-center mb-8 text-white">
              See Our Trading Tools in Action
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Lightning Fast Trade Execution Video */}
              <div className="bg-gray-900/50 border border-gray-800 rounded-lg overflow-hidden">
                <div className="relative aspect-square bg-gray-800">
                  <div style={{position:"relative", width:"100%", height:"0px", paddingBottom:"100.000%"}}>
                    <iframe 
                      allow="fullscreen" 
                      allowFullScreen 
                      height="100%" 
                      src="https://streamable.com/e/1w6mz7?nocontrols=1" 
                      width="100%" 
                      style={{border:"none", width:"100%", height:"100%", position:"absolute", left:"0px", top:"0px", overflow:"hidden"}}
                    />
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-semibold text-white mb-2">Lightning Fast Execution</h4>
                  <p className="text-gray-400 text-sm">
                    Execute multiple trades simultaneously with our advanced bundling technology
                  </p>
                </div>
              </div>
              
              {/* Precision Sniping Video */}
              <div className="bg-gray-900/50 border border-gray-800 rounded-lg overflow-hidden">
                <div className="relative aspect-square bg-gray-800">
                  <div style={{position:"relative", width:"100%", height:"0px", paddingBottom:"100.000%"}}>
                    <iframe 
                      allow="fullscreen" 
                      allowFullScreen 
                      height="100%" 
                      src="https://streamable.com/e/qaa8p1?nocontrols=1" 
                      width="100%" 
                      style={{border:"none", width:"100%", height:"100%", position:"absolute", left:"0px", top:"0px", overflow:"hidden"}}
                    />
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-semibold text-white mb-2">Precision Sniping</h4>
                  <p className="text-gray-400 text-sm">
                    Get first access to new token launches with our automated sniping system
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Features grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 text-center">
              <TrendingUp className="h-10 w-10 text-white mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2 text-white">Bundle Trading</h3>
              <p className="text-gray-400 text-sm">Execute multiple trades simultaneously with advanced bundling strategies.</p>
            </div>
            
            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 text-center">
              <Shield className="h-10 w-10 text-white mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2 text-white">Risk Management</h3>
              <p className="text-gray-400 text-sm">Protect your capital with sophisticated risk management tools.</p>
            </div>
            
            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 text-center">
              <Zap className="h-10 w-10 text-white mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2 text-white">Lightning Fast</h3>
              <p className="text-gray-400 text-sm">Ultra-low latency execution on the fastest blockchain.</p>
            </div>
          </div>
          
          {/* Stats section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
            <div>
              <div className="text-2xl font-bold text-white">$2.5B+</div>
              <div className="text-gray-400 text-sm">Volume Traded</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">150K+</div>
              <div className="text-gray-400 text-sm">Active Users</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">99.9%</div>
              <div className="text-gray-400 text-sm">Uptime</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">0.1%</div>
              <div className="text-gray-400 text-sm">Trading Fees</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
