
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BottomNav } from "@/components/layout/BottomNav";
import NotFound from "./pages/NotFound";
import HomePage from "./pages/HomePage";
import PortfolioPage from "./pages/PortfolioPage";
import ConnectWalletPage from "./pages/ConnectWalletPage";
import ChartPage from "./pages/ChartPage";
import BalancePage from "./pages/BalancePage";
import FeaturesPage from "./pages/FeaturesPage";
import { useState } from "react";

const App = () => {
  // Create a new QueryClient instance inside the component
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="pb-16">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/portfolio" element={<PortfolioPage />} />
              <Route path="/connect-wallet" element={<ConnectWalletPage />} />
              <Route path="/chart" element={<ChartPage />} />
              <Route path="/balance" element={<BalancePage />} />
              <Route path="/features" element={<FeaturesPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <BottomNav />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
