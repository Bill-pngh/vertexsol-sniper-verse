
import { cn } from "@/lib/utils";

interface GradientBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function GradientBackground({ 
  children, 
  className, 
  ...props 
}: GradientBackgroundProps) {
  return (
    <div 
      className={cn(
        "min-h-screen w-full bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20",
        className
      )} 
      {...props}
    >
      <div className="fixed inset-0 -z-10 h-full w-full">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        <div className="absolute inset-0 bg-background/40 backdrop-blur-[1px]"></div>
      </div>
      {children}
    </div>
  );
}
