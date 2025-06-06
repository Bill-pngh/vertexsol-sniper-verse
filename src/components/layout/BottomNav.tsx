
import { Wallet, LineChart, BarChart3, Rocket, Home } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const navItems = [
  {
    icon: Home,
    label: "Home",
    href: "/",
  },
  {
    icon: BarChart3,
    label: "Portfolio",
    href: "/portfolio",
  },
  {
    icon: Wallet,
    label: "Wallet",
    href: "/connect-wallet",
  },
  {
    icon: LineChart,
    label: "Chart",
    href: "/chart",
  },
  {
    icon: Rocket,
    label: "Features",
    href: "/features",
  },
];

export function BottomNav() {
  const location = useLocation();
  
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-800 bg-black/80 backdrop-blur-md">
      <div className="flex h-16 items-center justify-around">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href;
          
          return (
            <Link 
              key={item.href} 
              to={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 px-3 text-xs transition-colors", 
                isActive ? "text-blue-400" : "text-gray-500 hover:text-gray-300"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
