
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Shield, Wallet } from "lucide-react";
import { toast } from "sonner";
import { GradientBackground } from "@/components/ui/gradient-background";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { SolanaWalletConnection } from "@/components/SolanaWalletConnection";

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
    <GradientBackground>
      <div className="flex min-h-screen flex-col items-center justify-center px-4 pb-20 pt-10">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold">Connect Your Wallet</h1>
          <p className="text-muted-foreground">Choose your preferred wallet connection method</p>
        </div>
        
        <div className="w-full max-w-md rounded-xl border bg-background/50 p-6 backdrop-blur-sm">
          <Tabs defaultValue="manual" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="manual">Manual Seed Phrase</TabsTrigger>
              <TabsTrigger value="solana">Solana Wallet</TabsTrigger>
            </TabsList>
            
            <TabsContent value="manual">
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
                    name="label"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Label (Optional)</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Enter wallet name or label" 
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
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
            </TabsContent>
            
            <TabsContent value="solana">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center mb-4">
                    <h3 className="text-lg font-medium">Connect Solana Wallet</h3>
                    <p className="text-sm text-muted-foreground">Connect directly to your preferred Solana wallet</p>
                  </div>
                  <SolanaWalletConnection />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </GradientBackground>
  );
}
