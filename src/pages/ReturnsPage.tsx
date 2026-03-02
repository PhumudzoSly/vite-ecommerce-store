import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RotateCcw, Package, HelpCircle, ShieldCheck } from "lucide-react";

export function ReturnsPage() {
  return (
    <div className="container mx-auto px-4 py-20 max-w-4xl">
      <div className="space-y-12">
        <header className="space-y-4">
          <Badge className="px-3" variant="secondary">
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
          <div className="p-8 rounded-2xl border bg-card space-y-4">
            <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
              <RotateCcw className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-bold">Standard Returns</h2>
            <p className="text-sm text-muted-foreground">
              Return within 30 days of purchase for a full refund. Items must be
              in their original condition.
            </p>
          </div>
          <div className="p-8 rounded-2xl border bg-card space-y-4">
            <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-bold">Wamly Guarantee</h2>
            <p className="text-sm text-muted-foreground">
              Faulty or damaged items are fully covered. We'll send a
              replacement at no extra cost.
            </p>
          </div>
        </section>

        <section className="rounded-2xl border p-10 bg-muted/30 space-y-6">
          <h2 className="text-2xl font-bold">How to start a return?</h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="shrink-0 h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                1
              </div>
              <p className="pt-1">
                Gather your <span className="font-semibold">Order Number</span>{" "}
                and the email you used to purchase.
              </p>
            </div>
            <div className="flex gap-4">
              <div className="shrink-0 h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                2
              </div>
              <p className="pt-1">
                Click the button below to go to our Return Portal and select the
                items to return.
              </p>
            </div>
            <div className="flex gap-4">
              <div className="shrink-0 h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                3
              </div>
              <p className="pt-1">
                Print the label and drop off the package at any authorized
                carrier location.
              </p>
            </div>
          </div>
          <div className="pt-4 flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="px-10 h-14 text-lg">
              Start My Return
            </Button>
            <Button size="lg" variant="ghost" className="h-14">
              <HelpCircle className="mr-2 h-4 w-4" />
              Contact Support
            </Button>
          </div>
        </section>

        <section className="space-y-6 pt-10 text-center">
          <Package className="h-12 w-12 mx-auto text-muted-foreground opacity-50" />
          <h3 className="text-lg font-bold">Exchanges</h3>
          <p className="text-muted-foreground">
            Looking for a different size or color? Start a return and select
            "Exchange" to get what you need faster.
          </p>
        </section>
      </div>
    </div>
  );
}
