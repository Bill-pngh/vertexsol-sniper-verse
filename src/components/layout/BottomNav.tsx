
import { Wallet, LineChart, BarChart3, Rocket } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const navItems = [
  {
    icon: BarChart3,
    label: "Portfolio",
    href: "/portfolio",
  },
  {
    icon: Wallet,
    label: "Connect Wallet",
    href: "/connect-wallet",
  },
  {
    icon: LineChart,
    label: "Chart",
    href: "/chart",
  },
  {
    icon: BarChart3,
    label: "Balance",
    href: "/balance",
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
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/80 backdrop-blur-md">
      <div className="flex h-16 items-center justify-around">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href;
          
          return (
            <Link 
              key={item.href} 
              to={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 px-3 text-xs", 
                isActive ? "text-primary" : "text-muted-foreground"
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
