
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Shield, Wallet } from "lucide-react";
import { toast } from "sonner";
import { GradientBackground } from "@/components/ui/gradient-background";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";

type FormValues = {
  seedPhrase: string;
};

export default function ConnectWalletPage() {
  const [isProcessing, setIsProcessing] = useState(false);
  
  const form = useForm<FormValues>({
    defaultValues: {
      seedPhrase: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    setIsProcessing(true);
    
    // Simulate seed phrase validation
    const seedWords = data.seedPhrase.trim().split(/\s+/);
    if (seedWords.length !== 12 && seedWords.length !== 24) {
      form.setError("seedPhrase", { 
        type: "manual", 
        message: "Seed phrase must contain 12 or 24 words" 
      });
      setIsProcessing(false);
      return;
    }
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Wallet connected successfully");
      setIsProcessing(false);
      // In reality, you would securely send this to your backend
    }, 1500);
  };

  return (
    <GradientBackground>
      <div className="flex min-h-screen flex-col items-center justify-center px-4 pb-20 pt-10">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold">Connect Your Wallet</h1>
          <p className="text-muted-foreground">Enter your seed phrase to connect</p>
        </div>
        
        <div className="w-full max-w-md rounded-xl border bg-background/50 p-6 backdrop-blur-sm">
          <Alert className="mb-6 border-amber-200 bg-amber-50 text-amber-900">
            <Shield className="h-4 w-4" />
            <AlertDescription>
              <strong className="font-semibold">Warning:</strong> Never share your seed phrases with untrusted parties.
            </AlertDescription>
          </Alert>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="seedPhrase"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Seed Phrase</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Enter your 12 or 24 word seed phrase" 
                        className="min-h-[120px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      Words should be separated by spaces.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit" className="w-full gap-2" disabled={isProcessing}>
                {isProcessing ? (
                  <>Processing...</>
                ) : (
                  <>
                    <Wallet className="h-4 w-4" />
                    <span>Connect Wallet</span>
                  </>
                )}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </GradientBackground>
  );
}
