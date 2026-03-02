import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Truck, MapPin, Package, CheckCircle2 } from "lucide-react";

export function TrackOrderPage() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center py-20">
      <div className="container mx-auto px-4 max-w-xl text-center space-y-12">
        <div className="space-y-4">
          <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary mb-4 p-5 animate-pulse">
            <Truck className="h-full w-full" />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight">Track Your Order</h1>
          <p className="text-xl text-muted-foreground">
            Enter your details below to see where your goodies are.
          </p>
        </div>

        <Card className="text-left shadow-md">
          <CardContent className="pt-6 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="order-number">Order Number</Label>
              <Input id="order-number" placeholder="e.g. #WAMLY12345" className="h-12" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" placeholder="john@example.com" className="h-12" />
            </div>
            <Button size="lg" className="w-full h-12 text-lg">
              Track Shipment
            </Button>
          </CardContent>
        </Card>

        <div className="grid grid-cols-3 gap-4 pt-4">
            {[
                { label: "Ordered", icon: Package, done: true },
                { label: "Shipped", icon: Truck, done: false },
                { label: "Delivered", icon: CheckCircle2, done: false }
            ].map((step, i) => (
                <div key={i} className={`flex flex-col items-center gap-2 ${step.done ? 'text-primary' : 'text-muted-foreground'}`}>
                    <div className={`h-10 w-10 rounded-full border-2 flex items-center justify-center ${step.done ? 'border-primary bg-primary/10' : 'border-muted'}`}>
                        <step.icon className="h-5 w-5" />
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-wider">{step.label}</span>
                </div>
            ))}
        </div>

        <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
            <MapPin className="h-4 w-4" />
            Not sure where to find your order number? Check your confirmation email.
        </p>
      </div>
    </div>
  );
}
