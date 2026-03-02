import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { RotateCcw, Package, HelpCircle, ShieldCheck } from "lucide-react";

export function ReturnsPage() {
  return (
    <div className="container mx-auto px-4 py-20 max-w-4xl">
      <div className="space-y-12">
        <header className="space-y-4">
          <Badge className="px-3" variant="destructive">
            Hassle-Free
          </Badge>
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-6xl">
            Return Policy
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            We want you to be 100% satisfied with your purchase. If it's not
            quite right, you have 30 days to start a return or exchange.
          </p>
        </header>

        <section className="grid sm:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4">
                <RotateCcw className="h-5 w-5" />
              </div>
              <CardTitle className="text-xl">Standard Returns</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Return within 30 days of purchase for a full refund. Items must
                be in their original condition.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <CardTitle className="text-xl">Wamly Guarantee</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Faulty or damaged items are fully covered. We'll send a
                replacement at no extra cost.
              </p>
            </CardContent>
          </Card>
        </section>

        <Card className="bg-muted/30 border-dashed border-2">
          <CardHeader>
            <CardTitle className="text-2xl">How to start a return?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="shrink-0 h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                  1
                </div>
                <p className="pt-1">
                  Gather your{" "}
                  <span className="font-semibold">Order Number</span> and the
                  email you used to purchase.
                </p>
              </div>
              <div className="flex gap-4">
                <div className="shrink-0 h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                  2
                </div>
                <p className="pt-1">
                  Click the button below to go to our Return Portal and select
                  the items to return.
                </p>
              </div>
              <div className="flex gap-4">
                <div className="shrink-0 h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                  3
                </div>
                <p className="pt-1">
                  Print the label and drop off the package at any authorized
                  carrier location.
                </p>
              </div>
            </div>
            <div className="pt-6 flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="px-8">
                Start My Return
              </Button>
              <Button size="lg" variant="outline">
                <HelpCircle className="mr-2 h-4 w-4" />
                Contact Support
              </Button>
            </div>
          </CardContent>
        </Card>

        <section className="space-y-4 pt-10 text-center flex flex-col items-center">
          <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center mb-2">
            <Package className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-bold">Exchanges</h3>
          <p className="text-muted-foreground max-w-md mx-auto text-sm">
            Looking for a different size or color? Start a return and select
            "Exchange" to get what you need faster.
          </p>
        </section>
      </div>
    </div>
  );
}
