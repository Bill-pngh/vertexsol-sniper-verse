
import { useState } from "react";
import { Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export function SnipeButton() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <Button 
        onClick={() => setIsDialogOpen(true)}
        className="relative h-20 w-60 gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-lg font-bold shadow-lg hover:from-indigo-600/90 hover:to-purple-600/90"
      >
        <Rocket className="h-5 w-5" />
        <span>Snipe new tokens</span>
        <span className="absolute -right-2 -top-2 flex h-6 w-6 animate-pulse items-center justify-center rounded-full bg-red-500 text-xs">
          New
        </span>
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className={cn(
          "border-none bg-gradient-to-br from-indigo-900/90 via-purple-900/90 to-pink-900/90 text-white shadow-xl"
        )}>
          <DialogHeader>
            <DialogTitle className="text-xl text-white">Connect Wallet Required</DialogTitle>
            <DialogDescription className="text-slate-300">
              This functionality is available after you connect your wallet.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 flex justify-center">
            <Button 
              variant="outline" 
              className="border-white/20 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
              onClick={() => setIsDialogOpen(false)}
            >
              Got it
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
